// Création d'une fonction pour récupérer l'ourson sélectionné

async function recuperatesTeddies() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    const response = await fetch("http://localhost:3000/api/teddies/" + id);
    if (response.ok) {
        return await response.json();
    } else {
        alert('Désolé, une erreur est survenue! Retour du serveur: ' + response.status);
        window.location.href = 'index.html';
    }
}

// Création d'une fonction pour afficher l'ourson selectionné

async function loadProductList() {
    const data = await recuperatesTeddies();
    let selectedTeddy = document.createElement('article');
    let teddysimage = document.createElement('img');
    let teddysname = document.createElement('h3');
    let teddysdescription = document.createElement('p');
    let teddysPrice = document.createElement('p');
    let teddyListColor = document.createElement('select');
    let teddyQuantity = document.createElement('p');

    const realTeddysPrice = () => {
        return data.price / 100;
    };

    teddysimage.src = data.imageUrl;
    teddysname.textContent = data.name;
    teddysdescription.textContent = data.description;
    teddysPrice.textContent = 'Prix: ' + realTeddysPrice() + '€';
    teddyQuantity.innerHTML = '<select> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> </select>';
    console.log(teddyQuantity);
    let slt = teddyQuantity.firstChild;
    console.log(slt);
    slt.id = "qt";
    console.log(slt);

    let section = document.querySelector('#product');
    section.appendChild(selectedTeddy);
    selectedTeddy.appendChild(teddysimage);
    selectedTeddy.appendChild(teddysname);
    selectedTeddy.appendChild(teddysdescription);
    selectedTeddy.appendChild(teddysPrice);
    selectedTeddy.appendChild(teddyListColor);
    selectedTeddy.appendChild(teddyQuantity);

    let colors = data.colors;
    for (let color of colors) {
        let colorChoice = document.createElement('option');
        colorChoice.textContent = color;
        teddyListColor.appendChild(colorChoice);
    }
}

// Créations d'une fonction pour récupérer la quantité d'ourson selectionné

function getSelectValue(selectId) {
    let selectElmt = document.getElementById(selectId);
    let quantity;
    console.log(selectElmt);
    for (let option of selectElmt.options) {
        if (option.selected) {
            quantity = option.value;
        }
    }
    console.log(quantity);
    return quantity;
}

async function addToCard() {

    const data = await recuperatesTeddies();

    let selectValue = getSelectValue('qt');
    console.log(selectValue);

    let teddysData = {
        id: data._id,
        name: data.name,
        price: data.price,
        imageUrl: data.imageUrl,
        quantity: selectValue,
    };
    console.log(teddysData);
    return teddysData;
}

// Création d'une fonction pour ajouter l'article selectionné au panier

loadProductList().then(() => {
    let button = document.querySelector('button');
    let teddysTable;
    button.innerHTML = 'Ajouter au panier';
    button.addEventListener('click', function () {
        addToCard().then((data) => {

            if (JSON.parse(localStorage.getItem('card')) === null || JSON.parse(localStorage.getItem('card')).length === 0) {
                teddysTable = [];
                teddysTable.push(data);
                localStorage.setItem('card', JSON.stringify(teddysTable));
                console.log("Premier If");
            } else {

                let teddys = JSON.parse(localStorage.getItem('card'));
                console.log(teddys);

                let quantity = parseInt(getSelectValue('qt'));
                var id = data.id;
                console.log(id);
                console.log(typeof (quantity));
                console.log("Premier Else");
                var newArticle = true;
                teddys.forEach(function (teddy) {
                    console.log(teddy);
                    console.log(teddy.id);
                    if (teddy.id === id) {
                        console.log("Deuxième If");
                        newArticle = false;
                        teddy.quantity = parseInt(teddy.quantity) + quantity;
                        console.log(teddy.quantity);
                        localStorage.setItem('card', JSON.stringify(teddys));
                    }
                });

                if (newArticle) {
                    console.log("Deuxième else");
                    teddys.push(data);
                    console.log(data);

                    localStorage.setItem('card', JSON.stringify(teddys));
                }
            }
        });
    });
});
