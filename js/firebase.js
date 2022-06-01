// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCc0CP1kitkYn6uNxSuofaenJy3GMHs-q4",
    authDomain: "espectro-76402.firebaseapp.com",
    projectId: "espectro-76402",
    storageBucket: "espectro-76402.appspot.com",
    messagingSenderId: "264375045825",
    appId: "1:264375045825:web:4e9105a3c8f517eb99ce40",
    measurementId: "G-2HQMJ1FRXC"
};

const app = initializeApp(firebaseConfig);