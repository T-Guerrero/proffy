module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){
    //Inserir dados na tabela proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)
    const proffy_id = insertedProffy.lastID;

    //Inserir dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID;

    //Inserir dados na tabela class_schedule

    /* 
    Cria um array com toda a template de código sql de inserção que será rodado no db.run depois
    para inserir todos os horários
    */
    const insertedAllClassScheduleValues = classScheduleValues.map((value) => {
        return db.run(`
            INSERT INTO class_schedule (
                weekday,
                time_from,
                time_to,
                class_id
            ) VALUES (
                "${value.weekday}",
                "${value.time_from}",
                "${value.time_to}",
                "${class_id}"
            );
        `)
    })

    /* Executa os db.runs() */
    await Promise.all(insertedAllClassScheduleValues)
}