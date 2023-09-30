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





const closeBtns = document.querySelectorAll(".close");
closeBtns.forEach((btn) =>{
    btn.addEventListener("click", (e)=>{
        var parentAlert = e.target.parentElement;
        console.log(parentAlert)
        parentAlert.style.display = "none";
})
})

const addPatientNavButton = document.getElementById("add-patient-nav-btn");
const addPatientModal = document.getElementById("add-patient-modal");
addPatientNavButton.addEventListener("click", ()=>{
    addPatientModal.style.display = "block";
})
  
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", ()=>{
    addPatientModal.style.display = "none";
})

// Importing the add patient from
const addPatientForm = document.getElementById("add-patient-form");
// Crating a list for my patients data
let patients = JSON.parse(localStorage.getItem("patients")) || []

// Number of patients I have
let numberOfPatientsContainer = document.getElementById("nb-of-patients");
let numberOfPatients = parseInt(localStorage.getItem("numberOfPatients")) || 0;
numberOfPatientsContainer.innerText = numberOfPatients;

// Number of done patients 
let numberOfDonePatients = parseInt(localStorage.getItem("numberOfDonePatients")) || 0;
// if (numberOfPatients === 0){
//   let pourcentageOfDonePatientsDeno = 1 ;
// } else{
//   let pourcentageOfDonePatientsDeno = numberOfPatients ;
// }
// console.log(numberOfPatients);
// console.log(numberOfDonePatients);
// console.log(pourcentageOfDonePatients);


// Adding functionality to the form submit
addPatientForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Importing the profile input
  var patientPhotoFile = document.getElementById("patient-file");
  // Creating a patient element
  const patient = {
    firstName: document.getElementById("first-name").value,
    secondName: document.getElementById("second-name").value,
    lastName: document.getElementById("last-name").value,
    gender: document.getElementById("gender").value,
    age: document.getElementById("age").value,
    dOB: document.getElementById("date-of-birth").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    bloodGroup: document.getElementById("blood-group").value,
    chronicDiseases: document.getElementById("chronic-diseases").value,
    allergies: document.getElementById("allergies").value,
    diagnosis: document.getElementById("diagnosis").value || "-",
    lastAppointementDate: document.getElementById("last-appointement-date").value || "-",
    nextAppointementDate: document.getElementById("next-appointement-date").value,
    nextAppointementTime: document.getElementById("next-appointement-time").value,
    status: document.getElementById("status").value,
    notes: document.getElementById("notes").value,
    profileSrc:"https://www.transparentpng.com/thumb/user/blue-male-user-profile-transparent-png-2lbgMx.png",
    //  URL.createObjectURL(patientPhotoFile.files[0]) || 
    completed: false,
    patientID: "p-"+ Math.floor((Math.random() * 10000) + 1), 
  }
  // Pushing to other patients array and update it
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));
  // Update the number of patients i have
  numberOfPatients++;
  localStorage.setItem("numberOfPatients", numberOfPatients.toString());
  numberOfPatientsContainer.innerText = numberOfPatients;
  // Display my patients
  displayPatients();
  // Reset the form and close it
  addPatientForm.reset();
  addPatientModal.style.display = "none";
  // pourcentageOfDonePatients = numberOfDonePatients*100/ numberOfPatients;
  // maxAngle = pourcentageOfDonePatients*219.8/100;
  // loader()
})

function displayPatients() {
  // Import the div wher i should display my patients and clear it
  const patientsList = document.querySelector(".patients-list");
  patientsList.innerHTML = "";
  // looping over each patient
  patients.forEach((patientPerson) => {
    var patientElement = document.createElement("div");
    patientElement.classList.add("row-");
    patientElement.innerHTML =`
    <input type="checkbox" class="check">
    <div class="name">
      <img id="patient-img" src="${patientPerson.profileSrc}">
      <div>
        <p id="patient-name">${patientPerson.firstName} ${patientPerson.lastName}</p>
        <p><i class="fa-regular fa-calendar-check"></i> ${patientPerson.nextAppointementDate} ${patientPerson.nextAppointementTime}</p>
      </div>
    </div>
    <p>${patientPerson.patientID}</p>
    <p class="patient-status ${patientPerson.status.toLowerCase()}-p">${patientPerson.status}</p>
    <p>${patientPerson.lastAppointementDate}</p>
    <p id="patient-diagnosis">${patientPerson.diagnosis}</p>
    <div class="actions">
      <i class="fa-regular fa-pen-to-square" type="button"></i>
      <i class="fa-solid fa-trash-can" type="button"></i>
      <i class="fa-solid fa-ban" type="button"></i>
    </div>`
    
    var checkbox = patientElement.querySelector(".check");
    checkbox.checked = patientPerson.completed;

    checkbox.addEventListener("change", (e) =>{
        console.log("checked")
        patientPerson.completed = checkbox.checked;
        localStorage.setItem("patients", JSON.stringify(patients));
        numberOfDonePatients = patients.reduce((acc , curv)=>{
          if (patientPerson.completed) {
            console.log("true");
            return acc + 1;
          } else {
            console.log("false");
            return acc;
            }
          },0);
          localStorage.setItem("numberOfDonePatients",  numberOfDonePatients.toString());
          console.log(numberOfDonePatients);
          // pourcentageOfDonePatients = numberOfDonePatients*100/ numberOfPatients;
          // maxAngle = pourcentageOfDonePatients*219.8/100;
          // loader()
      })


    patientsList.appendChild(patientElement);
    console.log(patientsList)

    //delete btn actions
    var deleteBtn = patientElement.querySelector(".fa-trash-can");
    deleteBtn.addEventListener("click", (e) => {
      patients = patients.filter((patient) => patient != patientPerson);
      localStorage.setItem("patients", JSON.stringify(patients));
      numberOfPatients--;
      localStorage.setItem("numberOfPatients", numberOfPatients.toString());
      numberOfPatientsContainer.innerText = numberOfPatients;
      // pourcentageOfDonePatients = numberOfDonePatients*100/ numberOfPatients;
      // maxAngle = pourcentageOfDonePatients*219.8/100;
      // loader()
      // displayPatients();
    })

    //edit btn actions
    // editBtn.addEventListener("click", (e) => {
    //   var inputText = content.querySelector("input");
    //   inputText.removeAttribute("readonly");
    //   inputText.focus();
    //   inputText.addEventListener("blur", () => {
    //     todoItem.content = inputText.value; // E.TARGERT.VALUE
    //     inputText.setAttribute("readonly", true);
    //     localStorage.setItem("todos", JSON.stringify(todos));
    //   })
    // })
  })
}
displayPatients();

// var body = document.getElementsByTagName('body')[0].onload=function() {loader()};
// // let maxAngle = 109.9;
// let maxAngle = pourcentageOfDonePatients*219.8/100;
// function loader() {
// 	var circle = document.getElementById('halo');
// let pourcentageOfDonePatients =parseInt((numberOfDonePatients*100)/ numberOfPatients) || 0;
// let maxAngle = pourcentageOfDonePatients*219.8/100;
// 	var myTimer = document.getElementById('myTimer');
// 	var interval = 10;
// 	var angle = 0;
// 	var angle_increment = 1;
// 	// math trick 2*pi*57 = 358, must be less than 360 degree (20000)
// 	window.timer = window.setInterval(function () {
// 		circle.setAttribute("stroke-dasharray", angle + ", 20000");
// 		myTimer.innerHTML = parseInt(angle/219.8*100) + '%';

// 		if (angle >= maxAngle) {
// 			window.clearInterval(window.timer);
// 			console.log('Stopped in IF statment');
// 		}
//     if (maxAngle === Infinity || maxAngle === NaN) {
//       angle = 0;
//     }
// 		angle += angle_increment;
// 	}.bind(this), interval);
// };

