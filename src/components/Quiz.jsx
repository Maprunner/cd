import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as FirestoreService from '../services/firestore';
import CSVReader from 'react-csv-reader'
// import _ from 'underscore';
import Header from './Header.jsx'
//import entries from './entries.js'
import e001stageRes from './e001StageResults'
import e001stages from './e001stages.js'
import e002stages from './e002stages.js'
import res from './res.js'
// import Alert from 'react-bootstrap/Alert';
// import runners from './runners';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      results: {},
      stages: [],
      stageResults: []
    }
 }

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

  getResultsForEvent = (event) => {
    const id = event.target.value
    FirestoreService.getResultsByEvent(id).then((rawResults) =>{
      const r = rawResults.data()
      const results = JSON.parse(r.data)
      console.log("Got results")
      this.setState({
        results: results
        })
    })
    .catch((error) => {
      console.error("Error getting results: ", error);
    })
  }

  render = () => {

    return (
      <div>
        <Header
          onShowResultsTable={this.onShowResultsTable}
        />
        <Container width="100%">
          <Row className="m-5">
            <Col>
          <Button
            value = "e002"
            onClick={this.getResultsForEvent}
            variant="primary"
          >
            Load results for e002
          </Button>
          </Col>
          <Col>
          <Button
            value="e002"
            onClick={this.getStageResults}
            variant="warning"
          >
            Get stage results for e002
          </Button>
          </Col>
          </Row>
          <Row className="m-5">
          <Col>
          <Button
            value="e002"
            onClick={this.rewriteEvent}
            variant="warning"
          >
            Rewrite event 002
          </Button>
          </Col>
          <Col>
          <Button
            value="e002"
            onClick={this.calculateOverallResults}
            variant="primary"
          >
            Calculate overall results for e002
          </Button>
          </Col>
          <Col>
          <Button
            value="e003"
            onClick={this.updateCategories}
            variant="primary"
          >
            Add categories
          </Button>
          </Col>
          </Row>
          <Row>
          <Col>
          <CSVReader onFileLoaded={(data, fileInfo) => this.createStageResults(data, fileInfo)} />
          </Col>
          <Col>
          <Button
            onClick={this.createEvent002}
            variant="primary"
            disabled={true}
          >
            Create event e002
          </Button>
          </Col>
          <Col>
          Create dummy results for e002
          <CSVReader onFileLoaded={(data, fileInfo) => this.createDummyResults(data, fileInfo)} />
          </Col>
          </Row>
        </Container>
        {/* <Footer /> */}
      </div>
    );
  }

  getSavedStageResults = () => {
    console.log("Loading stageResults from file")
    this.setState({
      stageResults: e001stageRes
    })    
  }

  getStageResults = (btnEvent) => {
    const eventid = btnEvent.target.value
    FirestoreService.getStageResultsForEvent(eventid).then((snapshot) => {
      let results = []
       snapshot.forEach((doc) => {
        let result = doc.data()
        result.id = parseInt(doc.id, 10) 
        results.push(result)
       })
       console.log("Got stage results: " + results.length)
       this.setState({
        stageResults: results
      })
    })         
  }

  rewriteEvent = () => {
    let newResults = []
    for (let i = 0; i < this.state.results.length; i = i + 1) {
      let res = this.state.results[i]
      if (res.country === "CYM") {
        res.country = "WAL"
      }
      newResults.push(res)
    }
      console.log(newResults)
    this.setState({results: newResults})
    FirestoreService.saveResultsForEvent("e002", newResults)
  }

  createStageResults = (data, fileinfo) => {
    // csv result parser assuming csv file is id followed by fields in order defined in "fields" stage details
    const stageid = "s008"
    const eventid = "e002"
    const stageInfo = this.state.events[0].stages[7]
    const fieldCount = stageInfo.fields.length + 1
    for (let i = 0; i < data.length; i = i + 1) {
      const row = data[i]
      if (fieldCount > row.length) {
        console.log("Not enough fields")
        break
      }
      let result = {}
      const runnerid = row[0]
      if (runnerid === "") {
        continue
      }
      let idx = 1
      stageInfo.fields.forEach((field) => {
        result[field] = row[idx]
        idx = idx + 1
      })
      console.log(runnerid, result)
      let newResult = {}
      newResult[stageid] = result
      console.log(newResult)
      //FirestoreService.saveResultForEvent(eventid, runnerid, newResult)    
    }
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
  
  calculateOverallResults = (btnEvent) =>  {
    const eventid = "e002"
    const eventidx = 1
    console.log("Generating results for event " + eventid)
    let newResults = JSON.parse(JSON.stringify(this.state.results))
    const stages = this.state.events[eventidx].stages
    const categories = this.state.events[eventidx].categories
    const winnerPoints = this.state.events[eventidx].winnerPoints
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
      this.state.stageResults.forEach((result) => {
        if (result[stageId]) {
          let res = {}
          res.id = result.id.toString()
          // extract required fields for each scoring method e.g. ["score", "time"]
          scoring.forEach((method) => {
            if (method in result[stageId]) {
              // force certain fields to numbers for sorting purposes
              // decimal-separated mm.ss works Ok as a string so leave these as they are
              switch (method) {
                case "score":
                case "wrong":
                  res[method] = parseFloat(result[stageId][method])
                  break;
                case "time":
                // force separator to be a decimal point since this is needed to make sorting work as expected
                // remove leading zero where time forced to be hh.mm
                // e.g 06:23 becomes 6.23
                  res[method] = result[stageId][method].replace(":", ".").replace(/^0([^0]*)\1/, "")
                  break;
                default:
                  res[method] = result[stageId][method]
              }
            }
          })
          extract.push(res)
        }
      })

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
          if ("time" in res) {
            res.time = ""
          }
          if ("score" in res) {
            res.score = ""
          }
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
          let b = x.sort((a, b) => a - b)
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
    // newResults.sort((a, b) => {
    //   return a.id - b.id
    // })
    console.log("Results created: " + newResults.length)
    this.setState({results: newResults})
    FirestoreService.saveResultsForEvent(eventid, newResults)
  }

  createDummyResults = (data, fileinfo) => {
    let newResults = []
    for (let row = 0; row < data.length; row = row + 1) {
      let r = data[row]
      if (r.length < 6) {
        continue
      }
      let result = {}
      result.id = r[0]
      result.name = r[1]
      result.ageclass = r[2] 
      result.club = r[3]
      result.country = r[4]
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
  
    //FirestoreService.saveResultsForEvent("e002", newResults)
  }

// runners.forEach((runner) => {
//   const id = runner.id.toString()
//   delete runner.id
//   FirestoreService.addRunner(id, runner)
// })  

saveStageDetails = () => {
  const stages = []
  e002stages.forEach((stage) => {
    stages.push(stage)
  })
  console.log(stages)
  //FirestoreService.updateStagesForEvent("e002", stages)
  //FirestoreService.updateStagesForEvent("e003", stages)
  }

updateCategories = () => {
  let cats = []
  const cat0 = {
    countingStages: 10,
    name: "10-stage",
    stages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
  cats.push(cat0)
  const cat1 = {
    countingStages: 7,
    name: "7-stage",
    stages: [0, 2, 3, 4, 6, 7, 8, 10]
  }
  cats.push(cat1)
  console.log(cats)
  FirestoreService.updateCategoriesForEvent("e002", cats)
}

createEvent002 = () => {
  const eventid = "e002"
  let event = {
    description: "A weekend of virtual sprint orienteering",
    name: "Sprint weekend",
    dateFrom: 1587682800000,
    dateTo: 1587855600000,
    winnerPoints: 1
  }
  let stages = []
  e002stages.forEach((stage) => {
    stages.push(stage)
  })
  event.stages = stages
  let cats = []
  const cat0 = {
    countingStages: 10,
    name: "10-stage",
    stages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
  cats.push(cat0)
  const cat1 = {
    countingStages: 7,
    name: "7-stage",
    stages: [0, 2, 3, 4, 6, 7, 8, 10]
  }
  cats.push(cat1)
  event.categories = cats

  console.log(event)

  //FirestoreService.addEvent(eventid, event)
}

createEvent001 = () => {
  const eventid = "e001"
  let event = {
    description: "The first Lockdown Orienteering event",
    name: "Easter Championships",
    dateFrom: 1586473200000,
    dateTo: 1586732400000,
    winnerPoints: 1
  }
  let stages = []
  e001stages.forEach((stage) => {
    stages.push(stage)
  })
  event.stages = stages
  let cats = []
  const cat0 = {
    countingStages: 12,
    name: "12-stage",
    stages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  }
  cats.push(cat0)
  const cat1 = {
    countingStages: 8,
    name: "8-stage",
    stages: [0, 1, 3, 4, 5, 7, 8, 10]
  }
  cats.push(cat1)
  event.categories = cats

  console.log(event)

  FirestoreService.addEvent(eventid, event)
}

}

export default Quiz
