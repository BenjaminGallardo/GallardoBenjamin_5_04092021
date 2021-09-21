main();

function main (){

    getProducts();

    function getProducts(){

        fetch('http://localhost:3000/api/furniture') 
        .then(function(response){
            return response.json();
        })

        .then(function(resultApi){
            console.log(resultApi);
            
            const divProducts = document.querySelector('.products');
            console.log(divProducts);

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



// callApi();

// function callApi (){
//     fetch("http://localhost:3000/api/furniture") 
//     .then(function(response){  
//         return response.json() 
//     .then(function(resultApi){ 
//         console.log(resultApi);

//        let cardProduct = ""; 
        
//         for(let product of resultApi){ 
//             cardProduct += `<a href="frontend/pages/product.html?${product._id}" class:"product-listing"><figure><img src="${product.imageUrl}"/><figcaption><p>${product.name}</p><p>${product.price/100}€</p></figcaption></figure></a>`;
//         }
        
//         document.querySelector('.products-error').style.display = "none";
//         cardProduct += `<a href="#" id="most-arrow"><i class="fas fa-angle-double-right fa-5x"></i>Voir plus de produits</a>`;
//         document.querySelector('.products').innerHTML = cardProduct;
//     })
//     })

//        .catch(error => {
//         let cardProductErr = "<p>Nos produits sont malheureusement indisponibles pour le moment. </br> Veuillez nous excuser pour ce désagrément ! </br></br> (Vérifiez que le serveur local (port 3000) est bien activé et que votre navigateur supporte javascript)</p>";
//         document.querySelector('.products-error').innerHTML = cardProductErr;
//     });
// } 
