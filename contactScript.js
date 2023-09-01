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
    alert("This Email is 'Successfuly' copied to your clipboard")
  }

  
  
/////////////////////////////////   Send mail   /////////////////////////////////
const sendMailModal = document.getElementById("exampleModal1");
function sendMail(){
    var params = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        message : document.getElementById("message").value,
    };
    const serviceId = "service_uskjm4m";
    const templateId = "template_owlyal6";
    if (params.name !== '' || params.email !=='' || params.message !== ""){
        emailjs.send(serviceId,templateId,params)
        .then(
            res => {
                sendMailModal.style.display = "block";
                console.log(res);
                // alert("message has been sent successfuly");
            })
        .catch(err => console.log(err))
    }
};
function closeModal(){
    // sendMailModal.classList.add("fade");
    sendMailModal.classList.add("fade");
    sendMailModal.style.display = "none";
}
window.onclick = function(event) {
    if(event.target == sendMailModal) {
        sendMailModal.classList.add("fade");
        sendMailModal.style.display = "none";
    }
  }


