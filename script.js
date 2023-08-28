/////////////////////////////////   Preloader   /////////////////////////////////
let slideBox = document.querySelector('.slide-box');
let solid = document.querySelector('.solid');

let width = 100;

let slide = setInterval(() => {
    solid.style.width = `${width}%`;
    width -= 1;
}, 20)

setTimeout(() => {
    clearInterval(slide);
    solid.style.width = `100%`;
}, 2050);

setInterval(() => {

    width = 100;
    let slide = setInterval(() => {
        solid.style.width = `${width}%`;
        width -= 1;
    }, 20)

    setTimeout(() => {
        clearInterval(slide);
    }, 2050);

}, 2050);

let preloader = document.querySelector(".loader-container");
let elements = document.querySelector(".main");
window.addEventListener("load", function loading(){
    preloader.style.display = "none";
    elements.style.display = "block";
});

///////////////////////////////// ------  Home Page  ------ /////////////////////////////////

/////////////////////////////////   Moving Cards    /////////////////////////////////
let navCardsDiv = document.querySelector(".cards");
console.log(navCardsDiv);
let navCards = document.querySelectorAll(".nav-card");

function movingCard(){
    navCards.forEach((navCard, i) =>{
        setTimeout(() => {
            navCard.style.animation = "movingCard 4s linear infinite";
            }, i*4000);
    })
};

movingCard();

navCardsDiv.addEventListener('mouseover', ()=>{
    navCards.forEach((navCard) =>{
    navCard.style.animation = "none";})
});

navCardsDiv.addEventListener('mouseout', ()=>{
    navCards.forEach((navCard) =>{
        navCard.style.animation = "movingCard 4s linear infinite";
    })
});








