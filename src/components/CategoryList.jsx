import React from 'react';
import Category from './Category.jsx'
import Row from 'react-bootstrap/Row';

class CategoryList extends React.Component {
  render() {
    var self = this;
    var categories = this.props.categories.map(function (cat, idx) {
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
      <Row className="pb-2">
        {categories}
      </Row>
    )
  }
}

export default CategoryList;