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

var body = document.getElementsByTagName('body')[0].onload=function() {loader()};

function loader() {
	var circle = document.getElementById('halo');
	var myTimer = document.getElementById('myTimer');
	var interval = 10;
	var angle = 0;
	var angle_increment = 1;
	// math trick 2*pi*57 = 358, must be less than 360 degree (20000)
	window.timer = window.setInterval(function () {
		circle.setAttribute("stroke-dasharray", angle + ", 20000");
		myTimer.innerHTML = parseInt(angle/188.4*100) + '%';

		if (angle >= 188.4) {
			window.clearInterval(window.timer);
			console.log('Stopped in IF statment');
		}
		angle += angle_increment;
	}.bind(this), interval);
};
/*--------------------------------------

Reference: http://jsfiddle.net/JwkYm/528/

----------------------------------------*/

//Reset button
function ResetBtn() {
	window.clearInterval(window.timer);
	loader();
};