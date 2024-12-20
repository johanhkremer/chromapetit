import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.MY_API_KEY,
    authDomain: process.env.MY_AUTH_DOMAIN,
    projectId: process.env.MY_PROJECT_ID,
    storageBucket: "chromapetit-3528f.firebasestorage.app",
    messagingSenderId: process.env.MY_MESSAGING_SENDER_ID,
    appId: process.env.MY_APP_ID,
    measurementId: process.env.MY_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };