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

var Question = React.createClass({

  render: function() {
    var chr = String.fromCharCode(this.props.code);
    return (
      <div>
        <h3>Question {this.props.number}</h3>
        <span className='cd'>{chr}</span>
      </div>
    );
  }
});

var StartButton = React.createClass({
  render(){
    return (
      <div>Button</div>
    )
  }
});


var Message = React.createClass({

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
  getInitialState: function(){
        return { elapsed: 0 };
    },

  componentDidMount: function(){
    this.timer = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function(){
   clearInterval(this.timer);
  },

  tick: function(){
    this.setState({elapsed: new Date() - this.props.start});
  },

  render(){
    return (
      <div><h2>Time: {Math.round(this.state.elapsed / 1000)}</h2></div>
    )
  }
});

var Quiz = React.createClass({
  getInitialState(){
    var start = new Date().getTime();
    
    var questions = this.startNewQuiz();

    return {questions: questions,
            currentQuestion: 0,
            score: 0,
            start: start
    };
  },

  startNewQuiz() {
    var i, shuffled, detail, questions, answers;
    // set up list of wanted questions and shuffle them
    shuffled = this.props.data.shuffle();
    // extract list of possible answers
    answers = [];
    for (i = 0; i < shuffled.length; i = i + 1) {
      answers.push(shuffled[i].desc);
    }
    // generate question for each entry in shuffled array
    questions = [];
    for (i = 0; i < shuffled.length; i = i + 1) {
      detail= {};
      detail.code = shuffled[i].code;
      detail.answers = this.generateAnswers(shuffled[i].desc, answers);
      detail.correct= shuffled[i].desc;
      questions.push(detail);
    }
    console.log(questions);
    return questions;
  },

  generateAnswers(correct, possible) {
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
      // don't duplicate correct answer
      if (possible[i] !== correct) {
        list.push(possible[i]);
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
          <StartButton />
        </div>
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
        <div className="row">
          <div className="col-sm-4">
            <Score score={this.state.score} from={this.state.currentQuestion}/>
          </div>
          <div className="col-sm-4">
            <Timer start={this.state.start}/>
          </div>
        </div>
        <div className="row">
          <Message score={this.state.score} from={this.state.currentQuestion} time="100"/>
        </div>
      </div>
    );
  }

});

var data = [
  {"id": 101, code:59648, "desc": "Terrace", "diff": 2},
  {"id": 102, code:59649, "desc": "Spur", "diff": 2},
  {"id": 103, code:59650, "desc": "Re-entrant", "diff": 2},
  {"id": 104, code:59651, "desc": "Earthbank", "diff": 2},
  {"id": 105, code:59652, "desc": "Quarry", "diff": 2},
  {"id": 106, code:59653, "desc": "Earthwall", "diff": 2},
  {"id": 107, code:59654, "desc": "Gully", "diff": 1},
  {"id": 108, code:59655, "desc": "Small gully", "diff": 1},
  {"id": 109, code:59656, "desc": "Hill", "diff": 1},
  {"id": 110, code:59657, "desc": "Knoll", "diff": 1},
  {"id": 111, code:59658, "desc": "Saddle", "diff": 2},
  {"id": 112, code:59659, "desc": "Depression", "diff": 1},
  {"id": 113, code:59660, "desc": "Small depression", "diff": 1},
  {"id": 114, code:59661, "desc": "Pit", "diff": 1},
  {"id": 115, code:59662, "desc": "Broken ground", "diff": 2},
  {"id": 116, code:59663, "desc": "Ant hill", "diff": 3},
];

ReactDOM.render(
  <Quiz data={data}/>,
  document.getElementById('quizbody')
);
