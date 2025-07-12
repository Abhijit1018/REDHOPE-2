import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDFZsh1x2D0nCJIm1SYM-6vkqvHFkHPyIU",
    authDomain: "redhope-2.firebaseapp.com",
    projectId: "redhope-2",
    storageBucket: "redhope-2.firebasestorage.app",
    messagingSenderId: "826738979676",
    appId: "1:826738979676:web:01436efd6c8c3d6ac04799",
    measurementId: "G-GCF9E7J5JD"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Login successful");
            window.location.href = "dashboard.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
});