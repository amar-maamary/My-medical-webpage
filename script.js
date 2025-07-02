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

///////////////////////////////// Updated image ///////////////////////////////
fetch('https://api.pexels.com/v1/search?query=medical&per_page=1&page=' + Math.floor(Math.random() * 100), {
  headers: {
    Authorization: 'SCi2HzdpSIJw35OW7ntshcX227e3Q8vd556QchwTqffUil2uFi9UOEIg'
  }
})
.then(response => response.json())
.then(data => {
  document.getElementById('random-image').src = data.photos[0].src.medium;
});


/////////////////////////////////   Moving Cards    /////////////////////////////////
let navCardsDiv = document.querySelector(".cards");

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


////// Saving email to local storage
var homeEmail = document.getElementById("home-email");
homeEmail.addEventListener("change", () =>{
    localStorage.setItem("homeEmail", homeEmail.value);
})





