const database = require('./db.js')
const createProffy = require('./createProffy.js')

/* Arquivo para testar as operações no db */
database.then(async (db) => {
    /* Dados fake para teste */
    proffyValue = {
        name: 'Thiago Guerrero',
        avatar: 'https://avatars3.githubusercontent.com/u/54722457?s=460&u=cece708b13b854ddc1919a3203a5ced60f89b773&v=4',
        whatsapp: '965432949',
        bio: 'Gadão Guerrero'
    }

    classValue = {
        subject: 7, //Matemática
        cost: "20"
        //O proffy_id virá pelo db
    }
    
    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 2,
            time_from: 520,
            time_to: 1220
        }
        //O class_id virá pelo db
    ]


    //Insert data
    // await createProffy(db, {proffyValue, classValue, classScheduleValues});


    //Consult data

    /* Todos os proffys */
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys);

    /* Consulta as 'classes' de um determinado 'proffy' 
    e traz junto os dados do proffy */

    // JOIN vai juntar as duas tabelas onde a condição é verdadeira
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys);

    /* Filtros:
    O horário do time_from precisa ser menor ou igual ao horário do solicitado no filtro;
    O horário do time_to precisa ser acima do horário do solicitado no filtro.
    */
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = 2
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)
    console.log(selectClassesSchedules)


})