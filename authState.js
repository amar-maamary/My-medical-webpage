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
  const signInButton = document.getElementById("getSignInForm");
  const signUpButton = document.getElementById("getSignUpForm");
  const profileForm = document.querySelector(".profile");
  const userEmail = document.querySelector(".emailh");
  const userName = document.querySelectorAll(".userName");
  const profilePhoto = document.querySelectorAll(".profile-photo");
  const photoFile = document.getElementById("photo-file");

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, hide the sign-in and sign-up buttons
      console.log(user);

      signInButton.style.display = "none";
      signUpButton.style.display = "none";
      profileForm.style.display = "block";

      var image = localStorage.getItem("profileImg") || user.photoURL ;
      console.log(image); 
          profilePhoto.forEach(photo =>{
          if (image === null){
            photo.innerHTML = `<i class="fa-solid fa-user-doctor"></i>`;
          }else{
            photo.innerHTML = `<img src = "${image}" class="profile-main-photo">`;
          }
        })

      onValue( ref(database, 'users/' + user.uid), (snapshot) => {
        userName.forEach(one =>{
          one.innerText = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        });
        userEmail.innerText = (snapshot.val() && snapshot.val().email) || 'Anonymous';

      });
      
      photoFile.addEventListener("change", (e) =>{
        var urlink = URL.createObjectURL(e.target.files[0]);
        profilePhoto.forEach(photo =>{
          photo.innerHTML = `<img src = " ${urlink} " class="profile-main-photo">`
        })
        localStorage.setItem("profileImg", urlink);
      })
    } 
    else {
      // User is signed out, show the sign-in and sign-up buttons
      signInButton.style.display = "block";
      signUpButton.style.display = "block";
      profilePhoto.forEach(photo =>{
        photo.style.display = "none";
      });
      userName.forEach(uname =>{
        uname.style.display = "none";
      })
    }
  });
};


///////////////////// Log out btn //////////////////////////
 logOutBtn.addEventListener("click", (e) =>{
   signOut(auth).then(() => {
       // Sign-out successful.
       alert('User loget out! ');
       location.reload()
     }).catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       alert(errorMessage);
     });
 })



export default authStateHandler;