/* Adiciona mais um campo de horário disponível */
document.querySelector("#add-time")
.addEventListener('click', () => {
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true);
    //Limpa os campos
    const fields = newFieldContainer.querySelectorAll('input').forEach( el => el.value = "");
    document.querySelector("#schedule-items").appendChild(newFieldContainer);
})