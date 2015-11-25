Array.prototype.shuffle = function() {
    var input = this;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

var StartButton = React.createClass({
  render: function() {
    return (
      <button type="button" disabled={this.props.running ? 'disabled': ''} className="btn btn-primary" onClick={this.props.onClick}>Start</button>
    );
  }
});

var Question = React.createClass({

  render: function() {
    var chr = String.fromCharCode(this.props.code);
    return (
      <div>
        <span className='cd'>{chr}</span>
        <h3>Question {this.props.number}</h3>
      </div>
    );
  }
});

// bring up as modal when quiz completd??
var ResultMessage = React.createClass({
  render(){
    return (
      <h2>You scored {this.props.score} out of {this.props.from} in {this.props.time} seconds.</h2>
    )
  }
});

var Answer = React.createClass({

  handleClick(){
    this.props.onClick(this.props.answer);
  },

  render(){
    return (
      <div className="panel panel-primary" onClick={this.handleClick}>
        <div className="panel-heading">
          {this.props.answer}
        </div>
      </div>
    )
  }
});

var AnswerList = React.createClass({

  render(){
    var self = this;
    var answers = this.props.answers.map(function(ans, idx){
      return <Answer key={idx} answer={ans} onClick={self.props.onClick} />
    });
    if(!answers.length) {
      return null;
    }
    return (
      <div>
        {answers}
      </div>
    )
  }
});

var Score = React.createClass({
  render(){
    return (
      <div><h2>Score: {this.props.score}/{this.props.from}</h2></div>
    )
  }
});

var Timer = React.createClass({
  render(){
    return (
      <div><h2>Time: {this.props.elapsed}</h2></div>
    )
  }
});

var Quiz = React.createClass({
  getInitialState(){
    return {questions: this.createNewQuiz(),
            currentQuestion: 0,
            score: 0,
            start: 0,
            elapsed: 0,
            running: false
    };
  },

  componentDidMount: function() {
    this.timer = setInterval(this.tick, 500);
  },

  componentWillUnmount: function() {
   clearInterval(this.timer);
  },

  tick: function(){
    if (this.state.running) {
      this.setState({elapsed: new Date() - this.state.start});
    }
  },

  startNewQuiz() {
    //var start = new Date().getTime();
    this.setState({questions: this.createNewQuiz(),
                   running: true,
                   start: new Date().getTime(),
                   score: 0
                  });
  },

  createNewQuiz() {
    var i, shuffled, detail, questions, answers;
    // set up list of wanted questions and shuffle them
    shuffled = this.props.data.shuffle();
    // extract list of possible answers
    answers = [];
    for (i = 0; i < shuffled.length; i = i + 1) {
      answers.push({desc: shuffled[i].desc, id: shuffled[i].id});
    }
    // generate question for each entry in shuffled array
    questions = [];
    for (i = 0; i < shuffled.length; i = i + 1) {
      detail= {};
      detail.code = shuffled[i].code;
      detail.answers = this.generateAnswers(shuffled[i].desc, shuffled[i].id, answers);
      detail.correct= shuffled[i].desc;
      questions.push(detail);
    }
    return questions;
  },

  generateAnswers(correct, id, possible) {
    var list, i, ANSWERS;
    // change to config parameter at some stage
    ANSWERS = 3;
    // add correct answer
    list = [correct];
    // shuffle possible answers
    possible.shuffle();
    // add as many incorrect answers as needed/available
    i = 0;
    while ((list.length < ANSWERS) && (i < possible.length)) {
      // don't duplicate correct answer, and only use items in same group
      if ((possible[i].desc !== correct)  && (parseInt((id/100), 10) === parseInt((possible[i].id/100), 10))) {
        list.push(possible[i].desc);
      }
      i = i + 1;
    }
    return list.shuffle();
  },

  checkAnswer(answer) {
    var q = this.state.questions[this.state.currentQuestion];
    if (answer === q.correct) {
      this.setState({score : this.state.score + 1});
    }

    this.setState({currentQuestion: this.state.currentQuestion + 1});
    if (this.state.currentQuestion === this.state.questions.length) {
      // finished
      alert("Finished");
    }
  },

  render(){
    return (
      <div>
        <div className="row">
          <h1>Maprunner IOF Control Description Quiz</h1>
        </div>
        <div className="row">
          <StartButton running={this.state.running} onClick={this.startNewQuiz} />
        </div>
        {this.state.running ?
        <div className="row">
          <div className="row">
            <div className="col-sm-2">
              <Question number={this.state.currentQuestion + 1} code={this.state.questions[this.state.currentQuestion].code}/>
            </div>
            <div className="col-sm-4">
              <br />
              <AnswerList answers={this.state.questions[this.state.currentQuestion].answers} onClick={this.checkAnswer} />
            </div>
          </div>
        </div>
        : null}
        <div className="row">
          <div className="col-sm-4">
            <Score score={this.state.score} from={this.state.currentQuestion}/>
          </div>
          <div className="col-sm-4">
            <Timer elapsed={parseInt((this.state.elapsed/1000), 10)}/>
          </div>
        </div>
      </div>
    );
  }

});

var data = [
  {"id": 101, code:59648, "desc": "Terrace", "diff": 2},
  {"id": 102, code:59649, "desc": "Spur", "diff": 1},
  {"id": 103, code:59650, "desc": "Re-entrant", "diff": 1},
  {"id": 104, code:59651, "desc": "Earthbank", "diff": 1},
  {"id": 105, code:59652, "desc": "Quarry", "diff": 2},
  {"id": 106, code:59653, "desc": "Earthwall", "diff": 1},
  {"id": 107, code:59654, "desc": "Gully", "diff": 1},
  {"id": 108, code:59655, "desc": "Small gully", "diff": 1},
  {"id": 109, code:59656, "desc": "Hill", "diff": 1},
  {"id": 110, code:59657, "desc": "Knoll", "diff": 1},
  {"id": 111, code:59658, "desc": "Saddle", "diff": 2},
  {"id": 112, code:59659, "desc": "Depression", "diff": 1},
  {"id": 113, code:59660, "desc": "Small depression", "diff": 1},
  {"id": 114, code:59661, "desc": "Pit", "diff": 1},
  {"id": 115, code:59662, "desc": "Broken ground", "diff": 2},
  {"id": 116, code:59663, "desc": "Ant hill", "diff": 2},
  {"id": 201, code:59664, "desc": "Cliff", "diff": 1},
  {"id": 202, code:59665, "desc": "Rock pillar", "diff": 2},
  {"id": 203, code:59666, "desc": "Cave", "diff": 2},
  {"id": 204, code:59667, "desc": "Boulder", "diff": 1},
  {"id": 205, code:59668, "desc": "Boulder field", "diff": 2},
  {"id": 206, code:59669, "desc": "Boulder cluster", "diff": 2},
  {"id": 207, code:59670, "desc": "Stony ground", "diff": 2},
  {"id": 208, code:59671, "desc": "Bare rock", "diff": 2},
  {"id": 209, code:59672, "desc": "Narrow passage", "diff": 2},
  {"id": 301, code:59673, "desc": "Lake", "diff": 2},
  {"id": 302, code:59674, "desc": "Pond", "diff": 1},
  {"id": 303, code:59675, "desc": "Waterhole", "diff": 2},
  {"id": 304, code:59676, "desc": "River", "diff": 1},
  {"id": 305, code:59677, "desc": "Ditch", "diff": 1},
  {"id": 306, code:59678, "desc": "Narrow marsh", "diff": 1},
  {"id": 307, code:59679, "desc": "Marsh", "diff": 1},
  {"id": 308, code:59680, "desc": "Firm ground in marsh", "diff": 2},
  {"id": 309, code:59681, "desc": "Well", "diff": 2},
  {"id": 310, code:59682, "desc": "Spring", "diff": 1},
  {"id": 311, code:59683, "desc": "Watertank", "diff": 2},
  {"id": 401, code:59684, "desc": "Open land", "diff": 2},
  {"id": 402, code:59685, "desc": "Semi-open land", "diff": 2},
  {"id": 403, code:59686, "desc": "Forest corner", "diff": 2},
  {"id": 404, code:59687, "desc": "Clearing", "diff": 1},
  {"id": 405, code:59688, "desc": "Thicket", "diff": 1},
  {"id": 406, code:59689, "desc": "Linear thicket", "diff": 2},
  {"id": 407, code:59690, "desc": "Vegetation boundary", "diff": 1},
  {"id": 408, code:59691, "desc": "Copse", "diff": 2},
  {"id": 409, code:59692, "desc": "Distinctive tree", "diff": 1},
  {"id": 410, code:59693, "desc": "Root stock", "diff": 1},
  {"id": 501, code:59694, "desc": "Road", "diff": 1},
  {"id": 502, code:59695, "desc": "Path", "diff": 1},
  {"id": 503, code:59696, "desc": "Ride", "diff": 1},
  {"id": 504, code:59697, "desc": "Bridge", "diff": 1},
  {"id": 505, code:59698, "desc": "Power line", "diff": 2},
  {"id": 506, code:59699, "desc": "Pylon", "diff": 1},
  {"id": 507, code:59700, "desc": "Tunnel", "diff": 1},
  {"id": 508, code:59701, "desc": "Stone wall", "diff": 1},
  {"id": 509, code:59702, "desc": "Fence", "diff": 1},
  {"id": 510, code:59703, "desc": "Crossing point", "diff": 1},
  {"id": 511, code:59704, "desc": "Building", "diff": 2},
  {"id": 512, code:59705, "desc": "Paved area", "diff": 1},
  {"id": 513, code:59706, "desc": "Ruin", "diff": 1},
  {"id": 514, code:59707, "desc": "Pipeline", "diff": 1},
  {"id": 515, code:59708, "desc": "Tower", "diff": 2},
  {"id": 516, code:59709, "desc": "Shooting platform", "diff": 2},
  {"id": 517, code:59710, "desc": "Cairn", "diff": 1},
  {"id": 518, code:59711, "desc": "Fodder rack", "diff": 1},
  {"id": 519, code:59712, "desc": "Shooting platform", "diff": 1},
  {"id": 520, code:59713, "desc": "Statue", "diff": 1},
  {"id": 523, code:59714, "desc": "Canopy", "diff": 2},
  {"id": 524, code:59715, "desc": "Stairway", "diff": 1},
  {"id": 598, code:59716, "desc": "Special item", "diff": 1},
  {"id": 599, code:59717, "desc": "Special item", "diff": 1}

];

ReactDOM.render(
  <Quiz data={data}/>,
  document.getElementById('quizbody')
);
