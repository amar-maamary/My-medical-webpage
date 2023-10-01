 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
 import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

// Your web app's Firebase configuration
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
const auth = getAuth(app);


const userName = document.querySelectorAll(".userName");
const profilePhoto = document.querySelectorAll(".profile-photo");
const profileForm = document.querySelector(".profile");

///////////////////// Sign Up //////////////////////////
signUpForm.addEventListener("submit", (e) =>{
  e.preventDefault();

  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    //Add to database
    set(ref(database, 'users/' + user.uid), {
      username : username,
      email: email,
    })
    positiveAlert.style.display = "block";
    positiveAlertMessage.innerText =  ` Welcome ${username}, User is successfully created! `;
  })
  .catch((error) => {
    negativeAlert.style.display = "block";
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorAlertMessage.innerText = ` Email address ${email} already in use.`;
        break;
      case 'auth/invalid-email':
        errorAlertMessage.innerText = ` Email address ${email} is invalid.`;
        break;
      case 'auth/operation-not-allowed':
        errorAlertMessage.innerText = ` Error during sign up.`;
        break;
      case 'auth/weak-password':
        errorAlertMessage.innerText = ' Password is not strong enough. Add additional characters including special characters and numbers. Note: password should contain at least 6 characters.';
        break;
      default:
        errorAlertMessage.innerText = error.message;
        break;
    }
  });
});


///////////////////// Google Btn //////////////////////////
const googleProvider = new GoogleAuthProvider(app);
googleSign.addEventListener("click", (e) =>{
  signWithGoogleFunction()
});

// SIGN WITH GOOGLE FUNCTION 
function signWithGoogleFunction(){
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    var username = user.displayName;
    var email = user.email;
    const dt = new Date();

    const { isNewUser } = getAdditionalUserInfo(result);
    if (isNewUser) {
      set(ref(database, 'users/' + user.uid), {
        username : username,
        email: email,
      });
      positiveAlert.style.display = "block";
      positiveAlertMessage.innerText = `Welcome ${username}, User is successfully created!`;
    } else {
      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login : dt,
      });
      positiveAlert.style.display = "block";
      positiveAlertMessage.innerText = `Welcome Back ${username} !`;
    } 
    
  })
    
  .catch((error) => {
    // negativeAlert.classList.add("show");
    negativeAlert.style.display = "block";
    switch (error.code) {
      case 'auth/user-disabled':
        errorAlertMessage.innerText = ` The '${email}' user account has been disabled by an administrator.`;
        break;
      case 'auth/operation-not-allowed':
        errorAlertMessage.innerText = ` Error during sign up.`;
        break;
      default:
        errorAlertMessage.innerText = error.message;
        break;
    }
  });
};


/////////////////// Custumize my HTML when user is signed in //////////////////////////
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
  const uid = user.uid;
  getSignInForm.style.display= "none";
  getSignUpForm.style.display= "none";
  profileForm.style.display = "block";
  profilePhoto.forEach(photo =>{
    photo.style.display = "block";
  });
  userName.forEach(uname =>{
    uname.style.display = "block";
  })

  positiveAlert.style.display = "block";
  
  container.innerHTML = `<img class="logImage" src="https://i.pinimg.com/originals/4e/26/c4/4e26c49b5f91d42e883f4b2cbf34d772.gif">`;
  container.style.backgroundColor = "var(--main-gray)";
  container.style.textAlign = 'center';
  container.style.height = 'auto';
  document.location.href = '/profile.html';

} 
  else {
  // User is signed out
  profilePhoto.forEach(photo =>{
    photo.style.display = "none";
  });
  userName.forEach(uname =>{
    uname.style.display = "none";
  })
  }
});
