/* Adiciona mais um campo de horário disponível */
document.querySelector("#add-time")
.addEventListener('click', () => {
    const fields = document.querySelectorAll(".schedule-item");
    const fieldContainer = fields[fields.length - 1];
    if (Array.from(fieldContainer.querySelectorAll('input')).filter((el => el.value == "")) == ""){
        const newFieldContainer = fieldContainer.cloneNode(true);

        if (fields.length === 1){
            //Torna visível o botão de remover quando existe mais de 1 campo de criação do horário
            newFieldContainer.childNodes[1].style = 'display: inline'
        }

        //Limpa os campos
        newFieldContainer.querySelectorAll('input').forEach( el => el.value = "");
        document.querySelector("#schedule-items").appendChild(newFieldContainer);
    }
})

/* Oculta o botão de remover do primeiro elemento */
document.querySelector('.remove-time').style.display = 'none';

/* Remove algum campo de horário */
//event delegation
document.querySelector("#schedule-items").addEventListener('click', (e)=> {
    const elementClicked = e.target;
    if (elementClicked && elementClicked.className == 'remove-time'){
        const fieldContainer = elementClicked.parentElement;
        fieldContainer.remove();
    }
})