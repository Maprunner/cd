import React from 'react';
import Category from './Category.jsx'

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
      <div>
        {categories}
      </div>
    )
  }
}

export default CategoryList;