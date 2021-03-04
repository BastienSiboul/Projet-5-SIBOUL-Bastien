// Création d'une fonction pour récupérer les oursons

async function recuperatesTeddies() {
    const response = await fetch('http://localhost:3000/api/teddies');
    if (response.ok) {
        return await response.json();
    } else {
        alert('Désolé, une erreur est survenue! Retour du serveur: ' + response.status);
    }
}

//Fonction pour afficher les oursons de la base de donnée

async function loadProductList() {
    const data = await recuperatesTeddies();
    for (let i = 0; i < data.length; i++) {

        let listTeddies = document.createElement("li");
        let imageTeddies = document.createElement("img");
        let nameTeddies = document.createElement("h3");
        let descriptionTeddies = document.createElement("p");
        let linkTeddies = document.createElement("a");
        let priceTeddies = document.createElement("h4");

        const realPriceTeddies = () => {
            return data[i].price / 100;
        };

        imageTeddies.src = data[i].imageUrl;
        nameTeddies.textContent = data[i].name;
        descriptionTeddies.textContent = data[i].description;
        priceTeddies.textContent = realPriceTeddies() + ' euros';
        linkTeddies.href = 'products.html?id=' + data[i]._id;

        let displayTeddies = document.getElementById("displayProduct");
        displayTeddies.appendChild(listTeddies);
        listTeddies.appendChild(linkTeddies);
        linkTeddies.appendChild(nameTeddies);
        linkTeddies.appendChild(imageTeddies);
        linkTeddies.appendChild(descriptionTeddies);
        linkTeddies.appendChild(priceTeddies);
    }
}

loadProductList();



