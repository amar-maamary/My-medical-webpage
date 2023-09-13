 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
 import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
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

///////////////////// Sign Up //////////////////////////
signUpBtn.addEventListener("click", (e) =>{
  e.preventDefault();

  var username = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    //Add to database
    set(ref(database, 'users/' + user.uid), {
      username : username,
      email: email,
    })
    positiveAlert.style.display = "block";
    positiveAlertMessage.innerText =  ` Welcome ${username}, User is successfully created! `;
    signUpForm.reset();
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
 
///////////////////// Sign In //////////////////////////
signInBtn.addEventListener("click", (e) =>{
  e.preventDefault();

  var email = document.getElementById("uEmail").value;
  var password = document.getElementById("uPassword").value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    var username = user.displayName;
    const dt = new Date();
    //Update log in date in to database
    update(ref(database, 'users/' + user.uid), {
    last_login : dt,
    })
    positiveAlert.style.display = "block";
    // positiveAlertMessage.innerText = " User successfully loged in!";
    positiveAlertMessage.innerText = `Welcome Back ${username} !`;
    signInForm.reset();
  })
  .catch((error) => {
    negativeAlert.style.display = "block";
    switch (error.code) {
      // errorAlertMessage.classList.add("mystyle");
      case 'auth/invalid-email':
        errorAlertMessage.innerText = ` Email '${email}' is invalid. Please make sure you are entering the right email.`;
        break;
      case 'auth/user-disabled':
        errorAlertMessage.innerText = ` The '${email}' user account has been disabled by an administrator.`;
        break;
      case 'auth/user-not-found':
        errorAlertMessage.innerText =` There is no user record corresponding to this email '${email}'.`;
        break;
      case 'auth/wrong-password':
        errorAlertMessage.innerText =' The password is invalid or the user does not have a password.';
        break;
      default:
        errorAlertMessage.innerText = error.message;
        break;
    }
  });
});
///////////////////// Google Btn //////////////////////////
const googleProvider = new GoogleAuthProvider(app);
googleBtnSignIn.addEventListener("click", (e) =>{
  signWithGoogleFunction()
});
googleBtnSignUp.addEventListener("click", (e) =>{
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


/////// Email verification //////
sendVerificationEmailBtn.addEventListener("click", (e)=>{
  var emailInput = document.getElementById("verEmail");
  var email = emailInput.value;
  sendPasswordResetEmail(auth, email)
  .then(() => {
    positiveAlert.style.display = "block";
    positiveAlertMessage.innerText = "Password Reset email is successfully sent!";
    emailInput.value = "";
  })
  .catch((error) => {
    negativeAlert.style.display = "block";
    const errorCode = error.code;
    const errorMessage = error.message;
    errorAlertMessage.innerText = errorMessage;
  });
})

/////////////////// Custumize my HTML when user is signed in //////////////////////////
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
  const uid = user.uid;
  // window.location.replace("http://127.0.0.1:5500/index.html");
  getSignInForm.style.display= "none";
  getSignUpForm.style.display= "none";
  positiveAlert.style.display = "block";
  container.innerHTML = `<img class="logImage" src="https://i.pinimg.com/originals/4e/26/c4/4e26c49b5f91d42e883f4b2cbf34d772.gif">`;
  // https://i.pinimg.com/originals/e0/6d/07/e06d076ea97ea30d49ef18bc16b37956.gif
  // https://cdn.dribbble.com/users/856306/screenshots/4120104/medical_building_800x600.gif
  // https://i.pinimg.com/originals/4e/26/c4/4e26c49b5f91d42e883f4b2cbf34d772.gif
  // https://cdn.dribbble.com/users/60266/screenshots/1560009/media/26a57b3dcc85c5907edb12d65e9076fa.gif
  // https://i.pinimg.com/originals/c0/c9/c2/c0c9c2a6b0a99053b87b14114c876000.gif
  // https://i.pinimg.com/originals/c0/7b/09/c07b0987532e9e70532f5a7efb9d9643.gif
  // https://i.pinimg.com/originals/90/04/b2/9004b278c6a1d58c9fdf4a1b05222127.gif
  container.style.backgroundColor = "var(--main-gray)";
  container.style.textAlign = 'center';
  container.style.boxShadow = 'none';
  container.style.height = 'auto';
} 
  else {
  // User is signed out

  }
});


///////////////////// Log out btn //////////////////////////
//  logOutBtn.addEventListener("click", (e) =>{
//    signOut(auth).then(() => {
//        // Sign-out successful.
//        alert('user loget out');
//      }).catch((error) => {
//        const errorCode = error.code;
//        const errorMessage = error.message;
//        alert(errorMessage);
//      });
//  })

