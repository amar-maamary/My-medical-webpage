import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7HdEG7u5PL5CuEhCFugjFoFAIwT15xHE",
  authDomain: "registration-form-app-cac6d.firebaseapp.com",
  databaseURL: "https://registration-form-app-cac6d-default-rtdb.firebaseio.com",
  projectId: "registration-form-app-cac6d",
  storageBucket: "registration-form-app-cac6d.appspot.com",
  messagingSenderId: "435705828828",
  appId: "1:435705828828:web:d6638ac20b5594162beb19"
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


function authStateHandler () {
  // prof-first-div
    const profFirstDiv = document.querySelector(".prof-first-div");
    const profImage = document.querySelector(".prof-imag");
    const profUserName = document.querySelector(".prof-user-name");
    const profPhone = document.querySelector(".prof-user-phone");
    const profEmail = document.querySelector(".prof-user-email");
    const profAddress = document.querySelector(".prof-user-address");
    const profHospital = document.querySelector(".prof-user-hospital");
    const profSchool = document.querySelector(".prof-user-school");
    const profJob = document.querySelector(".prof-user-job-title");
    const profDescription = document.querySelector(".description");
    const socials = document.querySelector(".socials");
    const facebookLink = document.querySelector(".facebook");
    const twitterLink = document.querySelector(".twitter");
    const linkedinLink = document.querySelector(".linkeidn");
    const linkedinBtn = document.querySelector(".prof-linkedin");
    const facebookBtn = document.querySelector(".prof-facebook");
    const twitterBtn = document.querySelector(".prof-twitter");
    // experience-description
    const experienceDescription = document.querySelector(".experience-description");
    const experienceHospital = document.querySelector(".experience-hospital");
    const experienceStartDate = document.querySelector(".experience-start-date");
    const experienceEndDate = document.querySelector(".experience-end-date");

    function displayProfileData(user){
      profPhone.value =  localStorage.getItem("phoneNumber") || user.phoneNumber;
      profAddress.value = localStorage.getItem("profileAddress");
      profHospital.value = localStorage.getItem("profileHospital");
      profJob.value = localStorage.getItem("profileJob");
      profDescription.value = localStorage.getItem("profileDescription");
      profSchool.value = localStorage.getItem("profSchool");
      linkedinBtn.href = localStorage.getItem("linkedinLink");
      facebookBtn.href = localStorage.getItem("facebookLink");
      twitterBtn.href = localStorage.getItem("twitterLink");
    }

    function displayExperienceData(){
      experienceDescription.value = localStorage.getItem("experienceDescription");
      experienceHospital.value = localStorage.getItem("experienceHospital");
      experienceStartDate.value = localStorage.getItem("experienceStartDate");
      experienceEndDate.value = localStorage.getItem("experienceEndDate");
    }



  onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log( user);
        profImage.src = user.photoURL;
        function capitalizeFirstLetter(string) {
            const arr = string.split(" ");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            const str2 = arr.join(" ");
            return str2
        }
        var userName = capitalizeFirstLetter(user.displayName);
        profUserName.value = localStorage.getItem("profileName") || userName;
        profEmail.value = user.email;
        displayProfileData(user);
        displayExperienceData()

        editBtn.addEventListener("click", ()=>{
          console.log("click");
          socials.style.display = "block";
          saveBtn.style.display = "block";
          editBtn.style.display = "none";
          linkedinLink.value = localStorage.getItem("linkedinLink");
          facebookLink.value = localStorage.getItem("facebookLink");
          twitterLink.value = localStorage.getItem("twitterLink");
          profUserName.removeAttribute("readonly");
          profUserName.classList.add("edit");
          profPhone.removeAttribute("readonly");
          profAddress.removeAttribute("readonly");
          profHospital.removeAttribute("readonly");
          profJob.removeAttribute("readonly");
          profDescription.removeAttribute("readonly");
          profSchool.removeAttribute("readonly");
          profDescription.focus();

          })
          editExperienceBtn.addEventListener("click", ()=>{
            saveExperienceBtn.style.display = "block";
            editExperienceBtn.style.display = "none";
            experienceDescription.removeAttribute("readonly");
            experienceHospital.removeAttribute("readonly");
            experienceStartDate.removeAttribute("readonly");
            experienceEndDate.removeAttribute("readonly");;
            experienceDescription.focus();
            })

            saveExperienceBtn.addEventListener("click", ()=>{
              editExperienceBtn.style.display = "block";
              saveExperienceBtn.style.display = "none";
              localStorage.setItem("experienceDescription", experienceDescription.value);
              localStorage.setItem("experienceHospital", experienceHospital.value);
              localStorage.setItem("experienceStartDate", experienceStartDate.value);
              localStorage.setItem("experienceEndDate", experienceEndDate.value);
              experienceDescription.setAttribute("readonly", true);
              experienceHospital.setAttribute("readonly", true);
              experienceStartDate.setAttribute("readonly", true);
              experienceEndDate.setAttribute("readonly", true);
              displayExperienceData();
        })

          saveBtn.addEventListener("click", ()=>{
            editBtn.style.display = "block";
            saveBtn.style.display = "none";
            localStorage.setItem("profileName", profUserName.value);
            profUserName.classList.remove("edit");
            localStorage.setItem("phoneNumber", profPhone.value);
            localStorage.setItem("profileAddress", profAddress.value);
            localStorage.setItem("profileHospital", profHospital.value);
            localStorage.setItem("profileJob", profJob.value);
            localStorage.setItem("profileDescription", profDescription.value);
            localStorage.setItem("profSchool", profSchool.value);
            localStorage.setItem("facebookLink", facebookLink.value);
            localStorage.setItem("twitterLink", twitterLink.value);
            localStorage.setItem("linkedinLink", linkedinLink.value);
            profUserName.setAttribute("readonly", true);
            profPhone.setAttribute("readonly", true);
            profAddress.setAttribute("readonly", true);
            profHospital.setAttribute("readonly", true);
            profJob.setAttribute("readonly", true);
            profDescription.setAttribute("readonly", true);
            profSchool.setAttribute("readonly", true);
            socials.style.display = "none";
            displayProfileData(user);
      })

      // saveExperienceBtn.addEventListener("click", ()=>{

      // })

      } 
      else {
      }
    });
  };


  
  authStateHandler ()