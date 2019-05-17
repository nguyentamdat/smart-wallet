import * as firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyChLykabtAmjvgi1rnAqWB9l2kiRXKHwaU",
    authDomain: "srem-b062f.firebaseapp.com",
    databaseURL: "https://srem-b062f.firebaseio.com",
    projectId: "srem-b062f",
    storageBucket: "srem-b062f.appspot.com",
    appId: "1:444508632292:android:6ad89833f3d02651"
};
// Initialize Firebases
export const firebaseApp = firebase.initializeApp(firebaseConfig);

// firebase
//     .firestore()
//     .enablePersistence()
//     .catch(function(err) {
//         if (err.code == "failed-precondition") {
//             // Multiple tabs open, persistence can only be enabled
//             // in one tab at a a time.
//             // ...
//         } else if (err.code == "unimplemented") {
//             // The current browser does not support all of the
//             // features required to enable persistence
//             // ...
//         }
//     });

// firebase.firestore().settings({
//     cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
// });
