import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as FirestoreService from '../services/firestore';
import CSVReader from 'react-csv-reader'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import e007stages from '../data/e007stages.js'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import EventSelect from "./EventSelect"

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventid: "e007",
      event: {},
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
          <CSVReader onFileLoaded={(data, fileInfo) => this.createStageResults(data, fileInfo, this.state.eventid, "s009")} label="Stage 3 Contours"/>
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
        <Button
          onClick={() => this.reformatStageResults(this.state.eventid, this.state.event)}
          variant="primary"
        >
          Rewrite stage results for {this.state.eventid}
        </Button>
        </Col>
        <Col>
        <Button
          onClick={() => this.getRunnersForEvent(this.state.eventid)}
          variant="warning"
        >
          Get runners for {this.state.eventid}
        </Button>
        </Col>
        <Col>
        <CSVReader onFileLoaded={(data, fileInfo) => this.createArrayEventRunners(this.state.eventid, data, fileInfo)} label="Create eventRunners"/>
        </Col>
        </Row>
        <Row className="m-5">
          <Col>
        <Button
          onClick={() => this.createEvent(this.state.eventid)}
          variant="primary"
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
    eventid: event.target.value,
    event: this.state.events[parseInt(event.target.value.slice(-2), 10) - 1]
  })
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
          events: events,
          event: events[parseInt(this.state.eventid.slice(-2), 10) - 1]
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

  strip = (field) => {
    // make sure we don't have " or ; in fields to muck up csv handling"
    return field.replace('"', "").replace(";", ",")
  }

  createArrayEventRunners = (eventid, data, fileinfo) => {
    let runners = []
    for (let row = 0; row < data.length; row = row + 1) {
      let r = data[row]
      if (r.length < 7) {
        continue
      }
      // 0: id, 1: name, 2: country, 3: class, 4: club, 5: team, 6: teamid
      const sep = ';'
      let runner = `${r[0]}${sep}${this.strip(r[1])}${sep}${this.strip(r[2])}${sep}${this.strip(r[3])}${sep}${this.strip(r[4])}${sep}${this.strip(r[5])}${sep}${this.strip(r[6])}`
      runners.push(runner)
    }
    //console.log(runners)
    FirestoreService.writeArrayRunnersByEvent(eventid, {names: runners})
  }

  getRunnersForEvent = (eventid) => {
    FirestoreService.getRunnersByEvent(eventid).then((data) =>{
      console.log("Got runners: ", JSON.stringify(data.data()).length)
      const raw = data.data()
      let runners = []
      for (const runnerid in raw) {
        let runner = raw[runnerid]
        runner.id = runnerid
        runners.push(runner)
       }
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

  reformatStageResults = (eventid, event) => {
    //change from by runner to by stage
    FirestoreService.getOldStageResultsForEvent(eventid).then((snapshot) => {
      let results = []
       snapshot.forEach((doc) => {
        let result = doc.data()
        result.id = parseInt(doc.id, 10) 
        results.push(result)
      })
      console.log("Got stage results: " + results.length)
      // change from by runner to by stage
      const stages = []
      for (let i = 0; i < event.stages.length; i = i + 1) {
        stages[i] = {}
      }
      results.forEach((res)  => {
        const keys = Object.keys(res)
          for (const key of keys) {
            if (key !== "id") {
              const stage = parseInt(key.slice(-2), 10) - 1
              if ((stage < 0) || (stage > event.stages.length)) {
                console.log("Error for ", res)
              } else {
                stages[stage][res.id.toString()] = res[key]
              }
          }
          } 
      })
      console.log(stages)
      for (let i = 0; i < event.stages.length; i = i + 1) {
        let stage = "s0"
        const number = i + 1
        if (number <10) {
          stage = stage + "0"
        }
        console.log(stages[i])
        //FirestoreService.writeStageResultsForEvent003(stage, stages[i])
      }

    })     
  }

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
    const stageInfo = this.state.events[5].stages[stageno - 1]
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
      stageResult[runnerid] = result
      // console.log(runnerid, newResult) 
    }
    console.table(stageResult)
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
  const idx = parseInt(eventid.slice(-1), 10)
  const event = this.state.events[idx]

  const newResults = this.state.results.map((result) => {
    for (let i = 0; i < event.stages.length; i = i + 1) {
      delete result.name
      delete result.class
      delete result.ageclass
      delete result.club
      delete result.country
      delete result.stageResult
      return result
    }
  })
  console.log(newResults)
  FirestoreService.saveResultsForEvent(eventid, newResults)
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
      result.catPos.push(0)
      result.catResults.push(0)
      result.catScore.push(0)
    }
    newResults.push(result)
  }
  console.log(newResults)

 FirestoreService.saveResultsForEvent(eventid, newResults)
}

createEvent = (eventid) => {
let event = {
  description: "10 stages for the British Virtual Orienteering Championships",
  name: "British Open",
  dateFrom: Date.parse('26 Jun 2020 00:01:00 GMT'), 
  dateTo: Date.parse('28 Jun 2020 00:01:00 GMT'),
  winnerPoints: 1000,
  isTeamEvent: false,
  messageTitle: "",
  message: ""
}
let stages = []
e007stages.forEach((stage) => {
  stage.isOpen = false;
  stages.push(stage)
})
event.stages = stages
let cats = []
const cat0 = {
  countingStages: 7,
  name: "10-stage",
  stages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}
cats.push(cat0)
const cat1 = {
  countingStages: 6,
  name: "7-stage",
  stages: [0, 1, 2, 3, 6, 7, 8]
}
cats.push(cat1)

event.categories = cats

const eventListInfo = {}
eventListInfo[eventid] = {}
eventListInfo[eventid].description = event.description
eventListInfo[eventid].name = event.name


console.log(event)

FirestoreService.addEvent(eventid, event)
//FirestoreService.updateEventList(eventid, {eventListInfo})

}

}

export default Admin
