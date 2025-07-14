import _ from "underscore"

const CD_QUIZ_RESULTS_ITEM = "cdquiz-results"
const CD_QUIZ_SETTINGS = "cdquiz-settings"

const defaultSettings = {
  name: "Player 1",
  language: "en",
  questionsToSet: 73,
  answersPerQuestion: 3,
  timerOption: 0,
  "Land forms": true,
  Rock: true,
  Water: true,
  Vegetation: true,
  "Man-made": true,
}

function loadItem(item) {
  let data = {}
  /* eslint-disable no-unused-vars */
  try {
    if (
      Object.prototype.hasOwnProperty.call(window, "localStorage") &&
      window.localStorage !== null
    ) {
      if (localStorage.getItem(item) !== null) {
        data = JSON.parse(localStorage.getItem(item))
      }
    }
    return data
  } catch (e) {
    return data
  }
  /* eslint-enable no-unused-vars */
}

function saveItem(item, value) {
  /* eslint-disable no-unused-vars */
  try {
    if (
      Object.prototype.hasOwnProperty.call(window, "localStorage") &&
      window.localStorage !== null
    ) {
      localStorage.setItem(item, JSON.stringify(value))
    }
  } catch (e) {
    return null
  }
  /* eslint-enable no-unused-vars */
}

export function loadAllTimeResults() {
  const results = loadItem(CD_QUIZ_RESULTS_ITEM)
  return _.isEmpty(results) ? [] : results
}

export function loadSettings() {
  let settings = loadItem(CD_QUIZ_SETTINGS)
  let setting
  for (setting in defaultSettings) {
    if (!Object.prototype.hasOwnProperty.call(settings, setting)) {
      settings[setting] = defaultSettings[setting]
    }
  }
  return settings
}

export function saveSettings(key, value) {
  // easiest way is just to load existing values and overwrite new setting
  let settings = loadSettings()
  settings[key] = value
  saveItem(CD_QUIZ_SETTINGS, settings)
}

export function saveAllTimeResults(results) {
  saveItem(CD_QUIZ_RESULTS_ITEM, results)
}
