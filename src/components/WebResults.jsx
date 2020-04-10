import React from 'react';
import { t } from './Quiz.jsx';
import Table from 'react-bootstrap/Table';
import _ from 'underscore';

function getFormattedResults(results, name, number) {
  const formatted = results.map(function (result, idx) {
    if (_.isEmpty(result)) {
      return (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    
    let highlight = (result.name === name && result.number === number) ? "this-is-me" : "";
    return (
      <tr key={idx} className={highlight}>
        <td>{result.pos}</td>
        <td>{result.name}</td>
        <td>{result.number}</td>
        <td className='text-center'>{result.score}/{result.score + result.wrong}</td>
        <td className='text-center'>{result.time.toFixed(1)}</td>
      </tr>
    );
  })
  return formatted;
}

function formatResults(results, name, number) {
    const formattedResults = getFormattedResults(results, name, number)
    return (
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th className='text-center'>#</th>
                <th>{t('Name')}</th>
                <th>{t('Number')}</th>
                <th className='text-center'>{t('Score')}</th>
                <th className='text-center'>{t('Time')}</th>
              </tr>
            </thead>
            <tbody>
              {formattedResults}
            </tbody>
          </Table>
        </div>
      );
}

function WebResults(props) {
  // results are everything to display for a given type
  return (
    <div>
      {formatResults(props.results, props.name, props.number)}
    </div>
  );
}

export default WebResults;