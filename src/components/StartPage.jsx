import React from 'react';
import PropTypes from 'prop-types';
import { MATCH_ITEMS, TEXT_TO_SYMBOLS, baseCategories, baseData, matchQuestions, matchSymbols, matchText } from './data.jsx';
import NameInput from './NameInput.jsx';
import NumberInput from './NumberInput.jsx';
import LanguageList from './LanguageList.jsx';
import Types from './Types.jsx'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { t } from './Quiz.jsx';
import _ from 'underscore';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    let questions = this.filterQuestions(baseCategories);
    this.state = {
      questions: questions,
      categories: baseCategories
    };
  }

  onStart = (type) => {
    let questions;
    if (type === MATCH_ITEMS) {
      // questions = this.createMatch();
      questions = matchQuestions;
    } else {
      //questions = this.createQuiz(this.props.answersPerQuestion);
      if (type === TEXT_TO_SYMBOLS) {
        questions = matchSymbols;
      } else {
        questions = matchText;
      }
    }
    this.props.onStart(questions, type);
  }

  filterQuestions(categories) {
    // create a list of index values for categories to be used
    const useCategories = _.chain(categories)
      .where({ 'use': true })
      .pluck('index')
      .value();

    const questions = _.filter(this.props.data, function (q) {
      //question id is three digits: first digit is category
      return _.contains(useCategories, parseInt((q.id / 100), 10));
    });
    return questions;
  }

  createMatch() {
    const shuffled = _.shuffle(this.state.questions);
    let text = [];
    let symbols = [];
    for (let i = 0; i < shuffled.length; i = i + 1) {
      // only use one 'special symbol' to avoid confusion
      if (shuffled[i].code !== 59719) {
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
    const questions = _.reduce(symbols,
      function (questions, symbol, idx) {
        questions.push(symbol);
        questions.push(text[idx])
        return questions;
      },
      []
    );
    return questions;
  }

  createQuiz(answersPerQuestion) {
    const shuffled = _.shuffle(this.state.questions);
    // extract list of possible answers
    let answers = [];
    for (let i = 0; i < shuffled.length; i = i + 1) {
      answers.push({
        code: shuffled[i].code,
        desc: shuffled[i].desc,
        id: shuffled[i].id
      });
    }
    // generate question for each entry in shuffled array
    let questions = [];
    for (let i = 0; i < shuffled.length; i = i + 1) {
      let detail = {};
      detail.question = {
        code: shuffled[i].code,
        id: shuffled[i].id,
        desc: shuffled[i].desc
      };
      detail.answers = this.generateAnswers(detail.question, answers, answersPerQuestion);
      detail.gotIt = false;
      questions.push(detail);
    }
    return questions;
  }

  generateAnswers(question, possible, answersPerQuestion) {
    // add correct answer
    let list = [question];
    // shuffle possible answers
    possible = _.shuffle(possible);
    // add as many incorrect answers as needed/available
    let i = 0;
    while ((list.length < answersPerQuestion) && (i < possible.length)) {
      // don't duplicate correct answer, and only use items in same group
      if ((possible[i].desc !== question.desc) &&
        (parseInt((question.id / 100), 10) === parseInt((possible[i].id / 100), 10))) {
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

  renderTypes(props) {
    if (!props.canStart) {
      return (<></>)
    }
    return (
      <Types
      onStart={this.onStart}
      results={props.results}
    />
    )
  }

  render() {
    let types = this.renderTypes(this.props);
    return (
      <div>
        {types}
        <Card className="m-1">
          <Card.Header className="font-weight-bold">
            {t('Settings')}
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group as={Row}>
                <NameInput
                  name={this.props.name}
                  onSetName={this.props.onSetName}
                />
                <NumberInput
                  number={this.props.number}
                  onSetNumber={this.props.onSetNumber}
                />
                <LanguageList
                  language={this.props.language}
                  onSelectLanguage={this.props.onSelectLanguage}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div >
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

export default StartPage;