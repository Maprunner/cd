import React from 'react';
import { t } from './Quiz.jsx';
import Form from 'react-bootstrap/Form';

class Category extends React.Component {
  onClick = (event) => {
    this.props.onClick(this.props.category);
  }

  render() {
    return (
      <Form.Check
        type="checkbox"
        inline
        id={this.props.category}
        defaultChecked={this.props.use}
        onClick={this.onClick}
        label={t(this.props.category)}
      />
    )
  }
}

export default Category;