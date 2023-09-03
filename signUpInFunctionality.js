 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
 import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

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
   const provider = new GoogleAuthProvider(app);



   signUpBtn.addEventListener("click", (e) =>{
     e.preventDefault();
 
     var username = document.getElementById("name").value;
     var email = document.getElementById("email").value;
     var password = document.getElementById("password").value;
 
     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       // Signed in 
       const user = userCredential.user;
 
       set(ref(database, 'users/' + user.uid), {
         username : username,
         email: email,
       })
 
       // ...
       alert("user created");
       signUpForm.reset();
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       // ..
       alert(errorMessage);
     });
     })
 
     signInBtn.addEventListener("click", (e) =>{
       e.preventDefault();
 
       var email = document.getElementById("uEmail").value;
       var password = document.getElementById("uPassword").value;
 
 
       signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         // ...
         const dt = new Date();
         update(ref(database, 'users/' + user.uid), {
         last_login : dt,
         })
         alert("user loged in!");
         signInForm.reset();
 
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         alert(errorMessage);
       });
 
     })

     const user = auth.currentUser;
     //when user is signed in
     onAuthStateChanged(auth, (user) => {
       if (user) {
         // User is signed in, see docs for a list of available properties
         // https://firebase.google.com/docs/reference/js/auth.user
         const uid = user.uid;
         // window.location.replace("http://127.0.0.1:5500/index.html");
 
         // ...
       } else {
         // User is signed out
         // ...
       }
     });
 
     googleLogInBtn.addEventListener("click", (e) =>{
      googleLog();
     })
     googleLogUpBtn.addEventListener("click", (e) =>{
      googleLog();
     })
     function googleLog() {
      signInWithRedirect(auth, provider);
      getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
     }

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