const textReg = ".+"
const timeReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const scoreReg = "^[0-9]+(\.[0-9]+){0,1}$"
const numReg = "^[1-9]*"
const mazeTimeReg="^[0-9]*[0-9]\.[0-9]+$"

const e004stages = [
  { id: 1, name: "Streetview London", fields: [{name: "time", type: "input", valid: mazeTimeReg}], 
    scoring: ["time"], scoreOrder: ["asc"], isAuto: false, isOpen: false },
    { id: 2, name: "The Maze", fields: [{name: "course", type: "select", valid: ["A", "B", "C"]}, {name: "time", type: "input", valid: mazeTimeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },
    { id: 3, name: "Trail Orienteering", fields: [{name: "time", type: "input", valid: timeReg}],
    scoring: ["time"], scoreOrder: ["asc"], isAuto: true, isOpen: false },
    { id: 4, name: "Spot the Difference", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}],
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false },
    { id: 5, name: "Catching Features",
    fields: [{name: "username", type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B", "Course C"]}, {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false }
]
export default e004stages