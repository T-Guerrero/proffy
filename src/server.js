const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

const database = require('./database/db.js')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format.js')

/* Configurar nunjucks */
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

/* Seta a pasta "Public" como path padrão de css, assets and js files */
server.use(express.static("public"))

/* Possibilita receber os dados no req.body */
server.use(express.urlencoded({ extended: true }))

/*------------------------------------/
               Routes
/------------------------------------*/
/*
req = Requisição
res = Resposta
*/
server.get("/", (req, res) => {
    return res.render('index.html')
})

server.get("/study", async (req, res) => {
    /* Req.query armazena os dados do formulário mandados por URL */
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time){
        return res.render('study.html', {filters, subjects, weekdays})
    }

    //Converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = ${filters.subject}
    `

    try {
        const db = await database
        const proffys = await db.all(query)
        proffys.map(proffy => {
            proffy.subject = getSubject(proffy.subject)
        })
        return res.render('study.html', {proffys, filters, subjects, weekdays})
    } catch (error) {
        console.log(error)
    }
})

server.get("/give-classes", (req, res) => {
    return res.render('give-classes.html', {subjects, weekdays})
})

server.post("/give-classes", async (req, res) => {
    const createProffy = require('./database/createProffy.js')
    const data = req.body

    const proffyValue = {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        bio: data.bio
    }

    const classValue = {
        subject: data.subject,
        cost: data.cost
    }

    const classScheduleValues = data.weekday.map((value, index) => {
        return {
            weekday: value,
            time_from: convertHoursToMinutes(data.time_from[index]),
            time_to: convertHoursToMinutes(data.time_to[index]),
        }
    })

    try {
        const db = await database
        await createProffy(db, {proffyValue, classValue, classScheduleValues});
        let queryString = "?subject=" + data.subject;
        queryString += "&weekday=" + data.weekday[0];
        queryString += "&time=" + data.time_from[0];
        return res.redirect('/study' + queryString)
        
    } catch (error) {
        console.log(error)
    }
})

/*------------------------------------/
            Open Server
/------------------------------------*/
server.listen(3000)