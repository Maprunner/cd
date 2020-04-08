import * as firebase from "firebase/app";
import firebaseConfig from "./config.js";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
    firebase.auth().signInAnonymously().then(
        console.log("Logged in")
    ).catch((error) => {
        console.error("Anonymous auth failed: ", error);
    });
};

export const saveWebResult = (result) => {
      db.collection("results").add(result)
      .then((docRef) => {
        console.log("Result added with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding result: ", error);
      })
}

export const getWebResults = (updater) => {
  db.collection('results')
    .orderBy("type", "asc")
    .onSnapshot(updater);
};