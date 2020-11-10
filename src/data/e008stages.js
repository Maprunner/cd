const textReg = ".+"
const timeReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const timeMMSSReg = "^[0-9]*[0-9]:[0-5][0-9]$"
const scoreReg = "^[0-9]+(\.[0-9]+){0,1}$"
const scoreInteger = "^[1-9]([0-9]*)$"
const mazeTimeReg="^[0-9]*[0-9]\.[0-9]+$"
const routeChoiceReg = "^-?[0-9]+(\.[0-9]+){0,1}$"

const e008stages = [
  { id: 1, name: "Routechoice Game", fields: [{name: "score", type: "input", valid: routeChoiceReg},
    {name: "username", type: "input", valid: textReg}], 
    scoring: ["score"], scoreOrder: ["desc"], isAuto: false, isOpen: true },
  { id: 2, name: "Photo Memory O", fields: [{name: "score", type: "input", valid: scoreInteger},
    {name: "time", type: "input", valid: timeMMSSReg}], 
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false }, 
  { id: 3, name: "The Maze!", fields: [{name: "course", type: "select", valid: ["Course A", "Course B", "Course C"]},
   {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: true, isOpen: false },
  { id: 4, name: "Up or Down?", fields: [{name: "score", type: "input", valid: routeChoiceReg}], 
    scoring: ["score"], scoreOrder: ["desc"], isAuto: true, isOpen: false },
  { id: 5, name: "CF Sprint",
    fields: [{name: "username", type: "input", valid: textReg}, {name: "course", type: "select",
    valid: ["Course A", "Course B"]}, {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: true },
  { id: 6, name: "Minecraft",
    fields: [{name: "username", type: "input", valid: textReg}, {name: "time", type: "time",
    valid: timeReg}],
    scoring: ["time"], scoreOrder: ["asc"], isAuto: false, isOpen: true },
  { id: 7, name: "SkiO Game", fields: [{name: "time", type: "time", valid: timeReg},
    {name: "course", type: "select", valid: ["Course A", "Course B"]}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: true, isOpen: false },
  { id: 8, name: "Matching Maps", fields: [{name: "score", type: "input", valid: scoreReg},
    {name: "time", type: "input", valid: timeMMSSReg}], 
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false }, 
  { id: 9, name: "Rapid Route", fields: [{name: "score", type: "input", valid: scoreReg},
    {name: "time", type: "input", valid: timeMMSSReg}], 
    scoring: ["score", "time"], scoreOrder: ["desc", "asc"], isAuto: true, isOpen: false }, 
  { id: 10, name: "CF Forest",
    fields: [{name: "username", type: "input", valid: textReg},
    {name: "course", type: "select", valid: ["Course A", "Course B", "Course C"]},
    {name: "time", type: "time", valid: timeReg}],
    scoring: ["course", "time"], scoreOrder: ["asc", "asc"], isAuto: false, isOpen: true },

]
export default e008stages