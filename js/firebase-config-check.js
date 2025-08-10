// Firebase Configuration Checker
// This script helps verify Firebase configuration and identify issues

const firebaseConfig = {
    apiKey: "AIzaSyDFZsh1x2D0nCJIm1SYM-6vkqvHFkHPyIU",
    authDomain: "redhope-2.firebaseapp.com",
    projectId: "redhope-2",
    storageBucket: "redhope-2.firebasestorage.app",
    messagingSenderId: "826738979676",
    appId: "1:826738979676:web:01436efd6c8c3d6ac04799",
    measurementId: "G-GCF9E7J5JD"
};

// Configuration validation
function validateFirebaseConfig() {
    console.log("🔍 Validating Firebase Configuration...");
    
    const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
    const missingFields = [];
    
    requiredFields.forEach(field => {
        if (!firebaseConfig[field]) {
            missingFields.push(field);
        }
    });
    
    if (missingFields.length > 0) {
        console.error("❌ Missing required Firebase configuration fields:", missingFields);
        return false;
    }
    
    console.log("✅ All required Firebase configuration fields are present");
    
    // Check for common configuration issues
    if (firebaseConfig.authDomain === 'your-project.firebaseapp.com') {
        console.warn("⚠️ Warning: authDomain appears to be a placeholder value");
    }
    
    if (firebaseConfig.apiKey.length < 20) {
        console.warn("⚠️ Warning: API key seems too short");
    }
    
    if (firebaseConfig.projectId === 'your-project-id') {
        console.warn("⚠️ Warning: projectId appears to be a placeholder value");
    }
    
    return true;
}

// Check if running on localhost vs deployed
function checkEnvironment() {
    console.log("🌐 Checking Environment...");
    
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    console.log(`Current hostname: ${hostname}`);
    console.log(`Current protocol: ${protocol}`);
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        console.log("✅ Running on localhost - Firebase should work");
    } else if (protocol === 'https:') {
        console.log("✅ Running on HTTPS - Firebase should work");
    } else if (protocol === 'http:') {
        console.warn("⚠️ Running on HTTP - Firebase may have issues in production");
    }
    
    // Check for common deployment platforms
    if (hostname.includes('netlify.app')) {
        console.log("📱 Detected Netlify deployment");
    } else if (hostname.includes('vercel.app')) {
        console.log("📱 Detected Vercel deployment");
    } else if (hostname.includes('github.io')) {
        console.log("📱 Detected GitHub Pages deployment");
    } else if (hostname.includes('firebaseapp.com')) {
        console.log("📱 Detected Firebase Hosting deployment");
    }
}

// Check for common deployment issues
function checkDeploymentIssues() {
    console.log("🚀 Checking for Common Deployment Issues...");
    
    // Check if scripts are loading
    const scripts = document.querySelectorAll('script[src*="firebase"]');
    console.log(`Found ${scripts.length} Firebase-related scripts:`, scripts);
    
    // Check for mixed content
    const hasMixedContent = window.location.protocol === 'https:' && 
                           document.querySelector('script[src^="http:"]');
    if (hasMixedContent) {
        console.error("❌ Mixed content detected - HTTP scripts on HTTPS page");
    } else {
        console.log("✅ No mixed content issues detected");
    }
    
    // Check for CORS issues
    const hasExternalScripts = Array.from(scripts).some(script => 
        script.src.includes('gstatic.com') || script.src.includes('firebase')
    );
    if (hasExternalScripts) {
        console.log("✅ External Firebase scripts detected");
    }
}

// Check browser compatibility
function checkBrowserCompatibility() {
    console.log("🌍 Checking Browser Compatibility...");
    
    const userAgent = navigator.userAgent;
    console.log(`User Agent: ${userAgent}`);
    
    // Check for modern browser features
    const hasModules = 'noModule' in HTMLScriptElement.prototype;
    const hasFetch = 'fetch' in window;
    const hasPromise = 'Promise' in window;
    
    console.log(`ES6 Modules support: ${hasModules ? '✅' : '❌'}`);
    console.log(`Fetch API support: ${hasFetch ? '✅' : '❌'}`);
    console.log(`Promise support: ${hasPromise ? '✅' : '❌'}`);
    
    if (!hasModules) {
        console.error("❌ Browser doesn't support ES6 modules - Firebase won't work");
    }
    
    if (!hasFetch) {
        console.warn("⚠️ Browser doesn't support Fetch API - may cause issues");
    }
    
    if (!hasPromise) {
        console.error("❌ Browser doesn't support Promises - Firebase won't work");
    }
}

// Network connectivity test
async function testNetworkConnectivity() {
    console.log("🌐 Testing Network Connectivity...");
    
    try {
        // Test basic internet connectivity
        const response = await fetch('https://www.google.com/favicon.ico', { 
            method: 'HEAD',
            mode: 'no-cors'
        });
        console.log("✅ Basic internet connectivity: OK");
    } catch (error) {
        console.error("❌ Basic internet connectivity failed:", error);
    }
    
    try {
        // Test Firebase domain connectivity
        const response = await fetch('https://firebase.google.com/favicon.ico', { 
            method: 'HEAD',
            mode: 'no-cors'
        });
        console.log("✅ Firebase domain connectivity: OK");
    } catch (error) {
        console.error("❌ Firebase domain connectivity failed:", error);
    }
    
    try {
        // Test Google static domain connectivity
        const response = await fetch('https://www.gstatic.com/favicon.ico', { 
            method: 'HEAD',
            mode: 'no-cors'
        });
        console.log("✅ Google static domain connectivity: OK");
    } catch (error) {
        console.error("❌ Google static domain connectivity failed:", error);
    }
}

// Run all checks
async function runConfigurationCheck() {
    console.log("🔧 Starting Firebase Configuration Check...");
    console.log("=" .repeat(50));
    
    validateFirebaseConfig();
    console.log("-" .repeat(30));
    
    checkEnvironment();
    console.log("-" .repeat(30));
    
    checkDeploymentIssues();
    console.log("-" .repeat(30));
    
    checkBrowserCompatibility();
    console.log("-" .repeat(30));
    
    await testNetworkConnectivity();
    console.log("-" .repeat(30));
    
    console.log("🔧 Configuration check completed!");
    console.log("=" .repeat(50));
    
    // Summary
    console.log("\n📋 Summary of Findings:");
    console.log("1. Check the console for any ❌ errors above");
    console.log("2. Ensure your domain is authorized in Firebase Console");
    console.log("3. Verify Firestore security rules are configured");
    console.log("4. Check if you're using HTTPS in production");
    console.log("5. Ensure all scripts are loading correctly");
}

// Export for use in other files
window.firebaseConfigCheck = {
    validateFirebaseConfig,
    checkEnvironment,
    checkDeploymentIssues,
    checkBrowserCompatibility,
    testNetworkConnectivity,
    runConfigurationCheck
};

// Auto-run configuration check
document.addEventListener('DOMContentLoaded', () => {
    console.log("Firebase configuration checker loaded. Run 'firebaseConfigCheck.runConfigurationCheck()' to check configuration.");
    
    // Auto-run after a short delay
    setTimeout(() => {
        firebaseConfigCheck.runConfigurationCheck();
    }, 1000);
}); 