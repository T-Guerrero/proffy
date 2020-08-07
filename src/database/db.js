const database = require('sqlite-async')

/* Poderiamos ter usado um await em vez do then para esperar a criação do db */
module.exports = database.open(__dirname + '/database.sqlite').then((db) => {
    //Create db
    /*
    Um professor pode dar várias aulas diferentes e cada aula pode ter vários horários diferentes 
    */
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
})