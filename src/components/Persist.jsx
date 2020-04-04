const CD_QUIZ_RESULTS_ITEM = 'cdquiz-results';
const CD_QUIZ_SETTINGS = 'cdquiz-settings';

const defaultSettings = {
  name: "Player 1",
  language: "en",
  answersPerQuestion: 3,
  timerOption: 0,
  "Land forms": true,
  "Rock": true,
  "Water": true,
  "Vegetation": true,
  "Man-made": true
};

function loadItem(item) {
  let data = {};
  try {
    if ((window.hasOwnProperty('localStorage')) && (window.localStorage !== null)) {
      if (localStorage.getItem(item) !== null) {
        data = JSON.parse(localStorage.getItem(item));
      }
    }
    return data;
  } catch (e) {
    return data;
  }
}

function saveItem(item, value) {
  try {
    if ((window.hasOwnProperty('localStorage')) && (window.localStorage !== null)) {
      localStorage.setItem(item, JSON.stringify(value));
    }
  } catch (e) {
    return null;
  }
}

export function loadAllTimeResults() {
  const results = loadItem(CD_QUIZ_RESULTS_ITEM);
  return (results === {} ? []: results);
}

export function loadSettings() {
  let settings = loadItem(CD_QUIZ_SETTINGS);
  let setting;
  for (setting in defaultSettings) {
    if (!settings.hasOwnProperty(setting)) {
      settings[setting] = defaultSettings[setting];
    }
  }
  return settings;
}

export function saveSettings(key, value) {
  // easiest way is just to load existing values and overwrite new setting
  let settings = loadSettings();
  settings[key] = value;
  saveItem(CD_QUIZ_SETTINGS, settings);
}

export function saveAllTimeResults(results) {
  saveItem(CD_QUIZ_RESULTS_ITEM, results);
}
