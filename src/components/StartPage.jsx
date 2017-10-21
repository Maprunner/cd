import React from 'react';
import PropTypes from 'prop-types';
import {MATCH_ITEMS, baseCategories, baseData} from './data.jsx';
import {NameInput} from './NameInput.jsx';
import {CategoryList} from './CategoryList.jsx';
import {LanguageList} from './LanguageList.jsx';
import {AnswerOptionList} from './AnswerOptionList.jsx';
import {Types} from './Types.jsx'
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import {t} from './Quiz.jsx';
import _ from 'underscore';

export class StartPage extends React.Component {
  constructor(props) {
    super(props);
    var questions;
    questions = this.filterQuestions(baseCategories);
    this.state = {
      answersPerQuestion: 3,
      questions: questions,
      categories: baseCategories
    };
  }

  onAnswerClick = (value) => {
    this.setState({answersPerQuestion: value});
  }

  onStart = (type) => {
    var questions;
    if (type === MATCH_ITEMS) {
      questions = this.createMatch();
    } else {
      questions = this.createQuiz();
    }
    this.props.onStart(questions, type);
  }

  onSetCategory = (category) => {
    var categories, newQuestions;
    categories = this.state.categories;
    categories.forEach(function (item) {
      if (item.name === category) {
        item.use = !item.use;
      }
    });
    newQuestions = this.filterQuestions(categories);
    this.setState({
      categories: categories,
      questions: newQuestions
    });
  }

  filterQuestions(categories) {
    var questions, useCategories;
    // create a list of index values for categories to be used
    useCategories = _.chain(categories)
      .where({'use': true})
      .pluck('index')
      .value();

    questions = _.filter(this.props.data, function (q) {
          //question id is three digits: first digit is category
          return _.contains(useCategories, parseInt((q.id /100), 10));
        });
    return questions;
  }

  createMatch() {
    var i, shuffled, text, symbols, questions;
    shuffled = _.shuffle(this.state.questions);
    text = [];
    symbols = [];
    for (i = 0; i < shuffled.length; i = i + 1) {
      // only use one 'special symbol' to avoid confusion
      if (shuffled[i].code !== 59717) {
        text.push({
          type: 'text',
          code: shuffled[i].code,
          desc: shuffled[i].desc,
          gotIt: false,
          selected: false
        });
        symbols.push({
          type: 'symbol',
          code: shuffled[i].code,
          desc: shuffled[i].desc,
          gotIt: false,
          selected: false
        });
      }
    }
    // move correct pairs apart
    symbols = _.shuffle(symbols);
    // merge symbol and text arrays
    // by taking symbol and text alternately
    // starting with an empty array
    questions = _.reduce( symbols,
      function(questions, symbol, idx) {
        questions.push(symbol);
        questions.push(text[idx])
        return questions;
      },
      []
    );
    return questions;
  }

  createQuiz() {
    var i, shuffled, detail, questions, answers;
    shuffled = _.shuffle(this.state.questions);
    // extract list of possible answers
    answers = [];
    for (i = 0; i < shuffled.length; i = i + 1) {
      answers.push({
        code: shuffled[i].code,
        desc: shuffled[i].desc,
        id: shuffled[i].id
      });
    }
    // generate question for each entry in shuffled array
    questions = [];
    for (i = 0; i < shuffled.length; i = i + 1) {
      detail = [];
      detail.question = {
        code: shuffled[i].code,
        id: shuffled[i].id,
        desc: shuffled[i].desc
      };
      detail.answers = this.generateAnswers(detail.question, answers);
      detail.gotIt = false;
      questions.push(detail);
    }
    return questions;
  }

  generateAnswers(question, possible) {
    var list, i;
    // add correct answer
    list = [question];
    // shuffle possible answers
    possible = _.shuffle(possible);
    // add as many incorrect answers as needed/available
    i = 0;
    while ((list.length < this.state.answersPerQuestion) && (i < possible.length)) {
      // don't duplicate correct answer, and only use items in same group
      if ((possible[i].desc !== question.desc)  &&
          (parseInt((question.id/100), 10) === parseInt((possible[i].id/100), 10))) {
        list.push({
          desc: possible[i].desc,
          code: possible[i].code,
          id: possible[i].id
        });
      }
      i = i + 1;
    }
    return _.shuffle(list);
  }

  render(){
    const style = {
      float: 'right',
      margin:16,
      'paddingBottom': 16,
      'paddingLeft': 16,
      'paddingRight': 16,
      width: '300'
    };

    return (
      <div className='body-container'>
      <Types
        onStart={this.onStart}
      />
      <Card
        style={style}
      >
        <CardTitle
          title={t('Select options')}
        />
        <CategoryList
          onClick={this.onSetCategory}
          categories={this.state.categories}
          total={this.state.questions.length}
        />
        <NameInput
          name={this.props.name}
          onSetName={this.props.onSetName}
        />
        <AnswerOptionList
          possibleAnswers={[1, 2, 3, 4, 5]}
          onChange={this.onAnswerClick}
          setting={this.state.answersPerQuestion}
        />
        <LanguageList
          language={this.props.language}
          onSelectLanguage={this.props.onSelectLanguage}
        />
      </Card>
      </div>
    );
  }
}

StartPage.defaultProps = {
  data: baseData
}

StartPage.propTypes = {
    onStart: PropTypes.func,
    onSetName: PropTypes.func,
    onSelectLanguage: PropTypes.func,
    language: PropTypes.string,
    name: PropTypes.string
}
