const textReg = ".+"
const timeReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const timeMMSSReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const scoreReg = "^[0-9]+(\.[0-9]+){0,1}$"
const mazeTimeReg="^[0-9]*[0-9]\.[0-9]+$"

const e006stages = [
  { id: 1, name: "Matching Maps", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeReg}], 
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: false, isOpen: false },
  { id: 2, name: "Trail Orienteering", fields: [{name: "time", type: "time", valid: timeReg}],
    scoring: ["time"], scoreOrder: ["asc"], isAuto: true, isOpen: false },
  { id: 3, name: "Video Adventure", fields: [{name: "time", type: "time", valid: timeReg}],
    scoring: ["time"], scoreOrder: ["asc"], isAuto: true, isOpen: false },    
  { id: 4, name: "Streetview", fields: [{name: "time", type: "input", valid: mazeTimeReg}], 
    scoring: ["time"], scoreOrder: ["asc"], isAuto: false, isOpen: false },
  { id: 5, name: "Catching Features 1",
    fields: [{type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B", "Course C"]}, {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },
  { id: 6, name: "Catching Features 2",
    fields: [{type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B", "Course C"]}, {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },
  { id: 7, name: "Laby", fields: [{name: "course", type: "select", valid: ["A", "B", "C"]}, {name: "time", type: "input", valid: mazeTimeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },
  { id: 8, name: "Rapid Route", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeMMSSReg}], 
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false }, 
  { id: 9, name: "The Contour Game", fields: [{name: "time", type: "time", valid: timeReg}],
    scoring: ["time"], scoreOrder: ["asc"], isAuto: true, isOpen: false },
  { id: 10, name: "Catching Features 3",
    fields: [{type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B", "Course C"]}, {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },

]
export default e006stages