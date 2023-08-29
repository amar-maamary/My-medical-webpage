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


/////////////////////////////////   Animating Message   /////////////////////////////////
function addClass() {
    document.body.classList.add("sent");
  }
  
  sendLetter.addEventListener("click", addClass);

/////////////////////////////////   Copy Email   /////////////////////////////////

function copyEmail() {
    var copyText = document.getElementById("copiedEmail");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  }
  