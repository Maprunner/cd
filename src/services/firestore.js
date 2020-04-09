import * as firebase from "firebase/app";
import firebaseConfig from "./config.js";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
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
  authenticateAnonymously().then(() => {
    console.log("Logged in")
    db.collection('results')
    .orderBy("type", "asc")
    .orderBy("score", "desc")
    .orderBy("time", "asc")
    .onSnapshot(updater);
  }
  ).catch((error) => {
    console.error("Anonymous auth failed: ", error);
  });
};