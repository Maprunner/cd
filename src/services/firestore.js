import * as firebase from "firebase/app";
import firebaseConfig from "./config.js";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

export const saveResultsForEvent = (eventid, results) => {
  return db.collection("results").doc(eventid).set({data: JSON.stringify(results)})
}

export const saveError = (error) => {
  // TODO
  console.log("Saving error: " + JSON.stringify(error))
  return;
  return db.collection("errors").add(error)
    .then((docRef) => {
      //console.log("Error saved with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding error: ", error);
    })
};
export const getEvents = () => {
  return db.collection('events')
  .get()
}

export const addRunner = (id, runner) => {
  return db.collection('runners').doc(id).set(runner)
}

export const addEvent = (id, event) => {
  return db.collection('events').doc(id).set(event)
}

export const getResultsByEvent = (event) => {
  return db.collection('results').doc(event).get()
}

export const saveResultForEvent = (eventid, runnerid, result) => {
  return db.collection('stageResults').doc(eventid).collection("runners")
  .doc(runnerid).set(result, {merge: true})
}

export const getStageResultsForEvent = (eventid) => {
  return db.collection('stageResults').doc(eventid).collection("runners")
  //.limit(3).get()
  .get()
}

export const updateStagesForEvent = (id, stages) => {
  return db.collection("events").doc(id).set({stages: stages}, {merge: true})
}

export const registerForWebResults = (type, onChange) => {
  return db.collection('results')
    .where("type", "==", type)
    .orderBy("score", "desc")
    .orderBy("wrong", "asc")
    .orderBy("time", "asc")
    .onSnapshot(onChange)
}