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




/////////////////////////////////   Alert close btn   /////////////////////////////////
const closeBtns = document.querySelectorAll(".close");
closeBtns.forEach((btn) =>{
    btn.addEventListener("click", (e)=>{
        var parentAlert = e.target.parentElement;
        console.log(parentAlert)
        parentAlert.style.display = "none";
})
})

/////////////////////////////////   Add Patient button /////////////////////////////////
// displaying the modal
const addPatientNavButton = document.getElementById("add-patient-nav-btn");
const addPatientModal = document.getElementById("add-patient-modal");
addPatientNavButton.addEventListener("click", ()=>{
    addPatientModal.style.display = "block";
})
// close the model btn
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
console.log(numberOfPatients);

// Number of done patients 
let numberOfDonePatients = parseInt(localStorage.getItem("numberOfDonePatients")) || 0;
console.log(numberOfDonePatients);

function updateDonePatients(){
  numberOfDonePatients = patients.reduce((acc, curv) => {
    if (curv.completed) {
      console.log("true");
      return acc + 1;
    } else {
      console.log("false");
      return acc;
    }
  }, 0);
  localStorage.setItem("numberOfDonePatients",  numberOfDonePatients.toString());
}
// Active and non-active patients
var activePatients = parseInt(localStorage.getItem("activePatients")) || 0;
var nonActivePatients = parseInt(localStorage.getItem("nonActivePatients")) || 0;
var activePatientsBar = document.getElementById("active-patients-bar");
var nonActivePatientsBar = document.getElementById("non-active-patients-bar");

function checkActivePatients(){
  activePatients = patients.reduce((acc, curv) => {
    if (curv.status.toLowerCase() === "active") {
      console.log("active");
      return acc+1;
    } else{
      console.log("other than active");
      return acc;
    }
  }, 0);
  localStorage.setItem("activePatients",  activePatients.toString());
  let pourcentageOfActivePatients = 0;
  if (numberOfPatients > 0){
    pourcentageOfActivePatients =parseInt((activePatients*100)/ numberOfPatients);
  }
  else if (numberOfPatients === 0){
    pourcentageOfActivePatients = 0;
  }
  activePatientsBar.style.width = pourcentageOfActivePatients + "%";
  activePatientsBar.innerHTML = pourcentageOfActivePatients + "%";
  activePatientsBar.ariaValueNow = pourcentageOfActivePatients;
}
function checkNonActivePatients(){
  nonActivePatients = patients.reduce((acc, curv) => {
    if (curv.status.toLowerCase() === "non-active") {
      console.log("non-active");
      return acc+1;
    } else{
      console.log("other than non-active");
      return acc;
    }
  }, 0);
  localStorage.setItem("nonActivePatients",  nonActivePatients.toString());
  let pourcentageOfNonActivePatients = 0;
  if (numberOfPatients > 0){
    pourcentageOfNonActivePatients =parseInt((nonActivePatients*100)/ numberOfPatients);
  }
  else if (numberOfPatients === 0){
    pourcentageOfNonActivePatients = 0;
  }
  nonActivePatientsBar.style.width = pourcentageOfNonActivePatients + "%";
  nonActivePatientsBar.innerHTML = pourcentageOfNonActivePatients + "%";
  nonActivePatientsBar.ariaValueNow = pourcentageOfNonActivePatients;
}



// Progress circle
// var body = document.getElementsByTagName('body')[0].onload=function() {loader()};
function loader() {
	var circle = document.getElementById('halo');
  let pourcentageOfDonePatients = 0;
  if (numberOfPatients > 0){
    pourcentageOfDonePatients =parseInt((numberOfDonePatients*100)/ numberOfPatients);
    console.log(pourcentageOfDonePatients);
  }
  else if (numberOfPatients === 0){
    pourcentageOfDonePatients = 0;
  }
  let maxAngle = pourcentageOfDonePatients*219.8/100;
	var myTimer = document.getElementById('myTimer');
	var interval = 10;
	var angle = 0;
	var angle_increment = 1;
	// math trick 2*pi*57 = 358, must be less than 360 degree (20000)
	window.timer = window.setInterval(function () {
		circle.setAttribute("stroke-dasharray", angle + ", 20000");
		myTimer.innerHTML = parseInt(angle/219.8*100) + '%';

		if (angle >= maxAngle) {
			window.clearInterval(window.timer);
			console.log('Stopped in IF statment');
		}
		angle += angle_increment;
	}.bind(this), interval);
};


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
    patientID: "p-"+  Math.floor(Math.random() * (10000 - 999 + 1)) + 999, 
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
  loader();
  checkActivePatients();
  checkNonActivePatients()
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
      updateDonePatients();
      checkActivePatients();
      checkNonActivePatients()
      displayPatients();
      loader()
    })

    // checkbox event
    checkbox.addEventListener("change", (e) =>{
      console.log("checked")
      patientPerson.completed = checkbox.checked;
      localStorage.setItem("patients", JSON.stringify(patients));
      updateDonePatients();
      checkActivePatients()
      checkNonActivePatients()
      console.log(numberOfDonePatients);
      loader();
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
loader();
checkActivePatients();
checkNonActivePatients();



// Add an event listener to the filter button
const filterButton = document.getElementById("menu1");

// Add event listeners to the filter options
const filterOptions = document.querySelectorAll(".dropdown-menu p[role='menuitem']");
filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // Get the selected filter option text
    const selectedFilter = option.innerText;
    
    // Filter patients based on their status and completed property
    const filteredPatients = patients.filter((patient) => {
      if (selectedFilter === "Active" && patient.status.toLowerCase() === "active") {
        return true;
      } else if (selectedFilter === "Non-active" && patient.status.toLowerCase() === "non-active") {
        return true;
      } else if (selectedFilter === "New-patient" && patient.status.toLowerCase() === "new-patient") {
        return true;
      } else if (selectedFilter === "Completed" && patient.completed) {
        return true;
      } else if (selectedFilter === "Not Completed" && !patient.completed) {
        return true;
      } else if (selectedFilter === "All") {
        return true; // Show all patients when "All" is selected
      }
      return false; // Filter out patients that don't match the selected filter
    });
    
    // Update the displayed patients with the filtered list
    displayFilteredPatients(filteredPatients);
  });
});

// Add an event listener to the search input
const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value.toLowerCase();
  const filteredPatients = filterPatientsBySearch(searchQuery);
  displayFilteredPatients(filteredPatients);
});
function filterPatientsBySearch(query) {
  return patients.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    const patientID = patient.patientID.toLowerCase();
    const diagnosis = patient.diagnosis.toLowerCase();
    return fullName.includes(query) || patientID.includes(query) || diagnosis.includes(query);
  });
}




// Function to display filtered patients
function displayFilteredPatients(filteredPatients) {
  const patientsList = document.querySelector(".patients-list");
  patientsList.innerHTML = ""; // Clear the current patient list

  // Loop through the filtered patients and display them
  filteredPatients.forEach((patientPerson) => {
    // Create and display patient elements similar to your existing code
    // ...
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
      updateDonePatients();
      checkActivePatients();
      checkNonActivePatients()
      displayPatients();
      loader()
    })

    // checkbox event
    checkbox.addEventListener("change", (e) =>{
      console.log("checked")
      patientPerson.completed = checkbox.checked;
      localStorage.setItem("patients", JSON.stringify(patients));
      updateDonePatients();
      checkActivePatients()
      checkNonActivePatients()
      console.log(numberOfDonePatients);
      loader();
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
