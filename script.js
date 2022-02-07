document.querySelector("form")
.addEventListener("submit", event => {
    //Remove a funcionalidade padrão do elemento neste caso o do envio
    event.preventDefault();
})



const fields = document.querySelectorAll("[required]");

function ValidateField(field) {

    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for (let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid) {
                foundError = error
            }
        }

        return foundError;
    }

    function setCustomMessage(message) {

        const spanError = field.parentNode.querySelector("span.error");

        if (message) {
            spanError.classList.add("active");
            spanError.innerHTML = "🚧 Campo Obrigatório 🚧"
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }

    }

    return function () {
        if (verifyErrors()) {
            setCustomMessage("🚧 Campo Obrigatório 🚧")
        } else {
            setCustomMessage()
        }
    };
}



function customValidation(event) {

    const field = event.target;

    const validation = ValidateField(field);
    
    validation()
}



for ( field of fields ) {
    field.addEventListener("invalid", event => {
        //Elimina o bubble
        event.preventDefault()
        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}
