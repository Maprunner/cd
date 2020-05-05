import * as firebase from "firebase/app"
import { firebaseCDConfig } from "./config.js"
import "firebase/firestore"
import "firebase/auth"

firebase.initializeApp(firebaseCDConfig)
const db = firebase.firestore()
const resultsCollection = "testcd"

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously()
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