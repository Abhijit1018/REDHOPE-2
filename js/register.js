import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
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

// Initialize Firebase with error handling
let app, analytics, auth, db;
try {
    console.log("🚀 Initializing Firebase...");
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("✅ Firebase initialized successfully");
} catch (error) {
    console.error("❌ Firebase initialization failed:", error);
    alert("Failed to initialize Firebase. Please refresh the page and try again.");
}

// Get form element
const form = document.querySelector('form');
const submitButton = document.getElementById("submit");

// Add timeout wrapper for Firebase operations
function withTimeout(promise, timeoutMs = 30000) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
        )
    ]);
}

// Reset button state
function resetButton() {
    submitButton.disabled = false;
    submitButton.textContent = "Create Account";
}

// Add form submit event listener
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    console.log("📝 Form submission started...");
    
    // Get form values
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    
    // Validate form
    if (!fullName || !email || !password || !role) {
        alert("Please fill in all fields");
        return;
    }
    
    // Validate Firebase is initialized
    if (!auth || !db) {
        alert("Firebase is not initialized. Please refresh the page and try again.");
        return;
    }
    
    // Disable submit button to prevent double submission
    submitButton.disabled = true;
    submitButton.textContent = "Creating Account...";
    
    console.log("🔐 Starting account creation process...");
    
    try {
        // Create user with Firebase Auth (with timeout)
        console.log("📧 Creating user with email and password...");
        const userCredential = await withTimeout(
            createUserWithEmailAndPassword(auth, email, password),
            30000 // 30 second timeout
        );
        const user = userCredential.user;
        console.log("✅ User created successfully:", user.uid);
        
        // Save additional user data to Firestore (with timeout)
        console.log("💾 Saving user data to Firestore...");
        await withTimeout(
            setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                email: email,
                role: role,
                createdAt: new Date().toISOString(),
                uid: user.uid
            }),
            15000 // 15 second timeout
        );
        console.log("✅ User data saved to Firestore successfully");
        
        alert("Account created successfully!");
        console.log("🎉 Account creation completed successfully");
        window.location.href = "dashboard.html";
        
    } catch (error) {
        console.error("❌ Error creating account:", error);
        
        let errorMessage = "An error occurred while creating your account.";
        
        // Handle timeout errors
        if (error.message === 'Operation timed out') {
            errorMessage = "The operation took too long. Please check your internet connection and try again.";
        } else {
            // Handle Firebase-specific errors
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "An account with this email already exists.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Please enter a valid email address.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Password should be at least 6 characters long.";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Network error. Please check your internet connection.";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Too many failed attempts. Please try again later.";
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = "Email/password accounts are not enabled. Please contact support.";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "This account has been disabled. Please contact support.";
                    break;
                default:
                    errorMessage = error.message || "An unexpected error occurred.";
            }
        }
        
        alert(errorMessage);
        console.log("❌ Account creation failed:", errorMessage);
        
    } finally {
        // Always reset button state
        resetButton();
        console.log("🔄 Button state reset");
    }
});

// Add error handling for unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error("❌ Unhandled promise rejection:", event.reason);
    resetButton();
    alert("An unexpected error occurred. Please try again.");
});

// Add error handling for global errors
window.addEventListener('error', function(event) {
    console.error("❌ Global error:", event.error);
    resetButton();
});

console.log("📝 Register.js loaded successfully");