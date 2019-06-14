import React from 'react';
import { t } from './Quiz.jsx';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class Category extends React.Component {
  onClick = (event) => {
    this.props.onClick(this.props.category);
  }

  render() {
    return (
      <Col>
        <Form.Check
          type="checkbox"
          inline
          id={this.props.category}
          defaultChecked={this.props.use}
          onClick={this.onClick}
          label={t(this.props.category)}
        />
      </Col>
    )
  }
}

export default Category;