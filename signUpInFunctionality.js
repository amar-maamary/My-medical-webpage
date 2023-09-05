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
    alert("user created");
    signUpForm.reset();
  })
  .catch((error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        alert(`Email address ${email} already in use.`);
        break;
      case 'auth/invalid-email':
        alert(`Email address ${email} is invalid.`);
        break;
      case 'auth/operation-not-allowed':
        alert(`Error during sign up.`);
        break;
      case 'auth/weak-password':
        alert('Password is not strong enough. Add additional characters including special characters and numbers. Note: password should contain at least 6 characters.');
        break;
      default:
        alert(error.message);
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
    const dt = new Date();
    //Update log in date in to database
    update(ref(database, 'users/' + user.uid), {
    last_login : dt,
    })
    alert("user loged in!");
    signInForm.reset();
  })
  .catch((error) => {
    switch (error.code) {
      case 'auth/invalid-email':
        alert(`Email '${email}' is invalid. Please make sure you are entering the email correctly.`);
        break;
      case 'auth/user-disabled':
        alert(`The '${email}' user account has been disabled by an administrator.`);
        break;
      case 'auth/user-not-found':
        alert(`There is no user record corresponding to this email '${email}'.`);
        break;
      case 'auth/wrong-password':
        alert('The password is invalid or the user does not have a password.');
        break;
      default:
        alert(error.message);
        break;
    }
  });
});

///////////////////// Custumize my HTML when user is signed in //////////////////////////
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
  const uid = user.uid;
  // window.location.replace("http://127.0.0.1:5500/index.html");
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
      alert(`Welcome ${username}`);
    } else {
      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login : dt,
      });
      alert(`Welcome Back ${username}`);
    } 
    
  })
    
  .catch((error) => {
    switch (error.code) {
      case 'auth/user-disabled':
        alert(`The '${email}' user account has been disabled by an administrator.`);
        break;
      case 'auth/operation-not-allowed':
        alert(`Error during sign up.`);
        break;
      default:
        alert(error.message);
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
    alert("Password reset email sent!");
    emailInput.value = "";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
})
