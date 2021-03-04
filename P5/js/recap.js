//Confirmation de la commande
function displayCommand() {

    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id == null) {
        window.location.href = 'index.html';
    } else {
        let command = document.getElementById('confirmation');
        let orderNumber = document.createElement('p');

        orderNumber.textContent = 'Votre numéro de commande: ' + id;

        command.appendChild(orderNumber);

        localStorage.clear();
    }
}

//Création du bouton
function validateCard() {
    let button = document.querySelector('.return-button');
    let returnBtn = document.getElementById('return-btn');
    let link = document.createElement('a');

    returnBtn.textContent = "Retourner à l'accueil";
    link.href = 'index.html';

    button.appendChild(link);
    link.appendChild(returnBtn);
}

displayCommand();
validateCard();