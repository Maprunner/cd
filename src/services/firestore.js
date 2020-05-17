import * as firebase from "firebase/app";
import {firebaseLockdownConfig, firebaseCDConfig} from "./config.js";
import "firebase/firestore";
import "firebase/auth";

const eventCollection = "events"
const runnerCollection = "eventRunners"
const stageResultCollection = "stageResults"
const resultCollection = "results"
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

export const addEvent = (id, event) => {
  return db.collection(eventCollection).doc(id).set(event)
}

export const getLiveResultsByEvent = (event) => {
  return db.collection("results").doc(event).get()
}

export const getOldStageResultsForEvent = (eventid) => {
  console.log("Get stage results for ", eventid, " from ", stageResultCollection)
  return db.collection(stageResultCollection).doc(eventid).collection("runners").get()
}

export const getStageResultsForEvent = (eventid, stageid) => {
  console.log("Get stage results for ", eventid, " for ", stageid, " from ", stageResultCollection)
  return db.collection(stageResultCollection).doc(eventid).collection("stages").doc(stageid).get()
}

export const writeStageResultsForEvent = (eventid, stageid, results) => {
  console.log("Writing stage results for ", eventid, " for ", stageid, " to ", stageResultCollection)
  return db.collection(stageResultCollection).doc(eventid).collection("stages").doc(stageid).set(results, {merge: true})
}

export const writeArrayRunnersByEvent = (eventid, runners) => {
  console.log("Writing runners for ", eventid)
  return db.collection(runnerCollection).doc(eventid).set(runners)
}

export const getRunnersByEvent = (eventid) => {
  console.log("Getting runners for ", eventid)
  return db.collection(runnerCollection).doc(eventid).get()
}

