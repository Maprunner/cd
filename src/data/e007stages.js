const textReg = ".+"
const timeReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const timeMMSSReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const scoreReg = "^[0-9]+(\.[0-9]+){0,1}$"
const mazeTimeReg="^[0-9]*[0-9]\.[0-9]+$"
const routeChoiceReg = "^-?[0-9]+(\.[0-9]+){0,1}$"

const e007stages = [
  { id: 1, name: "Routechoice Game", fields: [{name: "score", type: "input", valid: routeChoiceReg}, {name: "username", type: "input", valid: textReg}], 
    scoring: ["score"], scoreOrder: ["desc"], isAuto: false, isOpen: false },
  { id: 2, name: "Trail Orienteering", fields: [{name: "time", type: "time", valid: timeReg}],
    scoring: ["time"], scoreOrder: ["asc"], isAuto: true, isOpen: false },
  { id: 3, name: "Matching Maps", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeMMSSReg}], 
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false },   
  { id: 4, name: "The Contour Game", fields: [{name: "time", type: "time", valid: timeReg}],
    scoring: ["time"], scoreOrder: ["asc"], isAuto: true, isOpen: false },
  { id: 5, name: "Catching Features 1",
    fields: [{type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B", "Course C"]}, {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },
  { id: 6, name: "Catching Features 2",
    fields: [{type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B", "Course C"]}, {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },
  { id: 7, name: "Streetview", fields: [{name: "time", type: "input", valid: mazeTimeReg}, {name: "username", type: "input", valid: textReg}], 
    scoring: ["time"], scoreOrder: ["asc"], isAuto: false, isOpen: false },
  { id: 8, name: "SkiO Game", fields: [{name: "time", type: "time", valid: timeReg}, {name: "course", type: "select", valid: ["Course A", "Course B", "Course C"]}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: true, isOpen: false },
  { id: 9, name: "Rapid Route", fields: [{name: "score", type: "input", valid: scoreReg}, {name: "time", type: "input", valid: timeMMSSReg}], 
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false }, 
  { id: 10, name: "Catching Features 3",
    fields: [{type: "input", valid: textReg}, {name: "course", type: "select", valid: ["Course A", "Course B", "Course C"]}, {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: false },

]
export default e007stages