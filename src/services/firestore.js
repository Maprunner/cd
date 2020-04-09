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
  return db.collection("results").add(result)
    .then((docRef) => {
      console.log("Result added with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding result: ", error);
    })
};

export const saveError = (error) => {
  return db.collection("errors").add(error)
    .then((docRef) => {
      //console.log("Error saved with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding error: ", error);
    })
};

export const registerForWebResults = (onChange) => {
  return db.collection('results')
    .orderBy("type", "asc")
    .orderBy("score", "desc")
    .orderBy("wrong", "asc")
    .orderBy("time", "asc")
    .onSnapshot(onChange)
};