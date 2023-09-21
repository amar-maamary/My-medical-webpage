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
const signInButtonNav = document.getElementById("getSignInForm");
const signUpButtonNav = document.getElementById("getSignUpForm");
// const 
window.addEventListener("load", function loading(){
    preloader.style.display = "none";
    elements.style.display = "block";
    signInButtonNav.style.display = "block";
    signUpButtonNav.style.display = "block";
    
});

//Sign in up moves
// const signUpButton = document.getElementById("signUp");
// const signInButton = document.getElementById("signIn");
// const container = document.getElementById("container");
// signUpButton.addEventListener("click", () => {
//   container.classList.add("right-panel-active");
// });

// signInButton.addEventListener("click", () => {
//   container.classList.remove("right-panel-active");
// }); 



//btn-close
const closeBtns = document.querySelectorAll(".close");
closeBtns.forEach((btn) =>{
    btn.addEventListener("click", (e)=>{
        var parentAlert = e.target.parentElement;
        console.log(parentAlert)
        parentAlert.style.display = "none";
})
})

//homeEmail
var email = document.getElementById("email");
var verEmail = document.getElementById("verEmail");
email.value = localStorage.getItem("homeEmail") || "";
verEmail.value = localStorage.getItem("homeEmail") || "";