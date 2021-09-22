const inputLastname = document.querySelector('#lastname');
const inputFirstname = document.querySelector('#firstname');
const inputAddress = document.querySelector('#address');
const inputZipcode = document.querySelector('#zipcode');
const inputCity = document.querySelector('#city');
const inputEmail = document.querySelector('#email');
const allImgValid = document.querySelectorAll('.valid');
const allImgError = document.querySelectorAll('.error');

// Input Nom

inputLastname.addEventListener('input', function(content){
    if(content.target.value.length >= 2 && content.target.value.length <= 20){
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
    if(content.target.value.length >= 2 && content.target.value.length <= 100){
        allImgValid[2].style.display = "inline";
        allImgError[2].style.display = "none";

    } else {
        allImgError[2].style.display = "inline";
        allImgValid[2].style.display = "none";
    }
})

// Input Code Postal

inputZipcode.addEventListener('input', function(content){
    if(content.target.value.length >= 5 && content.target.value.length <= 15){
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