import * as firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDn5gDoEstpgVNtFXOnduNW1HKoABusbJw",
    authDomain: "test-7a533.firebaseapp.com",
    databaseURL: "https://test-7a533.firebaseio.com",
    projectId: "test-7a533",
    storageBucket: "test-7a533.appspot.com",
    messagingSenderId: "782210626446",
    appId: "1:782210626446:web:23171c7b1fda7f60"
};
// Initialize Firebases
export const firebaseApp = firebase.initializeApp(firebaseConfig);
