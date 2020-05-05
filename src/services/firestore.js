import * as firebase from "firebase/app";
import firebaseConfig from "./config.js";
import "firebase/firestore";
import "firebase/auth";

const eventCollection = "events"
const resultCollection = "results"
const runnerCollection = "runners"
const stageResultCollection = "stageResults"

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

export const saveResultsForEvent = (eventid, results) => {
  return db.collection(resultCollection).doc(eventid).set({data: JSON.stringify(results)})
}

export const getEvents = () => {
  return db.collection(eventCollection)
  .get()
}

export const addRunner = (id, runner) => {
  return db.collection(runnerCollection).doc(id).set(runner)
}

export const addEvent = (id, event) => {
  return db.collection(eventCollection).doc(id).set(event)
}

export const getResultsByEvent = (event) => {
  return db.collection(resultCollection).doc(event).get()
}

export const saveResultForEvent = (eventid, runnerid, result) => {
  return db.collection(stageResultCollection).doc(eventid).collection("runners")
  .doc(runnerid).set(result, {merge: true})
}

export const getStageResultsForEvent = (eventid) => {
  return db.collection(stageResultCollection).doc(eventid).collection("runners")
  //.limit(3).get()
  .get()
}

export const getStageResultsForRunner = (eventid, runnerid) => {
  return db.collection(stageResultCollection).doc(eventid).collection("runners").doc(runnerid)
  .get()
}


export const updateStagesForEvent = (id, stages) => {
  return db.collection(eventCollection).doc(id).set({stages: stages}, {merge: true})
}

export const updateCategoriesForEvent = (id, cats) => {
  return db.collection(eventCollection).doc(id).set({categories: cats}, {merge: true})
}

export const registerForWebResults = (type, onChange) => {
  return db.collection(resultCollection)
    .where("type", "==", type)
    .orderBy("score", "desc")
    .orderBy("wrong", "asc")
    .orderBy("time", "asc")
    .onSnapshot(onChange)
}