main(); // FOnction globale de la page d'index

function main (){

    getProducts();

    function getProducts(){ // Appel de l'API et affichage des éléments via l'API

        fetch('http://localhost:3000/api/furniture') 
        .then(function(response){
            return response.json();
        })

        .then(function(resultApi){
            
            const divProducts = document.querySelector('.products');

            for(const product of resultApi){

                let linkProduct = document.createElement('a');
                linkProduct.href = `frontend/pages/product.html?id=${product._id}`;
                linkProduct.classList.add('product-listing');
                divProducts.appendChild(linkProduct);

                let cardProduct = document.createElement('figure');
                linkProduct.appendChild(cardProduct);

                let imagesProduct = document.createElement('img');
                imagesProduct.src = `${product.imageUrl}`
                cardProduct.appendChild(imagesProduct);

                let captionProduct = document.createElement('figcaption');
                cardProduct.appendChild(captionProduct);

                let nameProduct = document.createElement('p');
                nameProduct.innerText = `${product.name}`;
                captionProduct.appendChild(nameProduct);

                let priceProduct = document.createElement('p');
                priceProduct.innerText = `${product.price/100} €`;
                captionProduct.appendChild(priceProduct);
            }

            let mostProduct = document.createElement('a');
            mostProduct.id = 'most-arrow';
            mostProduct.href = "#"
            mostProduct.innerHTML = '<i class="fas fa-angle-double-right fa-5x"></i> Voir plus de produits';
            divProducts.appendChild(mostProduct);

            const asideError = document.querySelector('.products-error');
            asideError.style.display = 'none';
        })

        // EN cas d'erreur un message spécifique s'affiche

        .catch(function (error){
            const asideError = document.querySelector('.products-error');
            asideError.style.display = 'flex';
            let msgError = document.createElement('p');
            msgError.innerText = `Oups.. Nos produits sont momentanément indisponibles ! 
            Vérifiez que le serveur est bien allumé et que votre navigateur prend en charge Javascript.`;
            asideError.appendChild(msgError);
        })
    }
}