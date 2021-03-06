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
            localStorage.clear();
        })
    }
}

validationAndSendForm(); // Appel de la fonction de contrôle des données du formulaire

// Création de la fonction de validation du formulaire

function validationAndSendForm (){

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
    
    inputLastname.addEventListener('input', function(event){
        if(event.target.value.length > 2 && event.target.value.length <= 20){
            allImgValid[0].style.display = "inline";
            allImgError[0].style.display = "none";
            btnForm.setAttribute('form',"form-payment");
    
        } else {
            allImgError[0].style.display = "inline";
            allImgValid[0].style.display = "none";
            btnForm.setAttribute('form',"");
        }
    })
    
    // Input Prénom
    
    inputFirstname.addEventListener('input', function(event){
        if(event.target.value.length >= 2 && event.target.value.length <= 20){
            allImgValid[1].style.display = "inline";
            allImgError[1].style.display = "none";
            btnForm.setAttribute('form',"form-payment");
    
        } else {
            allImgError[1].style.display = "inline";
            allImgValid[1].style.display = "none";
            btnForm.setAttribute('form',"");
        }
    })
    
    // Input Adresse
    
    inputAddress.addEventListener('input', function(event){
        if(event.target.value.length > 2 && event.target.value.length <= 100){
            allImgValid[2].style.display = "inline";
            allImgError[2].style.display = "none";
            btnForm.setAttribute('form',"form-payment");
    
        } else {
            allImgError[2].style.display = "inline";
            allImgValid[2].style.display = "none";
            btnForm.setAttribute('form',"");
        }
    })
    
    // Input Code Postal
    
    inputZipcode.addEventListener('input', function(event){
        if(event.target.value.length == 5){
            allImgValid[3].style.display = "inline";
            allImgError[3].style.display = "none";
            btnForm.setAttribute('form',"form-payment");
    
        } else {
            allImgError[3].style.display = "inline";
            allImgValid[3].style.display = "none";
            btnForm.setAttribute('form',"");
        }
    })
    
    // Input Commune
    
    inputCity.addEventListener('input', function(event){
        if(event.target.value.length >= 2 && event.target.value.length <= 50){
            allImgValid[4].style.display = "inline";
            allImgError[4].style.display = "none";
            btnForm.setAttribute('form',"form-payment");
    
        } else {
            allImgError[4].style.display = "inline";
            allImgValid[4].style.display = "none";
            btnForm.setAttribute('form',"");
        }
    })
    
    // Input Email 
    
    const regexEmail = /\S+@\S+\.\S+/; 
    
    // 'S' match tout les caractères qui ne sont pas des espaces 
    // '+' match tout les nombres indéfini
    
    inputEmail.addEventListener('input', function(event){
        if(event.target.value.search(regexEmail) === 0){
            allImgValid[5].style.display = "inline";
            allImgError[5].style.display = "none";
            btnForm.setAttribute('form',"form-payment");
    
        } else if (event.target.value.search(regexEmail) === -1){
            allImgError[5].style.display = "inline";
            allImgValid[5].style.display = "none";
            btnForm.setAttribute('form',"");
        }
    })

    // Création de la méthode POST pour l'envoie des données au serveur si le formulaire est valide
    // On commence par créé l'objet qui sera envoyé

    btnForm.addEventListener('click', function(){
        let productInLocalStorage = JSON.parse(localStorage.getItem('products'));
        orderedProducts = [];

        for(let id in productInLocalStorage){
            productId = productInLocalStorage[id].id;
            orderedProducts.push(productId);
        }

        let order = {
            contact: {
                firstName: inputFirstname.value,
                lastName: inputLastname.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputEmail.value,
            },
            products: orderedProducts,
        };  

        fetch('http://localhost:3000/api/furniture/order', {
            method: "POST",
            body: JSON.stringify(order),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(productOrder => {
            localStorage.setItem('order', productOrder.orderId);
        })
        .catch(error => console.log(error));
    })
}


