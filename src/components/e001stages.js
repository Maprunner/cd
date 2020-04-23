const textReg = ".+"
const timeReg = "^[0-9]+[0-9]:[0-5][0-9]$"
const scoreReg = "^[0-9]+(.[0-9]+)$"

const e001stages = [
{id: 1, name: "Route Choice Game", 
  fields: [{name: "score", type: "input", valid: scoreReg}, {name: "username", type: "input", valid: textReg}],
  scoring: ["score"], scoreOrder: ["desc"], isAuto: false, isOpen: false},
{id: 2, name: "Running Wild Sprint",
  fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}],
  scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: false, isOpen: false},
{id: 3, name: "Catching Features Sprint",
  fields: [{name: "username", type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B"]}, {name: "time", type: "time", valid: timeReg}],
  scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false},
{id: 4, name: "Control Descriptions",
  fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}, {name: "wrong", type: "input", valid: scoreReg}],
  scoring: ["score", "wrong", "time"], scoreOrder: ["desc", "asc", "asc"], isAuto: false, isOpen: false},
{id: 5, name: "Photo Memory-O",
  fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}],
  scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: false, isOpen: false},
{id: 6, name: "Quiz",
  fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}],
  scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: false, isOpen: false},
{id: 7, name: "Catching Features Middle", 
  fields: [{name: "username", type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B"]}, {name: "time", type: "time", valid: timeReg}],
  scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false},
{id: 8, name: "Spot the Difference", 
  fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}],
  scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: false, isOpen: false},
{id: 9, name: "Streetview Orienteering", 
  fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}],
  scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: false, isOpen: false},
{id: 10, name: "Catching Features Long",
  fields: [{name: "username", type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B"]}, {name: "time", type: "time", valid: timeReg}],
  scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false},
{id: 11, name: "Trail Orienteering",
  fields: [{name: "username", type: "input", valid: textReg}, {name: "score", type: "input", valid: scoreReg}],
  scoring: ["score"], scoreOrder: ["asc"], isAuto: false, isOpen: false},
{id: 12, name: "Catching Features Middle", 
  fields: [{name: "username", type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B"]}, {name: "time", type: "time", valid: timeReg}],
  scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false}
]
export default e001stages