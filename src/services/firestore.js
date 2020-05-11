import * as firebase from "firebase/app";
import {firebaseLockdownConfig, firebaseCDConfig} from "./config.js";
import "firebase/firestore";
import "firebase/auth";

const eventCollection = "events"
const resultCollection = "results"
const runnerCollection = "testrunners"
const stageResultCollection = "stageResults"
const config = firebaseLockdownConfig

firebase.initializeApp(config);
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
  //return db.collection(runnerCollection).doc(id).set(runner)
}

export const addEvent = (id, event) => {
  //return db.collection(eventCollection).doc(id).set(event)
}

export const getResultsByEvent = (event) => {
  return db.collection(resultCollection).doc(event).get()
}

export const getStageResultsForEvent = (eventid, stageid) => {
  console.log("Get stage results for ", eventid, " for ", stageid, " from ", stageResultCollection)
  return db.collection(stageResultCollection).doc(eventid).collection("stages").doc(stageid).get()
}

export const writeStageResultsForEvent = (eventid, stageid, results) => {
  console.log("Writing stage results for ", eventid, " for ", stageid, " to ", stageResultCollection)
  return db.collection(stageResultCollection).doc(eventid).collection("stages").doc(stageid).set(results)
}

// export const updateStagesForEvent = (id, stages) => {
//   return db.collection(eventCollection).doc(id).set({stages: stages}, {merge: true})
// }

// export const updateCategoriesForEvent = (id, cats) => {
//   return db.collection(eventCollection).doc(id).set({categories: cats}, {merge: true})
// }

// export const registerForWebResults = (type, onChange) => {
//   return db.collection(resultCollection)
//     .where("type", "==", type)
//     .orderBy("score", "desc")
//     .orderBy("wrong", "asc")
//     .orderBy("time", "asc")
//     .onSnapshot(onChange)
// }