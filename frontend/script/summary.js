viewSummary();

function viewSummary() { // Grâce à cette fonction on réalise l'affichage sur la page de récapitlatif de commande

    let productInLocalStorage = JSON.parse(localStorage.getItem('products'));
    const ulProductSummary = document.querySelector('.recap ul');

    let totalPriceInLocalStorage = JSON.parse(localStorage.getItem('priceTotal'))
    const titreTotalSummary = document.querySelector('h3')

    for(let product in productInLocalStorage){ // On parcours les élemnt du localstorage pour créer un affichage des produits commandés par l'utilisateur

        const liProductSummary = document.createElement('li');
        liProductSummary.innerHTML = `${productInLocalStorage[product].name} : <em>${productInLocalStorage[product].price}€ (x${productInLocalStorage[product].quantity}</em>) `;
        ulProductSummary.appendChild(liProductSummary);
    }

    const priceFinal = document.createElement('em');
    priceFinal.innerHTML = ` ${totalPriceInLocalStorage}€`;
    titreTotalSummary.appendChild(priceFinal);

    localStorage.clear(); // On supprime tout le LocalStorage pour permettre 
}




