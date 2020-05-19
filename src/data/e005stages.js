const textReg = ".+"
const timeReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const scoreReg = "^[0-9]+(\.[0-9]+){0,1}$"
const numReg = "^[1-9]*"
const mazeTimeReg="^[0-9]*[0-9]\.[0-9]+$"

const e005stages = [
  { id: 1, name: "Streetview", fields: [{name: "time", type: "input", valid: mazeTimeReg}], 
    scoring: ["time"], scoreOrder: ["asc"], isAuto: false, isOpen: false },
  { id: 2, name: "Control Descriptions",
   fields: [{name: "score", type: "input", valid: scoreReg}, {name: "wrong", type: "input", valid: numReg}, {name: "time", type: "input", valid: timeReg}],
    scoring: ["score", "wrong", "time"], scoreOrder: ["desc", "asc", "asc"], isAuto: true, isOpen: false },
  { id: 3, name: "Spot the Difference", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}],
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false },
  { id: 4, name: "Route Choice", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}], 
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false },  
  { id: 5, name: "The Maze", fields: [{name: "course", type: "select", valid: ["A", "B", "C"]}, {name: "time", type: "input", valid: mazeTimeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },
  { id: 6, name: "Photo Memory O", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}],
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false },
  { id: 7, name: "Trail Orienteering", fields: [{name: "time", type: "input", valid: timeReg}],
    scoring: ["time"], scoreOrder: ["asc"], isAuto: true, isOpen: false },
]
export default e005stages