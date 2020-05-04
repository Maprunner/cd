import React from 'react' 
import { t } from './Quiz.jsx' 
import Button from 'react-bootstrap/Button' 
import Modal from 'react-bootstrap/Modal' 
import Table from 'react-bootstrap/Table' 
import Row from 'react-bootstrap/Row' 
import Container from 'react-bootstrap/Container' 

const Results = (props) => {
  const { handleClose, results, open } = props

  const renderResults = (results) => {
    if (results.length === 0) {
      return (
        <div>
          {t('No results yet')}
        </div>
      ) 
    }
    const formattedResults = results.map(function (result, idx) {
      return (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{result.name}</td>
          <td>{result.number}</td>
          <td className='text-center'>{result.score}</td>
          <td className='text-center'>{result.wrong}</td>
          <td className='text-center'>{result.time}</td>
        </tr>
      ) 
    }) 

    return (
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className='text-center'>#</th>
              <th>{t('Name')}</th>
              <th>{t('id')}</th>
              <th className='text-center'>{t('Score')}</th>
              <th className='text-center'>{t('Wrong')}</th>
              <th className='text-center'>{t('Time')}</th>
            </tr>
          </thead>
          <tbody>
            {formattedResults}
          </tbody>
        </Table>
      </div>
    ) 
  }

    return (
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Results')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="py-2">
              {renderResults(results)}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    ) 
}

export default Results 