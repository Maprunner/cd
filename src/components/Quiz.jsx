import React from 'react';
import * as FirestoreService from '../services/firestore';
// import _ from 'underscore';
import Header from './Header.jsx'
//import entries from './entries.js'
import stageRes from './stageRes.js'
import res from './res.js'
import e1stages011 from './e1stages011.js'
// import Alert from 'react-bootstrap/Alert';
// import runners from './runners';
import Button from 'react-bootstrap/Button';
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
        <Card>
          <Button
            value = "e001"
            onClick={this.getResultsForEvent}
            variant="primary"
          >
            Load results
          </Button>
          <Button
            value="e001"
            onClick={this.getSavedStageResults}
            variant="primary"
          >
            Load saved stage results
          </Button>
          <Button
            value="e001"
            onClick={this.getStageResults}
            variant="warning"
          >
            Get stage results
          </Button>
          <Button
            value="e001"
            onClick={this.calculateOverallResults}
            variant="primary"
          >
            Calculate stage results
          </Button>
          {/* <Button
            onClick={this.createStageResults}
            variant="primary"
          >
            Create stage s003 results
          </Button> */}
          {/* <Button
            onClick={this.createDummyResults}
            variant="primary"
          >
            Create dummy results
          </Button> */}
          </Card>
        {/* <Footer /> */}
      </div>
    );
  }

  getSavedStageResults = () => {
    console.log("Loading stageResults from file")
    this.setState({
      stageResults: stageRes
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
       this.setState({
        stageResults: results
      })
    })         
  }

  createStageResults = () => {
    e1stages011.forEach(stage => {
      let result = {}
      const runnerid = stage[0]
      result.score = stage[1]
      //console.log(runnerid, result)
      FirestoreService.saveResultForEvent("e001", runnerid, {s011: result})    
    })
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
    const eventid = btnEvent.target.value
    console.log("Generating results for event " + eventid)
    let newResults = JSON.parse(JSON.stringify(this.state.results))
    // 0 accesses e001: need to decide how to pick this up...
    const stages = this.state.stages[0]
    let emptyResults = []
    stages.forEach(() => {
      emptyResults.push({})
    })
    newResults.forEach((res) => {
      if (!res.stageResult) {
        res.stageResult = emptyResults
      }
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
              res[method] = result[stageId][method]
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
          case "course":
            // scoreOrder tells you how to sort each method e.g. ["asc", "desc"]
            if (scoreOrder[i] === "desc") {
              extract.sort((a, b) => b[scoring[i]] - a[scoring[i]])
            } else {
              extract.sort((a, b) => a[scoring[i]] - b[scoring[i]])
            }          
            break
          default: console.log("Unknown sort method " + scoring[i])
        }
      }

      // add positions
      // need to allow for ties...
      let pos = 1
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
      })
      
      console.log(extract)
      // add to overall results
      extract.forEach((res) => {
        const idx = newResults.findIndex((result) => result.id === res.id)
        if (idx !== -1) {
          newResults[idx]["stagePos"][i] = res.pos
          newResults[idx]["stageScore"][i] = res.pos
          // delete unneeded fields and then save stage results to runner record
          //delete res.pos
          //delete res.id
          newResults[idx]["stageResult"][i] = res
        } else {
          console.log("Cannot find id " + res.id)
        }
      })
      console.log("Found " + extract.length + " results for this stage")
    }
    // update overall results
    let resultsToCount = 1
    newResults.forEach((result) => {
        // create copy of stageScores for this runner
        let a = result.stageScore.slice()
        // sort in ascending order
        let b = a.sort((a, b) => a - b)
        // remove all 0 entries
        let c = b.filter((score) => score > 0)
        // limit to number of counting scores
        let d = c.slice(0, resultsToCount)
        // add up scores
        result.score= d.reduce((acc, cur) => acc + cur, 0)
    })
    newResults.sort((a, b) => {
      if (a.score === 0) {
        return 1
      }
      return a.score - b.score
    })
    let pos = 0
    let ties = 0
    let oldScore = -1
    newResults.forEach((res) => {
      if (oldScore === res.score) {
        ties = ties + 1
      } else {
        pos = pos + ties + 1
        ties = 0
        oldScore = res.score  
      }
      res.pos = pos
    })
    this.setState({results: newResults})
    FirestoreService.saveResultsForEvent(eventid, newResults)
  }

  createDummyResults = () => {
    let pos = 1;
    let id = 0;
    let newResults = []
    res.forEach((r) => {
      let result = {}
      // pos = pos + 1
      let f = r.split(",")
      result.pos = pos
      result.id = f[0]
      result.name = f[1]
      result.club = f[3]
      result.class = f[2] 
      result.country = f[4]
      result.score = parseInt(f[5], 10)
      result.stageScore= []
      result.stagePos = []
      for (let i = 7; i < 19; i = i + 1) {
        //result.stageScore.push(parseInt(f[i],10))
        result.stageScore.push(0)
        result.stagePos.push(0)
      }
      newResults.push(result)
    })
    FirestoreService.saveResultsForEvent("e005", newResults)
  }

// runners.forEach((runner) => {
//   const id = runner.id.toString()
//   delete runner.id
//   FirestoreService.addRunner(id, runner)
// })  

// e1stages.forEach((s) => {
//   let stage = {}
//   let f = s.split(",")
//   stage.id = parseInt(f[0], 10)
//   stage.name = f[1]
//   stage.isOpen = (Math.random() > 0.5)
//   stage.isAuto = (Math.random() > 0.5)
//   stage.url = f[3]
//   stage.fields = f[2].split(";")
//   stages.push(stage)
// })
  }

export default Quiz
