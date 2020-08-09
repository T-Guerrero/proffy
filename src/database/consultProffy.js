const { convertHoursToMinutes } = require('../utils/format.js')

module.exports = async function(db, filters){
    //Consultar dados de um proffy através de um filtro

    //Converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    return await db.all(`
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
    `)
}