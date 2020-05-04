import React from 'react'
import { t, availableLanguages } from './Quiz.jsx'
import Form from 'react-bootstrap/Form'

const LanguageList = (props) =>  {
  const handleChange = (event) => {
    props.onSelectLanguage(event.target.value)
  }
  
  let languages = availableLanguages.map(function (lang, i) {
    return (
      <option value={lang} key={i}>{lang}</option>
    )
  })

  return (
    <Form.Group
      controlId="frmLanguageSelect"
      className="col-md-2"
    >
      <Form.Label className="font-weight-bold">{t('Language')}</Form.Label>
      <Form.Control
        onChange={handleChange}
        as="select"
        value={props.language}
      >
        {languages}
      </Form.Control>
    </Form.Group>
  )
}

export default LanguageList