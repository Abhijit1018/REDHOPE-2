// Firebase Debug and Test File
// This file helps debug Firebase connectivity issues after deployment

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDFZsh1x2D0nCJIm1SYM-6vkqvHFkHPyIU",
    authDomain: "redhope-2.firebaseapp.com",
    projectId: "redhope-2",
    storageBucket: "redhope-2.firebasestorage.app",
    messagingSenderId: "826738979676",
    appId: "1:826738979676:web:01436efd6c8c3d6ac04799",
    measurementId: "G-GCF9E7J5JD"
};

// Test Firebase initialization
function testFirebaseConnection() {
    try {
        const app = initializeApp(firebaseConfig);
        console.log("✅ Firebase app initialized successfully");
        
        const auth = getAuth(app);
        console.log("✅ Firebase Auth initialized successfully");
        
        const db = getFirestore(app);
        console.log("✅ Firestore initialized successfully");
        
        // Test if we can access Firebase services
        if (auth && db) {
            console.log("✅ All Firebase services are accessible");
            return { app, auth, db };
        } else {
            console.log("❌ Some Firebase services are not accessible");
            return null;
        }
    } catch (error) {
        console.error("❌ Firebase initialization failed:", error);
        return null;
    }
}

// Test Firestore write operation
async function testFirestoreWrite(db) {
    try {
        const testDoc = doc(db, "test", "connection-test");
        await setDoc(testDoc, {
            timestamp: new Date().toISOString(),
            message: "Firebase connection test",
            status: "success"
        });
        console.log("✅ Firestore write test successful");
        return true;
    } catch (error) {
        console.error("❌ Firestore write test failed:", error);
        return false;
    }
}

// Test Firestore read operation
async function testFirestoreRead(db) {
    try {
        const testDoc = doc(db, "test", "connection-test");
        const docSnap = await getDoc(testDoc);
        if (docSnap.exists()) {
            console.log("✅ Firestore read test successful:", docSnap.data());
            return true;
        } else {
            console.log("❌ Firestore read test failed: Document does not exist");
            return false;
        }
    } catch (error) {
        console.error("❌ Firestore read test failed:", error);
        return false;
    }
}

// Test Firebase Auth
async function testFirebaseAuth(auth) {
    try {
        // Just test if auth object is accessible
        const currentUser = auth.currentUser;
        console.log("✅ Firebase Auth test successful, current user:", currentUser);
        return true;
    } catch (error) {
        console.error("❌ Firebase Auth test failed:", error);
        return false;
    }
}

// Run all tests
async function runAllTests() {
    console.log("🚀 Starting Firebase connectivity tests...");
    
    const firebase = testFirebaseConnection();
    if (!firebase) {
        console.log("❌ Firebase initialization failed, stopping tests");
        return;
    }
    
    const { app, auth, db } = firebase;
    
    // Test each service
    const authTest = await testFirebaseAuth(auth);
    const writeTest = await testFirestoreWrite(db);
    const readTest = await testFirestoreRead(db);
    
    // Summary
    console.log("\n📊 Test Results Summary:");
    console.log(`Firebase Auth: ${authTest ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Firestore Write: ${writeTest ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Firestore Read: ${readTest ? '✅ PASS' : '❌ FAIL'}`);
    
    if (authTest && writeTest && readTest) {
        console.log("🎉 All tests passed! Firebase is working correctly.");
    } else {
        console.log("⚠️ Some tests failed. Check the console for details.");
    }
}

// Export functions for use in other files
window.firebaseDebug = {
    testFirebaseConnection,
    testFirestoreWrite,
    testFirestoreRead,
    testFirebaseAuth,
    runAllTests
};

// Auto-run tests when file is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("Firebase debug file loaded. Run 'firebaseDebug.runAllTests()' to test connectivity.");
});

// Run tests automatically after a short delay
setTimeout(() => {
    if (typeof firebaseDebug !== 'undefined') {
        firebaseDebug.runAllTests();
    }
}, 1000); 