pageProduct();

async function pageProduct (){

    const productId = getProductId();
    const product = await getProduct(productId);
    viewProduct(product);

    function getProductId(){
        return new URL(location.href).searchParams.get("id");
    }

    function getProduct(productId){
        return fetch(`http://localhost:3000/api/furniture/${productId}`) 
        .then(function(response){
            return response.json();
        })

        .then(function(resultApi){
            return resultApi;
        })
    }

    function viewProduct(product){
        let imageProduct = document.querySelector('.image-product');
        imageProduct.src = `${product.imageUrl}`;

        let nameProduct = document.querySelector('.title-price h2');
        nameProduct.innerText = `${product.name}`;

        let priceProduct = document.querySelector('.title-price p');
        priceProduct.innerText = `${product.price/100} €`;

        let descriptionProduct = document.querySelector('.description-product p');
        descriptionProduct.innerText = `${product.description}`;
    }
}

