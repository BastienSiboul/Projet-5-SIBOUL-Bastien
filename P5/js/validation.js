//Récupération contenu localStorage

let card = JSON.parse(localStorage.getItem('card'));

//Calcul du prix total du panier
function totalCost() {
    let total = 0;
    for (let i = 0; i < card.length; i++) {
        total += card[i].price;
    }
    return total / 100;
}

function checkNames(field) {
    let patternName = /^[a-zA-Z\u0080-\u024F]+(([',. -][a-zA-Z\u0080-\u024F ])?[a-zA-Z\u0080-\u024F]*)*$/;
    field.addEventListener('input', (e) => {
        if (field.value.match(patternName)) {
            field.style.borderColor = "green";
        } else {
            field.style.borderColor = "red";
        }
    });
}

function checkAdress(field) {
    let patternAdress = /^[a-zA-Z0-9\u0080-\u024F]+(([',. -][a-zA-Z0-9\u0080-\u024F ])?[a-zA-Z0-9\u0080-\u024F]*)*$/;
    field.addEventListener('input', (e) => {
        if (field.value.match(patternAdress)) {
            field.style.borderColor = 'green';
        } else {
            field.style.borderColor = 'red';
        }
    });
}

function checkCity(field) {
    let patternCity = /^[a-zA-Z\u0080-\u024F]+(([',. -][a-zA-Z\u0080-\u024F ])?[a-zA-Z\u0080-\u024F]*)*$/;
    field.addEventListener('input', (e) => {
        if (field.value.match(patternCity)) {
            field.style.borderColor = 'green';
        } else {
            field.style.borderColor = 'red';
        }
    });
}

function checkEmail(field) {
    let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    field.addEventListener('input', (e) => {
        if (field.value.match(patternEmail)) {
            field.style.borderColor = "green";
        } else {
            field.style.borderColor = "red";
        }
    });
}

// Création d'une fonction pour récupérer les données saisies par l'utilisateur

function orderValidation() {

    //Récupération données saisies
    let firstName = document.querySelector('#clientPrenom');
    let secondName = document.querySelector('#clientNom');
    let adress = document.querySelector('#clientAdresse');
    let city = document.querySelector('#clientVille');
    let email = document.querySelector('#clientEmail');
    let validBtn = document.querySelector('#validBtn');

    checkNames(firstName);
    checkNames(secondName);
    checkAdress(adress);
    checkCity(city);
    checkEmail(email);


    validBtn.addEventListener('click', event => {
        let firstName = document.querySelector('#clientPrenom');
        let secondName = document.querySelector('#clientNom');
        let adress = document.querySelector('#clientAdresse');
        let city = document.querySelector('#clientVille');
        let email = document.querySelector('#clientEmail');

        let patternFirstName = /^[a-zA-Z\u0080-\u024F]+(([',. -][a-zA-Z\u0080-\u024F ])?[a-zA-Z\u0080-\u024F]*)*$/g;
        let patternSecondName = /^[a-zA-Z\u0080-\u024F]+(([',. -][a-zA-Z\u0080-\u024F ])?[a-zA-Z\u0080-\u024F]*)*$/g;
        let patternAdress = /^[a-zA-Z0-9\u0080-\u024F]+(([',. -][a-zA-Z0-9\u0080-\u024F ])?[a-zA-Z0-9\u0080-\u024F]*)*$/g;
        let patternCity = /^[a-zA-Z\u0080-\u024F]+(([',. -][a-zA-Z\u0080-\u024F ])?[a-zA-Z\u0080-\u024F]*)*$/g;
        let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

        if ((patternFirstName.test(firstName.value)) && (patternSecondName.test(secondName.value)) && (patternAdress.test(adress.value)) && (patternCity.test(city.value)) && (patternEmail.test(email.value))) {
            var form = document.querySelector('#form');
            form.addEventListener('submit', async function (e) {
                e.preventDefault();
                let dataCommand = {};

                dataCommand.contact = {
                    firstName: firstName.value,
                    lastName: secondName.value,
                    address: adress.value,
                    city: city.value,
                    email: email.value,
                };

                dataCommand.products = [];
                for (let i = 1; i < card.length; i++) {
                    dataCommand.products.push(card[i].id);
                }

                const response = await fetch("http://localhost:3000/api/teddies/order", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(dataCommand),
                });

                if (response.status != 201) {
                    alert('Désolé, une erreur est survenue! Retour du serveur: ' + response.status);
                } else {
                    let reponseCommande = await response.json();
                    window.location = 'recap.html?id=' + reponseCommande.orderId + '&price=' + totalCost();
                }
            })
        } else {
            alert("Veillez bien compléter le formulaire !");
        }
    })
}

orderValidation();
