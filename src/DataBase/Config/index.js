import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBdjEKlW6D1QwzJ3CSptd-zfyXa6fp3rZM",
    authDomain: "155086598243-mgbvtipevn29d588s3mh0q8m91alufqj.apps.googleusercontent.com",
    projectId: "locashare-4071e",
    storageBucket: "locashare-4071e.appspot.com",
    appId: "1:155086598243:android:6b65c9362f9370b0958856",
};
initializeApp(firebaseConfig);
export const database = getFirestore();