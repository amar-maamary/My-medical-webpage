import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

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
const auth = getAuth();


function authStateHandler () {
  const signInButton = document.getElementById("getSignInForm");
  const signUpButton = document.getElementById("getSignUpForm");
  const profileForm = document.querySelector(".profile");
  const userEmail = document.querySelector(".emailh");
  const userName = document.querySelectorAll(".userName");


onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, hide the sign-in and sign-up buttons
      console.log(user);

      signInButton.style.display = "none";
      signUpButton.style.display = "none";
      profileForm.style.display = "block";
      userEmail.innerText = user.email;
      userName.forEach(one =>{
        one.innerText = user.displayName;
      })
    } else {
      // User is signed out, show the sign-in and sign-up buttons
      signInButton.style.display = "block";
      signUpButton.style.display = "block";
      profileForm.style.display = "none";
    }
  });
};

export default authStateHandler;