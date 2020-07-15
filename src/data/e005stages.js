const textReg = ".+"
const timeMMSSReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const scoreReg = "^[0-9]+(\.[0-9]+){0,1}$"
const numReg = "^[1-9]*"
const mazeTimeReg="^[0-9]*[0-9]\.[0-9]+$"

const e005stages = [
  { id: 1, name: "Route Choice", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "user", type: "input", valid: textReg}], 
    scoring: ["score"], scoreOrder: ["desc"], isAuto: false, isOpen: false },  
  { id: 2, name: "Rapid Route", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeMMSSReg}], 
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false }, 
  { id: 3, name: "Jigsaw", fields: [{name: "time", type: "input", valid: timeMMSSReg}],
    scoring: ["time"], scoreOrder: ["asc"], isAuto: false, isOpen: false },
  { id: 4, name: "Photo Memory O", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeMMSSReg}],
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false },
  { id: 5, name: "Up or Down?", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeMMSSReg}],
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false },
  { id: 6, name: "The Short Gaffle", fields: [{name: "time", type: "input", valid: timeMMSSReg}],
    scoring: ["time"], scoreOrder: ["asc"], isAuto: true, isOpen: false },
  { id: 7, name: "Streetview", fields: [{name: "time", type: "input", valid: mazeTimeReg}], 
    scoring: ["time"], scoreOrder: ["asc"], isAuto: false, isOpen: false },
  { id: 8, name: "Catching Features",
    fields: [{name: "username", type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B", "Course C"]}, {name: "time", type: "time", valid: timeMMSSReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false }
]
export default e005stages