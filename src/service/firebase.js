import firebase from "firebase/app"; // first
import "firebase/firestore";

try {
  firebase.initializeApp({
    apiKey: "AIzaSyArzdejXMvZQr1W4IGSWLSGBwzE3A-2lqw",
    authDomain: "agenda-28c33.firebaseapp.com",
    projectId: "agenda-28c33",
    storageBucket: "agenda-28c33.appspot.com",
    messagingSenderId: "189359620336",
    appId: "1:189359620336:web:64bf73bb8a4a4989bf8235",
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export default firebase.firestore();
