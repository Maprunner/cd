import React from 'react';
import * as FirestoreService from '../services/firestore';
// import _ from 'underscore';
import Header from './Header.jsx'
//import entries from './entries.js'
import stageRes from './stageRes.js'
import res from './res.js'
import e1stages001 from './e1stages001.js'
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
            variant="primary"
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
          <Button
            onClick={this.createDummyResults}
            variant="primary"
          >
            Create dummy results
          </Button>
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

  calculateStageResults = (btnEvent) => {
    for (let i = 0; i < e1stages001.length; i = i + 1) {
      let result = {}
      const runnerid = e1stages001[i][0].toString()
      result.score = e1stages001[i][1]
      //console.log(runnerid, result)
      //FirestoreService.saveResultForEvent(eventid, runnerid, {s001: result})    
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
    let results = this.state.results
    const eventid = btnEvent.target.value
    // 0 accesses e001: need to decide how to pick this up...
    const stages = this.state.stages[0]
    for (let i = 0; i < stages.length; i = i + 1) {
      let extract = []
      const stage = stages[i]
      const stageId = this.getStageId(stage.id)
      // need to determine sort order from stage record
      // scoring is an array of fields used for scoring
      const scoring = stage.scoring ? stage.scoring: []
      //scoreOrder shows how to sort each field
      const scoreOrder = stage.scoreOrder ? stage.scoreOrder: []
      this.state.stageResults.forEach((result) => {
        if (result[stageId]) {
          let res = {}
          res.id = result.id
          // extract required fields for scoring
          scoring.forEach((method) => {
            if (result[stageId][method]) {
              res[method] = result[stageId][method]
            }
          })
          extract.push(res)
        }
      })

      // sort extracted results for this stage
      for (let i = scoring.length - 1; i >= 0; i = i - 1) {
        switch (scoring[i]) {
          case "score":
            if (scoreOrder[i] === "desc") {
              extract.sort((a, b) => b.score - a.score)
              console.log("Score desc")
            } else {
              extract.sort((a, b) => a.score - b.score)
              console.log("Score asc")
            }
            break
          case "time":
            if (scoreOrder[i] === "desc") {
              extract.sort((a, b) => b.time - a.time)
              console.log("Time desc")
            } else {
              extract.sort((a, b) => a.time - b.time)
              console.log("Time asc")
            }
            break
          default: console.log("Unknown sort method " + scoring[i])
        }
      }

      // add positions
      // need to allow for ties...
      let pos = 1
      extract.forEach((res) => {
        res.pos = pos
        pos = pos + 1
      })
      
      console.log(extract)
      // add to overall results
      extract.forEach((res) => {
        results[res.id]["stagePos"][i] = res.pos
        results[res.id]["stageScore"][i] = res.pos
      })

    }
    // update overall results
    const keys = results.keys
    keys.forEach((result) => {
      const scores = result.stageScore
      let score = 0
      for (let i = 0; i < scores.length; i = i + 1) {
        score = scores[i]
      }
      result.score = score
    })
    results.sort((a, b) => a.score - b.score)
    let pos = 1
    results.forEach((res) => {
      res.pos = pos
      pos = pos + 1
    })
    //FirestoreService.saveResultsForEvent(event, results)
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
    FirestoreService.addEventResults("e001", newResults)
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
