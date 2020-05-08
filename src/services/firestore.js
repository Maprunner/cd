import * as firebase from "firebase/app"
import { firebaseCDConfig, firebaseLockdownConfig } from "./config.js"
import "firebase/firestore"
import "firebase/auth"

firebase.initializeApp(firebaseLockdownConfig)
// const lockdown = firebase.initializeApp(firebaseLockdownConfig, "lockdown-results")
const db = firebase.firestore()
const resultsCollection = "results-cd"
const stageResultsCollection = "stageResults"

export const saveLockdownResult = (eventid, stageid, result) => {
  console.log("Saving result for event", eventid, " for stage", stageid)
  db.collection(stageResultsCollection).doc(eventid).collection("stages").doc(stageid).set(result, {merge: true})
  .catch((error) => {
    console.error("Error saving Lockdown results: ", error);
  })
}

// export const saveLockdownResult = (eventid, stageid, result) => {
//   lockdown.auth().signInAnonymously().then(() => {
//     console.log("Saving result for event", eventid, " for stage", stageid)
//     lockdown.firestore().collection(stageResultsCollection).doc(eventid).collection("stages").doc(stageid).set(result, {merge: true})
//   }).then(() => {
//     console.log("Signing out")
//     lockdown.auth().signOut()
//   }).catch((error) => {
//     console.error("Error saving Lockdown results: ", error);
//   })
// }

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously()
}

export const signOut = () => {
  return firebase.auth().signOut()
}

export const saveWebResult = (title, result) => {
  console.log("Saving result: " + JSON.stringify(result))
  return db.collection(resultsCollection).doc(title).set(result, {merge: true})
}

export const getWebResults = (number) => {
  // orderBy returns nothing if key does not exist
  return db.collection(resultsCollection).orderBy(number.toString()).get()
}

// export const registerForWebResults = (type, onChange) => {
//   return db.collection(resultsTable)
//     .where("type", "==", type)
//     .orderBy("score", "desc")
//     .orderBy("wrong", "asc")
//     .orderBy("time", "asc")
//     .onSnapshot(onChange)
// }