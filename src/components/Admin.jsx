import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as FirestoreService from '../services/firestore';
import CSVReader from 'react-csv-reader'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import e004stages from '../data/e004stages.js'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import EventSelect from "./EventSelect"

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventid: "e004",
      events: [],
      runners: [],
      results: {},
      stages: [],
      stageResults: []
    }
 }

 render = () => {
  return (
    <div>
      <Header
        onShowResultsTable={this.onShowResultsTable}
      />
      <Container width="100%">
      <EventSelect 
        currentEventid={this.state.eventid}
        onChange={this.handleEventidChange}
      />
        <Row className="m-5">
          <Col>
          <CSVReader onFileLoaded={(data, fileInfo) => this.createStageResults(data, fileInfo, this.state.eventid, "s001")} label="Stage 1 Streetview"/>
          </Col>
          <Col>
         </Col>
          <Col>
        Create dummy results for {this.state.eventid}
        <CSVReader onFileLoaded={(data, fileInfo) => this.createDummyResults(this.state.eventid, data, fileInfo)} />
        </Col>
        </Row>
        <Row className="m-5">
        <Col>
        <CSVReader onFileLoaded={(data, fileInfo) => this.createEventRunners(this.state.eventid, data, fileInfo)} label="Write eventRunners"/>
        </Col>
        <Col>
        <Button
          onClick={() => this.getRunnersForEvent(this.state.eventid)}
          variant="warning"
        >
          Get runners for {this.state.eventid}
        </Button>
        </Col>
        <Col></Col>
        </Row>
        <Row className="m-5">
          <Col>
        <Button
          onClick={() => this.createEvent(this.state.eventid)}
          variant="primary"
          disabled={true}
        >
          Create event {this.state.eventid}
        </Button>
        </Col>
        <Col>
        <Button
          onClick={() => this.getResultsForEvent(this.state.eventid)}
          variant="primary"
        >
          Get results for {this.state.eventid}
        </Button>
        </Col>
        <Col>
        <Button
          onClick={() => this.rewriteResults(this.state.eventid)}
          variant="primary"
        >
          Rewrite results for {this.state.eventid}
        </Button>
        </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

handleEventidChange = (event) => {
  this.setState({
    eventid: event.target.value
  })
}

// {/* <Col>
// <Button
//   onClick={() => this.calculateOverallResults(this.state.eventid)}
//   variant="primary"
// >
//   Calculate results for {this.state.eventid}
// </Button>
// </Col> */}


  componentDidMount() {
    FirestoreService.authenticateAnonymously().then(() => {
      console.log("Logged in")
      let events = []
      let stages = []
      FirestoreService.getEvents().then((data) => {
        data.forEach((doc) => {
          let event = doc.data()
          delete event.resultsId
          events.push(event)
          stages.push(event.stages)
        })
        console.log("Events: " + events.length)
        this.setState({
          stages: stages,
          events: events
        })
      })
      .catch((error) => {
        console.error("Error getting events: ", error);
      })
    })
    .catch((error) => {
      console.error("Error logging in: ", error);
    })
  }

  setEvent = (id) => {
    console.log(id)
  }

  createEventRunners = (eventid, data, fileinfo) => {
    let runners = {}
    for (let row = 0; row < data.length; row = row + 1) {
      let r = data[row]
      if (r.length < 5) {
        continue
      }
      let runner = {}
      runner.name = r[1]
      runner.club = r[4]
      runner.country = r[2]
      runner.class = r[3] 
      runners[r[0]] = runner
    }
    console.log(runners)
    FirestoreService.writeRunnersByEvent(eventid, runners)
  }

  getRunnersForEvent = (eventid) => {
    FirestoreService.getRunnersByEvent(eventid).then((data) =>{
      const raw = data.data()
      let runners = []
      for (const runnerid in raw) {
        let runner = raw[runnerid]
        runner.id = runnerid
        runners.push(runner)
       }
      console.table(runners)
      this.setState({
        runners: runners
        })
    })
    .catch((error) => {
      console.error("Error getting runners: ", error);
    })
  }

  getResultsForEvent = (eventid) => {
    FirestoreService.getLiveResultsByEvent(eventid).then((rawResults) =>{
      const r = rawResults.data()
      const results = JSON.parse(r.data)
      console.log("Got results")

      // results.map((r) => {
      //   delete r.club
      //   delete r.ageclass
      //   delete r.name
      //   delete r.country
      //   delete r.class
      //   return r
      // })
      this.setState({
        results: results
        })
    })
    .catch((error) => {
      console.error("Error getting results: ", error);
    })
  }

  getStageResults = (eventid) => {
    const stageid = "s004"
    FirestoreService.getStageResultsForEvent(eventid, stageid).then((data) => {
      const rawResults = data.data()
      let results = []
      for (const runner in rawResults) {
        let result = rawResults[runner]
        result.id = runner
        results.push(result)
       }
       results.sort((a, b) => {return a.id - b.id})
       console.log("Got ", results.length, " results for stage ", stageid)
       console.table(results)
    })         
  }

  // reformatStageResults = () => {
  //   //change from by runner to by staege
  //   FirestoreService.getStageResultsForEvent002().then((snapshot) => {
  //     let results = []
  //      snapshot.forEach((doc) => {
  //       let result = doc.data()
  //       result.id = parseInt(doc.id, 10) 
  //       results.push(result)
  //     })
  //     console.log("Got stage results: " + results.length)
  //     // change from by runner to by stage
  //     const stages = []
  //     for (let i = 0; i < 10; i = i + 1) {
  //       stages[i] = {}
  //     }
  //     results.forEach((res)  => {
  //       const keys = Object.keys(res)
  //         for (const key of keys) {
  //           if (key !== "id") {
  //             const stage = parseInt(key.slice(1), 10) - 1
  //             if ((stage < 0) || (stage > 9)) {
  //               console.log("Error for ", res)
  //             } else {
  //               stages[stage][res.id.toString()] = res[key]
  //             }
  //         }
  //         } 
  //     })
  //     console.log(stages)
  //     for (let i = 0; i < 10; i = i + 1) {
  //       let stage = "s0"
  //       if (i === 9) {
  //         stage = stage + "10"
  //       } else {
  //         stage = stage + "0" + i
  //       }
  //       FirestoreService.writeStageResultsForEvent003(stage, stages[i])
  //     }

  //   })     
  // }

  formatSecsAsMMSS = (secs) => {
    const minutes = Math.floor(secs / 60);
    let formattedtime = minutes;
    const seconds = secs - (minutes * 60);
    if (seconds < 10) {
      formattedtime += ":0" + seconds;
    } else {
      formattedtime += ":" + seconds;
    }
    return formattedtime;
  }

  createStageResults = (data, fileInfo, eventid, stageid) => {
    // csv result parser assuming csv file
    const stageno = parseInt(stageid.substring(stageid.length - 1), 10)
     // VERY BAD WAY OF INDEXING FOR REQUIRED EVENT DATA
    const stageInfo = this.state.events[3].stages[stageno - 1]
    console.log("Processing results for stage " + stageno)
    console.log(stageInfo)
    // read header row to find all required scoring columns
    const headers = data[0].map(field => field.trim())
    const idxId = headers.indexOf("id")
    if (idxId === -1) {
      console.log("Cannot find id field")
      return
    }
    const scoringMethods = stageInfo.scoring.length
    const scoringIndex = Array.from({length: scoringMethods}, () => 0)
    for (let i = 0; i < scoringMethods; i = i + 1) {
      scoringIndex[i] = headers.indexOf(stageInfo.scoring[i])
      if (scoringIndex[i] === -1) {
        console.log("Cannot find " + stageInfo.scoring[i] + " field")
        return
      }
    }

    let seenRunners = []
    let duplicatedRunners = []
    let stageResult = {}
    for (let i = 1; i < data.length; i = i + 1) {
      const row = data[i].map(field => field.trim())
      let result = {}
      const runnerid = row[idxId]
      if (runnerid === "") {
        continue
      }
      if (seenRunners.indexOf(runnerid) === -1) {
        seenRunners.push(runnerid)
      } else {
        duplicatedRunners.push(runnerid)
      }
      let idx = 1
      for (let j = 0; j < scoringMethods; j = j + 1) {
        result[stageInfo.scoring[j]] = row[scoringIndex[j]]
        idx = idx + 1
        if (stageInfo.scoring[j] === "time") {
          let time = result[stageInfo.scoring[j]]
          switch (stageid) {
            case "s001":
              result[stageInfo.scoring[j]] = time
              break
            case "s00x":
              result[stageInfo.scoring[j]] = time.slice(3)
              break
            case "s00y":
              let bits = []
              bits = time.split(":")
              if (bits.length !== 2) {
                console.log("Invalid time format for runner " + runnerid + " with time " + time)
                return
              }
              let bigsecs = parseInt(bits[0]) * 60
              let secs = parseFloat(bits[1])
              result[stageInfo.scoring[j]] = (secs + bigsecs).toFixed(2)
              console.log(runnerid, result[stageInfo.scoring[j]])
              break
              case "s00z":
            result[stageInfo.scoring[j]] = this.formatSecsAsMMSS(time)
              break
            default:
              break
          }
        }
      }
      console.log(runnerid, result)
      stageResult[runnerid] = result
      // console.log(runnerid, newResult) 
    }
    console.log("duplicated runners " , duplicatedRunners)
    console.log("Saving ", stageResult)
    FirestoreService.writeStageResultsForEvent(eventid, stageid, stageResult) 
  }

getStageId = (id) => {
  // convert number to sxxx
  // padStart not supported by IE...
  let n = id.toString()
  while (n.length < 3) {
    n = "0" + n
  }
  return "s" + n 
}

rewriteResults = (eventid) => {
  console.log(this.state.results)
  FirestoreService.saveResultsForEvent(eventid, this.state.results)
}

createDummyResults = (eventid, data, fileinfo) => {
  let newResults = []
  for (let row = 0; row < data.length; row = row + 1) {
    let r = data[row]
    if (r.length < 8) {
      continue
    }
    let result = {}
    result.id = r[1]
    result.name = r[2]
    result.ageclass = "" 
    result.club = r[6]
    result.country = r[7]
    result.class = r[5] 
    result.stageScore= []
    result.stagePos = []
    result.stageResult = []
    result.catPos = []
    result.catResults = []
    result.catScore = []
    for (let i = 0; i < 10; i = i + 1) {
      result.stageScore.push(0)
      result.stagePos.push(0)
      result.stageResult.push({})
      result.catPos.push(0)
      result.catResults.push(0)
      result.catScore.push(0)
    }
    newResults.push(result)
  }
  console.log(newResults)

 FirestoreService.saveResultsForEvent(eventid, newResults)
}

saveStageDetails = () => {
// const stages = []
// e002stages.forEach((stage) => {
//   stages.push(stage)
// })
// console.log(stages)
//FirestoreService.updateStagesForEvent("e002", stages)
//FirestoreService.updateStagesForEvent("e003", stages)
}

createEvent = (eventid) => {
let event = {
  description: "Five virtual orienteering stages for World Orienteering Day",
  name: "World Orienteering Day",
  dateFrom: Date.parse('13 May 2020 00:01:00 GMT'), 
  dateTo: Date.parse('16 May 2020 00:01:00 GMT'),
  winnerPoints: 2000,
  messageTitle: "",
  message: ""
}
let stages = []
e004stages.forEach((stage) => {
  stages.push(stage)
})
event.stages = stages
let cats = []
const cat0 = {
  countingStages: 4,
  name: "5-stage",
  stages: [0, 1, 2, 3, 4]
}
cats.push(cat0)

event.categories = cats

console.log(event)

FirestoreService.addEvent(eventid, event)
}

calculateOverallResults = (eventid) =>  {
  // const eventidx = 2
  // const event = this.state.events[eventidx]
  // FirestoreService.getResultsByEvent(eventid).then((results) => {
  //   console.log("Got results")
  //   const stageResults = []
  //   for (let i = 0; i < event.stages.length; i = i + 1) {
  //     FirestoreService.getStageResultsForEvent(eventid, this.getStageId( i + 1)).then((stageResult) => {
  //       stageResults[i] = stageResult
  //     })
  //   }
  // }).then((results, stageResults) => {
  //   // this.doCalcs(eventid, results, stageResults)
  //   console.log(stageResults)
  // })
}

doCalcs = (eventid, event, results, stageResults) => {
  console.log("Generating results for event " + eventid)
  let newResults = JSON.parse(JSON.stringify(results))
  const stages = event.stages
  const categories = event.categories
  const winnerPoints = event.winnerPoints
  //console.table(stages)
  //console.table(categories)
  newResults.forEach((res) => {
    res.catScore = []
    res.catPos = []
    res.catResults = []
  })
  for (let i = 0; i < stages.length; i = i + 1) {
    let extract = []
    const stage = stages[i]
    const stageId = this.getStageId(stage.id)
    // need to determine sort order from stage record
    // scoring is an array of fields used for scoring
    const scoring = stage.scoring ? stage.scoring: []
    //scoreOrder shows how to sort each field
    const scoreOrder = stage.scoreOrder ? stage.scoreOrder: []
    console.log("Stage " + stageId + " scoring [" + scoring + "] by [" + scoreOrder + "]")
    let result = this.state.stageResults[i]
    const keys = Object.keys(result)
    for (const key of keys) {
      if (key !== "id") {
        let res = {}
        res.id = key.toString()
        // extract required fields for each scoring method e.g. ["score", "time"]
        scoring.forEach((method) => {
          if (method in result[key]) {
            // force certain fields to numbers for sorting purposes
            // decimal-separated mm.ss works Ok as a string so leave these as they are
            switch (method) {
              case "score":
              case "wrong":
                res[method] = parseFloat(result[key][method])
                break;
              case "time":
              // force separator to be a decimal point since this is needed to make sorting work as expected
              // remove leading zero where time forced to be hh.mm
              // e.g 06:23 becomes 6.23
                res[method] = result[key][method].replace(":", ".").replace(/^0([^0]*)\1/, "")
                break;
              default:
                res[method] = result[key][method]
            }
          }
        })
        extract.push(res)
      }
    }
    // sort extracted results for this stage
    for (let i = scoring.length - 1; i >= 0; i = i - 1) {
      // depending on what is to be sorted...
      switch (scoring[i]) {
        case "score":
        case "time":
        case "wrong":
          // scoreOrder tells you how to sort each method e.g. ["asc", "desc"]
          // sorting numerically; this works even though time can be a string
          if (scoreOrder[i] === "desc") {
            extract.sort((a, b) => b[scoring[i]] - a[scoring[i]])
          } else {
            extract.sort((a, b) => a[scoring[i]] - b[scoring[i]])
          }          
          break
        case "course":
          // sorting alphabetically
          if (scoreOrder[i] === "desc") {
            extract.sort((a, b) => {
              return a[scoring[i]] > b[scoring[i]] ? -1 : a[scoring[i]] < b[scoring[i]] ? 1 : 0
            })
          } else {
            extract.sort((a, b) => {
              return a[scoring[i]] < b[scoring[i]] ? -1 : a[scoring[i]] > b[scoring[i]] ? 1 : 0
            })
          }          
          break
        default: console.log("Unknown sort method " + scoring[i])
      }
    }

    // add positions
    // need to allow for ties...
    let pos = 0
    let ties = 0
    extract.forEach((res, idx, data) => {
      let tied = true
      for (let i = scoring.length - 1; i >= 0; i = i - 1) {
        if (idx === 0) {
          tied = false
          break
        }
        if (res[scoring[i]] !== data[idx -1][scoring[i]]) {
          tied = false
          break
        }
      }
      if (tied) {
        ties = ties + 1
      } else {
        pos = pos + ties + 1
        ties = 0
      }
      res.pos = pos
      res.stageScore = (winnerPoints === 1) ? res.pos: winnerPoints + 1 - res.pos
    })
    
    console.log(extract)
    // add to overall results
    extract.forEach((res) => {
      const idx = newResults.findIndex((result) => result.id === res.id)
      if (idx !== -1) {
        newResults[idx]["stagePos"][i] = res.pos
        newResults[idx]["stageScore"][i] = res.stageScore
        // delete unneeded fields and then save stage results to runner record
        // delete res.pos
        // delete res.id
        // if ("time" in res) {
        //   res.time = ""
        // }
        // if ("score" in res) {
        //   res.score = ""
        // }
        newResults[idx]["stageResult"][i] = res
      } else {
        console.log("Cannot find id " + res.id)
      }
    })
    console.log("Found " + extract.length + " results for this stage")
  }
  categories.forEach((cat, catIdx) => {
    // update overall results
    newResults.forEach((result) => {
        // create copy of stageScores for this runner
        const a = result.stageScore.slice()
        // filter out scores for this category
        let x = cat.stages.map(stageIdx => a[stageIdx])
        // sort in ascending order
        let b = x.sort((a, b) => {
          if (winnerPoints === 1) {
            // low to high
            return a - b
          } else {
            // high to low
            return b - a
          }
        })
        // remove all 0 entries
        let c = b.filter((score) => score > 0)
        // limit to number of counting scores
        let d = c.slice(0, cat.countingStages)
        // add up scores
        result.catScore[catIdx] = d.reduce((acc, cur) => acc + cur, 0)
        result.catResults[catIdx] = d.length
    })

    if (winnerPoints === 1) {
      // sort is by increasing score of 1 or over, but 0 comes last
      // people with not enough scores go at the end in ascending order
      newResults.sort((a, b) => {
        if ((a.catResults[catIdx] < cat.countingStages) && (b.catResults[catIdx] < cat.countingStages)) {
          return (a.catScore[catIdx] === 0) ? 1: (b.catScore[catIdx] === 0) ? -1: a.catScore[catIdx] - b.catScore[catIdx]
        }
        if (a.catResults[catIdx] < cat.countingStages) {
          return 1
        }
        if (b.catResults[catIdx] < cat.countingStages) {
          return -1
        }
        // sort is by increasing score of 1 or over, but 0 comes last
        return (a.catScore[catIdx] === 0) ? 1: (b.catScore[catIdx] === 0) ? -1: a.catScore[catIdx] - b.catScore[catIdx]
      })
    } else {
      // sort is by decreasing score
      // people with not enough scores go at the end in descending order
      newResults.sort((a, b) => {
        if ((a.catResults[catIdx] < cat.countingStages) && (b.catResults[catIdx] < cat.countingStages)) {
          return b.catScore[catIdx] - a.catScore[catIdx]
        }
        if (a.catResults[catIdx] < cat.countingStages) {
          return 1
        }
        if (b.catResults[catIdx] < cat.countingStages) {
          return -1
        }
        // sort is by decreasing score
        return b.catScore[catIdx] - a.catScore[catIdx]
      })  
    }
    let pos = 0
    let ties = 0
    let oldScore = -1
    newResults.forEach((res) => {
      if (oldScore === res.catScore[catIdx]) {
        ties = ties + 1
      } else {
        pos = pos + ties + 1
        ties = 0
        oldScore = res.catScore[catIdx]
      }
      res.catPos[catIdx] = pos
    })

  })
  newResults.sort((a, b) => {
    return a.id - b.id
  })
  console.log("Results created: " + newResults.length)
  this.setState({results: newResults})
  //FirestoreService.saveResultsForEvent(eventid, newResults)
}

}

export default Admin
