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


const preloader = document.querySelector(".loader-container");
// var bubblesDiv = document.querySelector(".bubbles");
// var bubbles = [];
window.addEventListener("load", function loading(){
    preloader.style.display = "none";
    // for (var i = 0; i < 128; i++){
    //     var bubble = document.createElement("div");
    //     bubble.innerHTML = `<div class='bubble' style='--size:${2+Math.random()*4}rem; --distance:${6+Math.random()*4}rem; --position:${-5+Math.random()*110}%; --time:${2+Math.random()*2}s; --delay:${-1*(2+Math.random()*2)}s'></div>`
    //     bubbles.push(bubble);
    // }
    // console.log(bubbles);
    // bubbles.forEach(bubb =>{
    //     bubblesDiv.appendChild(bubb);
    // })
});
