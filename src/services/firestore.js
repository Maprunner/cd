import * as firebase from "firebase/app";
import firebaseConfig from "./config.js";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const resultsTable = "testresults"

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

export const saveWebResult = (result) => {
  // TODO
  console.log("Saving result: " + JSON.stringify(result))
  return;
  return db.collection(resultsTable).add(result)
    .then((docRef) => {
      console.log("Result added with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding result: ", error);
    })
};

export const registerForWebResults = (type, onChange) => {
  return db.collection(resultsTable)
    .where("type", "==", type)
    .orderBy("score", "desc")
    .orderBy("wrong", "asc")
    .orderBy("time", "asc")
    .onSnapshot(onChange)
}