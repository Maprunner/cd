const textReg = ".+"
const timeReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const timeMMSSReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const scoreReg = "^[0-9]+(.[0-9]+){0,1}$"
const scoreInteger = "^[1-9]([0-9]*)$"
const mazeTimeReg = "^[0-9]*[0-9].[0-9]+$"
const routeChoiceReg = "^-?[0-9]+(.[0-9]+){0,1}$"

const e010stages = [
  {
    id: 1,
    name: "Routechoice Game",
    fields: [
      { name: "score", type: "input", valid: routeChoiceReg },
      { name: "username", type: "input", valid: textReg },
    ],
    scoring: ["score"],
    scoreOrder: ["desc"],
    isAuto: false,
    isOpen: false,
  },
  {
    id: 2,
    name: "Matching Maps",
    fields: [
      { name: "score", type: "input", valid: scoreReg },
      { name: "time", type: "input", valid: timeMMSSReg },
    ],
    scoring: ["score", "time"],
    scoreOrder: ["desc", "asc"],
    isAuto: true,
    isOpen: false,
  },
  {
    id: 3,
    name: "The Maze!",
    fields: [
      {
        name: "course",
        type: "select",
        valid: ["Course A", "Course B", "Course C"],
      },
      { name: "time", type: "time", valid: timeReg },
    ],
    scoring: ["course", "time"],
    scoreOrder: ["asc", "asc"],
    isAuto: true,
    isOpen: false,
  },
  {
    id: 4,
    name: "Trail Orienteering",
    fields: [{ name: "time", type: "time", valid: timeReg }],
    scoring: ["time"],
    scoreOrder: ["asc"],
    isAuto: true,
    isOpen: false,
  },
  {
    id: 5,
    name: "Photo Memory O",
    fields: [
      { name: "score", type: "input", valid: scoreInteger },
      { name: "time", type: "input", valid: timeMMSSReg },
    ],
    scoring: ["score", "time"],
    scoreOrder: ["desc", "asc"],
    isAuto: true,
    isOpen: false,
  },
  {
    id: 6,
    name: "Rapid Route",
    fields: [
      { name: "score", type: "input", valid: scoreReg },
      { name: "time", type: "input", valid: timeMMSSReg },
    ],
    scoring: ["score", "time"],
    scoreOrder: ["desc", "asc"],
    isAuto: true,
    isOpen: false,
  },
  {
    id: 7,
    name: "SkiO Game",
    fields: [
      { name: "time", type: "time", valid: timeReg },
      { name: "course", type: "select", valid: ["Course A", "Course B"] },
    ],
    scoring: ["course", "time"],
    scoreOrder: ["asc", "asc"],
    isAuto: true,
    isOpen: false,
  },
  {
    id: 8,
    name: "CF World Island",
    fields: [
      { name: "username", type: "input", valid: textReg },
      {
        name: "course",
        type: "select",
        valid: ["Course A", "Course B", "Course C"],
      },
      { name: "time", type: "time", valid: timeReg },
    ],
    scoring: ["course", "time"],
    scoreOrder: ["asc", "asc"],
    isAuto: false,
    isOpen: true,
  },
  {
    id: 9,
    name: "CF JK 1971 Relay",
    fields: [
      { name: "username", type: "input", valid: textReg },
      {
        name: "course",
        type: "select",
        valid: ["Course A", "Course B", "Course C"],
      },
      { name: "time", type: "time", valid: timeReg },
    ],
    scoring: ["course", "time"],
    scoreOrder: ["asc", "asc"],
    isAuto: false,
    isOpen: true,
  },
  {
    id: 10,
    name: "CF South Africa Sprint",
    fields: [
      { name: "username", type: "input", valid: textReg },
      {
        name: "course",
        type: "select",
        valid: ["Course A", "Course B", "Course C"],
      },
      { name: "time", type: "time", valid: timeReg },
    ],
    scoring: ["course", "time"],
    scoreOrder: ["asc", "asc"],
    isAuto: false,
    isOpen: true,
  },
]
export default e010stages
