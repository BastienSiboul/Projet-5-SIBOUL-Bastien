let card = JSON.parse(localStorage.getItem('card'));

function cardManagement() {
    panierCreation();
    returnMenu();
    validateCard();
}

//Si ourson ajouté au panier

panierVide = () => {
    let vide = false;
    let recap = document.getElementById("table");
    if (card.length === 0) {
        document.getElementById("btn-validate-card").remove();
        recap.style.display = "none";
        vide = true;
    } else {
        document.getElementById("panierVide").remove();
        vide = false;
    }
    return vide;
};

panierCreation = () => {
    if (panierVide()) {
        console.log("le panier est vide");
    } else {

        //Création de la structure du tableau récapitulatif
        let recap = document.getElementById("table");
        let ligneTableau = document.createElement("tr");
        let recapPhoto = document.createElement("th");
        let recapNom = document.createElement("th");
        let quantity = document.createElement("th");
        let recapPrixUnitaire = document.createElement("th");
        let recapPrixTotal = document.createElement("th");
        let recapRemove = document.createElement("th");
        let ligneTotal = document.createElement("tr");
        let colonneTotal = document.createElement("th");
        let recapPrixPaye = document.createElement("td");

        //Placement de la structure dans la page
        let recapPanier = document.getElementById("panier-recap");
        recapPanier.appendChild(recap);
        recap.appendChild(ligneTableau);
        ligneTableau.appendChild(recapPhoto);
        ligneTableau.appendChild(recapNom);
        ligneTableau.appendChild(quantity);
        ligneTableau.appendChild(recapPrixUnitaire);
        ligneTableau.appendChild(recapPrixTotal);
        ligneTableau.appendChild(recapRemove);

        //contenu des entetes
        recapPhoto.textContent = "Article";
        recapNom.textContent = "Nom";
        quantity.textContent = "Quantité";
        recapPrixUnitaire.textContent = "Prix";
        recapRemove.textContent = "Annuler";
        recapPrixTotal.textContent = "Prix Total";


        //Boucle FOR pour affichage des articles dans le panier

        for (let i = 0; i < card.length; i++) {

            //Création des lignes du tableau

            let ligneArticle = document.createElement("tr");
            let photoArticle = document.createElement("img");
            let nomArticle = document.createElement("td");
            let quantiteArticle = document.createElement("td");
            let prixUnitArticle = document.createElement("td");
            let prixTotalArticle = document.createElement("td");
            let supprimerArticle = document.createElement("td");
            let removeArticle = document.createElement("i");

            //Attribution des class ou Id
            ligneArticle.setAttribute("id", "article" + [i]);
            photoArticle.setAttribute("class", "photo_article");
            photoArticle.setAttribute("src", card[i].imageUrl);
            photoArticle.setAttribute("alt", "Photo de l'article commandé");
            removeArticle.setAttribute("id", "remove" + [i]);
            removeArticle.setAttribute("class", "fas fa-times-circle fa-1x");
            removeArticle.setAttribute("title", "Supprimer article ?");

            console.log(i);

            //Supprimer un produit du panier
            removeArticle.addEventListener("click", (event) => {
                this.annulerArticle(i);
            });

            //Agencement de la structure HTML
            recap.appendChild(ligneArticle);
            ligneArticle.appendChild(photoArticle);
            ligneArticle.appendChild(nomArticle);
            ligneArticle.appendChild(quantiteArticle);
            ligneArticle.appendChild(prixUnitArticle);
            ligneArticle.appendChild(prixTotalArticle);
            ligneArticle.appendChild(supprimerArticle);
            supprimerArticle.appendChild(removeArticle);

            //Contenu de chaque ligne

            nomArticle.textContent = card[i].name;
            prixUnitArticle.textContent = card[i].price / 100 + " €";
            console.log(card[i].name);
            quantiteArticle.textContent = card[i].quantity;
            prixTotalArticle.textContent = card[i].price * card[i].quantity / 100 + " €";

        }


        //Dernière ligne du tableau : Total
        recap.appendChild(ligneTotal);
        ligneTotal.appendChild(colonneTotal);
        ligneTotal.setAttribute("id", "ligneSomme");
        colonneTotal.textContent = "Total à payer";
        ligneTotal.appendChild(recapPrixPaye);

        recapPrixPaye.setAttribute("id", "sommeTotal");
        recapPrixPaye.setAttribute("colspan", "4");
        colonneTotal.setAttribute("id", "colonneTotal");
        colonneTotal.setAttribute("colspan", "2");

        //Calcule de l'addition total
        let sommeTotal = 0;
        card.forEach((card) => {
            sommeTotal += card.price * card.quantity / 100;
        });

        //Affichage du prix total à payer dans l'addition
        console.log(sommeTotal);
        document.getElementById("sommeTotal").textContent = sommeTotal + " €";
    }
};

// fonction pour annuler un article
annulerArticle = (i) => {
    card.splice(i, 1);
    localStorage.clear();
    // Mise à jour du nouveau panier avec suppression de l'article
    localStorage.setItem("card", JSON.stringify(card));
    //Mise à jour de la page pour affichage de la suppression au client
    location.reload(true);
    panierVide();
};

// fonction pour créer un bouton pour retourner a la page d'acceuil
function returnMenu() {
    let button = document.querySelector('.button');
    let returnButton = document.getElementById('btn-return-menu');
    let link = document.createElement('a');

    returnButton.textContent = 'Retourner à la boutique';
    link.href = 'index.html';

    button.appendChild(link);
    link.appendChild(returnButton);
}

// function pour créer un bouton pour valider le panier et rediriger vers la page validation
function validateCard() {
    let button = document.querySelector('.button');
    let validateBtn = document.getElementById('btn-validate-card');
    let link = document.createElement('a');

    validateBtn.textContent = 'Valider le panier';
    link.href = 'validation.html';

    button.appendChild(link);
    link.appendChild(validateBtn);
}

cardManagement();
