pageProduct(); // Création de la fonction globale d'affichage des produits sur la page

async function pageProduct (){ // On diffère la fonction car l'on récupère directement un élément de l'api et ceux avec await directement sur la fonction du fetch

    const productId = getProductId();
    const product = await getProduct(productId);
    viewProduct(product);

    function getProductId(){ // On récupère une nouvelle URL pour afficher seulement le produit spécifié
        return new URL(location.href).searchParams.get("id");
    }

    function getProduct(productId){ // On récupère directement à l'API les informations du produits à récupérer
        return fetch(`http://localhost:3000/api/furniture/${productId}`) 
        .then(function(response){
            return response.json();
        })

        .then(function(resultApi){
            return resultApi;
        })
    }

    function viewProduct(product){ // Fonction d'affichage des produits
        let imageProduct = document.querySelector('.image-product');
        imageProduct.src = `${product.imageUrl}`;

        let nameProduct = document.querySelector('.title-price h2');
        nameProduct.innerText = `${product.name}`;

        let priceProduct = document.querySelector('.title-price p');
        priceProduct.innerText = `${product.price/100}€`;

        let descriptionProduct = document.querySelector('.description-product p');
        descriptionProduct.innerText = `${product.description}`;

        let varnishProduct = document.getElementById('option-varnish');
        for(let i in product.varnish){
            let optionVarnish = document.createElement('option');
            optionVarnish.innerText = `${product.varnish[i]}`; 
            varnishProduct.appendChild(optionVarnish);
        }  
    }

    saveProductInShop(); // On créer la fonction qui va sauvegarder nos produis dans un tableau

    function saveProductInShop(){
        const btnForm = document.querySelector('#btn-form');
        inputQuantity = document.querySelector('#quantity');

        btnForm.addEventListener('submit', function(effect){ // On supprime l'effet 'submit' du bouton
            effect.preventDefault();
        })

        btnForm.addEventListener('click', function(){ 
            let arrayInLocalStorage = []; // Tableau du LocalStorage qui va contenir les objets produits

            let productGoShop = {
                name : product.name,
                quantity : inputQuantity.value, // On créé un objet qui contiendra les données de notre produit sélectionné
                price : product.price/100
            };

            if(localStorage.getItem('products') !== null){ // Si le localstorage n'est pas null, soit qu'il contient quelque chose alors :
                arrayInLocalStorage = JSON.parse(localStorage.getItem('products')); // On récupère l'information puis on l'ajoutera au contenant supllémentaire s'ajoutant ci-dessous
            }
            arrayInLocalStorage.push(productGoShop); // Ici on ajoute notre nouvel élément au tableau existant
            localStorage.setItem('products', JSON.stringify(arrayInLocalStorage)); //On ajoute à notre clé produits un nouveau tableau au format JSON
        })
    }
}
