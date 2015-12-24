'use strict';
/*global _*/
import React from 'react';
import {t} from './Quiz.jsx';
import {MATCH_ITEMS, baseCategories, baseData, availableLanguages} from './data.jsx';

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

  onStartClick = () => {
    var questions;
    if (this.props.type === MATCH_ITEMS) {
      questions = this.createMatch();
    } else {
      questions = this.createQuiz();
    }
    this.props.onStart(questions);
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
    return (
      <div>
        <NameInput
          name={this.props.name}
          onSetName={this.props.onSetName}
        />
        <CategoryList
          onClick={this.onSetCategory}
          categories={this.state.categories}
          total={this.state.questions.length}
        />
        {this.props.type !== MATCH_ITEMS ?
          <AnswerOptionList
            possibleAnswers={[2, 3, 4, 5]}
            onClick={this.onAnswerClick}
            setting={this.state.answersPerQuestion}
          />
          :
          null
        }
        <LanguageList
          language={this.props.language}
          onSelectLanguage={this.props.onSelectLanguage}
        />
        <StartButton onClick={this.onStartClick} />
      </div>
    );
  }
}

StartPage.defaultProps = {
  data: baseData
}

export class CategoryList extends React.Component {
  render() {
    var self = this;
    var categories = this.props.categories.map(function(cat, idx){
      return (
        <Category
          key={idx}
          category={cat.name}
          use={cat.use}
          onClick={self.props.onClick}
        />
      );
    })
    return (
      <div className='panel panel-primary category-list'>
        <div className='panel-heading'>
          <h4 className='panelTitle'>{t('Select options') + ':'}</h4>
        </div>
        <div className='panel-body'>
          {categories}
        </div>
        <div className='panel-footer'>
          <h4>{this.props.total + ' ' + t('questions selected')}</h4>
        </div>
      </div>
    )
  }
}

export class NameInput extends React.Component {
  onNameChange = (event) => {
    var name = event.target.value;
    // limit valid characters to 0 or more of quite a wide range
    const validChars = /^[ A-Za-z0-9!£\$%\^&\*()\-\+=:;@#\?\.,\[\]\{\}\/]*$/;
    if (name.match(validChars) === null) {
      name = this.props.name;
    }
    this.props.onSetName(name);
  }

  render(){
    return(
      <div>
        <span className='option-text'>{t('Name') + ':'}</span>
        <input
          type='text'
          className='form-control'
          maxLength={'25'}
          value={this.props.name}
          onChange={this.onNameChange}
        />
      </div>
    );
  }
}

export class LanguageList extends React.Component {
  render() {
    var self = this;
    var languages = availableLanguages.map(function(lang, i){
      return(
        <Language
          key={i}
          value={lang}
          onSelectLanguage={self.props.onSelectLanguage}
          setting={self.props.language}
        />
      );
    });

    return(
      <div className='top-margin'>
        <span className='option-text'>{t('Language')}</span>
        <div className='pull-right'>
          <span className='btn-group btn-group-lg' role='group'>
            {languages}
          </span>
        </div>
      </div>
    )
  }
}

export class Language extends React.Component {
  onSelectLanguage = () => {
    this.props.onSelectLanguage(this.props.value);
  }

  render(){
    var classes = 'btn btn-default';
    if (this.props.setting === this.props.value) {
      classes = classes + ' active';
    }
    return (
      <button
        type='button'
        className={classes}
        onClick={this.onSelectLanguage}
      >
        {this.props.value}
      </button>
    )
  }
}

export class Category extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.category);
  }

  render(){
    return(
      <div>
        <span
          className='cd-checkbox'
          onClick={this.onClick}
        >
          {this.props.use ? 'X': ''}
        </span>
        <span
          className='option-text'
        >
          {t(this.props.category)}
        </span>
      </div>
    )
  }
}

export class AnswerOptionList extends React.Component {
  render() {
    var self = this;
    var answers = this.props.possibleAnswers.map(function(ans, i){
      return(
        <AnswerOption
          key={i}
          value={ans}
          onClick={self.props.onClick}
          setting={self.props.setting}
        />
      );
    });

    return(
      <div>
        <span className='option-text'>{t('Answers per question')}</span>
        <div className='pull-right'>
          <span className='btn-group btn-group-lg' role='group'>
            {answers}
          </span>
        </div>
      </div>
    )
  }
}

export class AnswerOption extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.value);
  }

  render() {
    var classes = 'btn btn-default';
    if (this.props.setting === this.props.value) {
      classes = classes + ' active';
    }
    return (
      <button type='button' className={classes} onClick={this.onClick}>
        {this.props.value}
      </button>
    )
  }
}

export class StartButton extends React.Component {
  render() {
    return (
      <div className='start-button'>
        <button className='btn btn-primary btn-lg' onClick={this.props.onClick}>
          {t('Start')}
        </button>
      </div>
    );
  }
}
