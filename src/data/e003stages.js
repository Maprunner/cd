const textReg = ".+"
const timeReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const scoreReg = "^[0-9]+(\.[0-9]+){0,1}$"

const e003stages = [
  { id: 1, name: "Forest Route Choice", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}], 
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false },
  { id: 2, name: "Catching Features Round 1",
    fields: [{name: "username", type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B"]}, {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },
  { id: 3, name: "Spot the Difference", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}],
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false },
  { id: 4, name: "Control Descriptions", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}],
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false },
  { id: 5, name: "Video Adventure", fields: [{name: "score", type: "input", valid: scoreReg}],
    scoring: ["score"], scoreOrder: ["asc"], isAuto: false, isOpen: false },
  { id: 6, name: "Catching Features Round 2",
    fields: [{name: "username", type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B"]}, {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },
  { id: 7, name: "The Maze", fields: [{name: "course", type: "select", valid: ["A", "B"]}, {name: "time", type: "input", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },
  { id: 8, name: "Up or Down?", fields: [{name: "time", type: "input", valid: timeReg}],
    scoring: ["time"], scoreOrder: ["asc"], isAuto: false, isOpen: false },
  { id: 9, name: "Photo Memory O", fields: [{name: "username", type: "input", valid: textReg}, {name: "score", type: "input", valid: scoreReg}],
    scoring: ["score"], scoreOrder: ["desc"], isAuto: false, isOpen: false },
  { id: 10, name: "Catching Features Round 3",
    fields: [{name: "username", type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B"]}, {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },
]
export default e003stages