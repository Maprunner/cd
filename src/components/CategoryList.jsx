import React from 'react';
import {t} from './Quiz.jsx';
import {Checkbox, FormGroup} from 'react-bootstrap';

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
      <div>
        <FormGroup controlId="chkCategorySelect">
          {categories}
        </FormGroup>
      </div>
    )
  }
}

export class Category extends React.Component {
  onClick = (event) => {
    this.props.onClick(this.props.category);
  }

  render(){
    return(
      <Checkbox
        //value={this.props.category}
        defaultChecked={this.props.use}
        onClick={this.onClick}
        className="col-md-2 reset-top-margin"
      >
        {t(this.props.category)}
      </Checkbox>
    )
  }
}
