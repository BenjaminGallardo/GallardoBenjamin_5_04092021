viewProductInShop(); // Fonction permettant l'affichafe des produits sur la page panier


function viewProductInShop() {

    const divContentShop = document.querySelector('.priceandcommand');
    const divEmptyShop = document.querySelector('.empty-shop');

    if(localStorage.getItem('products') === null){ // Dans le cas où le localstorage est vide et donc que le panier est vide 
        divContentShop.style.display = "none";
        let msgEmptyShop = document.createElement('p');
        msgEmptyShop.innerText = 'Oups.. Votre panier est vide !';
        divEmptyShop.appendChild(msgEmptyShop);
        divEmptyShop.style.display = 'flex';
    
    } else {
        const bodyArray = document.querySelector('tbody');
        let productInLocalStorage = JSON.parse(localStorage.getItem('products')); // On récupère notre tableau sous format Javascript
        let priceTotal = [];

        for(let product in productInLocalStorage){ //On parcours notre tableau d'objet pour afficher les produits dans le tableau du panier

            const lineArray = document.createElement('tr');
            bodyArray.appendChild(lineArray);

            const lineNameArray = document.createElement('td');
            lineNameArray.innerHTML = productInLocalStorage[product].name;
            lineArray.appendChild(lineNameArray);

            const lineQuantityArray = document.createElement('td');
            lineQuantityArray.innerHTML = productInLocalStorage[product].quantity;
            lineArray.appendChild(lineQuantityArray);

            const linePriceArray = document.createElement('td');
            linePriceArray.innerHTML = `${productInLocalStorage[product].price}€`;
            lineArray.appendChild(linePriceArray);

            const lineSubTotalArray = document.createElement('td');
            lineSubTotalArray.innerHTML = `${productInLocalStorage[product].price * productInLocalStorage[product].quantity}€`;
            lineArray.appendChild(lineSubTotalArray);

            priceTotal.push(productInLocalStorage[product].price * productInLocalStorage[product].quantity) // On récupère chaque prix total que l'on insère dans le tableau créé au préalable
        }

        const tdPriceFinal = document.querySelector('tfoot tr td:last-child'); 
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        let priceFinal = priceTotal.reduce(reducer);
        localStorage.setItem('priceTotal', JSON.stringify(priceFinal)); // On ajoute le prix final dans le local storage pour le réutiliser dans le sommaire
        tdPriceFinal.innerHTML = `${priceFinal}€`; // On ajoute tout les totaux récupéré dans le tableau afin de les aditionner et de faire un total

        const btnRemove = document.querySelector('.btn-remove');
        btnRemove.addEventListener('click', function(){ // Ici on créé la possibilité de vider le panier
            divContentShop.style.display = 'none';
            divEmptyShop.style.display = 'flex';
            let msgEmptyShop = document.createElement('p');
            msgEmptyShop.innerText = 'Oups.. Votre panier est vide !'; // Le message à afficher en cas de panier vide
            divEmptyShop.appendChild(msgEmptyShop);
            localStorage.removeItem('products');
        })
    }
}

form(); // Appel de la fonction de contrôle des données du formulaire

// Création de la fonction de validation du formulaire

function form (){

    const allInput = document.querySelectorAll("form input");
    const inputLastname = document.querySelector('#lastname');
    const inputFirstname = document.querySelector('#firstname');
    const inputAddress = document.querySelector('#address');
    const inputZipcode = document.querySelector('#zipcode');
    const inputCity = document.querySelector('#city');
    const inputEmail = document.querySelector('#email');
    const allImgValid = document.querySelectorAll('.valid');
    const allImgError = document.querySelectorAll('.error');
    const btnForm = document.querySelector('#btn-command');

    // Input Nom
    
    inputLastname.addEventListener('input', function(content){
        if(content.target.value.length > 2 && content.target.value.length <= 20){
            allImgValid[0].style.display = "inline";
            allImgError[0].style.display = "none";
    
        } else {
            allImgError[0].style.display = "inline";
            allImgValid[0].style.display = "none";
        }
    })
    
    // Input Prénom
    
    inputFirstname.addEventListener('input', function(content){
        if(content.target.value.length >= 2 && content.target.value.length <= 20){
            allImgValid[1].style.display = "inline";
            allImgError[1].style.display = "none";
    
        } else {
            allImgError[1].style.display = "inline";
            allImgValid[1].style.display = "none";
        }
    })
    
    // Input Adresse
    
    inputAddress.addEventListener('input', function(content){
        if(content.target.value.length > 2 && content.target.value.length <= 100){
            allImgValid[2].style.display = "inline";
            allImgError[2].style.display = "none";
    
        } else {
            allImgError[2].style.display = "inline";
            allImgValid[2].style.display = "none";
        }
    })
    
    // Input Code Postal
    
    inputZipcode.addEventListener('input', function(content){
        if(content.target.value.length >= 5 && content.target.value.length <= 7){
            allImgValid[3].style.display = "inline";
            allImgError[3].style.display = "none";
    
        } else {
            allImgError[3].style.display = "inline";
            allImgValid[3].style.display = "none";
        }
    })
    
    // Input Commune
    
    inputCity.addEventListener('input', function(content){
        if(content.target.value.length >= 2 && content.target.value.length <= 50){
            allImgValid[4].style.display = "inline";
            allImgError[4].style.display = "none";
    
        } else {
            allImgError[4].style.display = "inline";
            allImgValid[4].style.display = "none";
        }
    })
    
    // Input Email 
    
    const regexEmail = /\S+@\S+\.\S+/; 
    
    // 'S' match tout les caractères qui ne sont pas des espaces 
    // '+' match tout les nombres indéfini
    
    inputEmail.addEventListener('input', function(content){
        if(content.target.value.search(regexEmail) === 0){
            allImgValid[5].style.display = "inline";
            allImgError[5].style.display = "none";
    
        } else if (content.target.value.search(regexEmail) === -1){
            allImgError[5].style.display = "inline";
            allImgValid[5].style.display = "none";
        }
    })
}


