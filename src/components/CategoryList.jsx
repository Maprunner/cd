import React from 'react'
import Category from './Category.jsx'
import Row from 'react-bootstrap/Row'

const CategoryList = (props) => {
  const {onClick, categories} = props
  const cats = categories.map(function (cat, idx) {
    return (
      <Category
        key={idx}
        category={cat.name}
        use={cat.use}
        onClick={onClick}
      />
    )
  })
  return (
    <Row className="pb-2">
      {cats}
    </Row>
  )
}

export default CategoryList