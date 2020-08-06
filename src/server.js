const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: 11965432949,
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
   },
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: 11965432949,
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
   }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

/* Configurar nunjucks */
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

/* Seta a pasta "Public" como path padrão de css, assets and js files */
server.use(express.static("public"))

/*------------------------------------/
               Funções
/------------------------------------*/
function getSubject(subjectNumber){
    return subjects[subjectNumber-1];
}

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

server.get("/study", (req, res) => {
    /* Req.query armazena os dados do formulário mandados por URL */
    return res.render('study.html', {proffys, filters: req.query, subjects, weekdays})
})

server.get("/give-classes", (req, res) => {
    const proffy = req.query

    //Object.keys() transforma o objeto em um array
    const isEmpty = Object.keys(proffy).length == 0

    //Adiciona na lista de professores
    if (!isEmpty){
        proffys.subject = getSubject(proffys.subject)
        proffys.push(proffy)
        return res.redirect('/study')
    }
    return res.render('give-classes.html', {subjects, weekdays})
})

/*------------------------------------/
            Open Server
/------------------------------------*/
server.listen(3000)