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

/*------------------------------------/
               Functions
/------------------------------------*/
function getSubject(subjectNumber){
    return subjects[subjectNumber-1];
}

function convertHoursToMinutes(time){
    const [hour, minutes] = time.split(":") //"09:08" -> ["09, 08"]
    return Number((hour * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}