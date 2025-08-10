import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

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
let app, analytics, auth;
try {
    console.log("🚀 Initializing Firebase for login...");
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);
    console.log("✅ Firebase initialized successfully for login");
} catch (error) {
    console.error("❌ Firebase initialization failed for login:", error);
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
    submitButton.textContent = "Sign In";
}

// Add form submit event listener
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    console.log("📝 Login form submission started...");
    
    // Get form values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Validate form
    if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }
    
    // Validate Firebase is initialized
    if (!auth) {
        alert("Firebase is not initialized. Please refresh the page and try again.");
        return;
    }
    
    // Disable submit button to prevent double submission
    submitButton.disabled = true;
    submitButton.textContent = "Signing In...";
    
    console.log("🔐 Starting login process...");
    
    try {
        // Sign in with Firebase Auth (with timeout)
        console.log("📧 Signing in with email and password...");
        const userCredential = await withTimeout(
            signInWithEmailAndPassword(auth, email, password),
            30000 // 30 second timeout
        );
        const user = userCredential.user;
        console.log("✅ Login successful:", user.uid);
        
        alert("Login successful!");
        console.log("🎉 Login completed successfully");
        window.location.href = "dashboard.html";
        
    } catch (error) {
        console.error("❌ Error signing in:", error);
        
        let errorMessage = "An error occurred while signing in.";
        
        // Handle timeout errors
        if (error.message === 'Operation timed out') {
            errorMessage = "The login operation took too long. Please check your internet connection and try again.";
        } else {
            // Handle Firebase-specific errors
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = "No account found with this email address.";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Incorrect password. Please try again.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Please enter a valid email address.";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "This account has been disabled. Please contact support.";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Too many failed attempts. Please try again later.";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Network error. Please check your internet connection.";
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = "Email/password sign-in is not enabled. Please contact support.";
                    break;
                case 'auth/invalid-credential':
                    errorMessage = "Invalid email or password. Please try again.";
                    break;
                default:
                    errorMessage = error.message || "An unexpected error occurred during sign-in.";
            }
        }
        
        alert(errorMessage);
        console.log("❌ Login failed:", errorMessage);
        
    } finally {
        // Always reset button state
        resetButton();
        console.log("🔄 Button state reset");
    }
});

// Add error handling for unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error("❌ Unhandled promise rejection during login:", event.reason);
    resetButton();
    alert("An unexpected error occurred. Please try again.");
});

// Add error handling for global errors
window.addEventListener('error', function(event) {
    console.error("❌ Global error during login:", event.error);
    resetButton();
});

console.log("📝 Login.js loaded successfully");