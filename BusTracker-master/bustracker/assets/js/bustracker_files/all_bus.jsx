import React from 'react';
import Bus from './bus';

export default function All_Bus(params) {

  let busses = _.map(params.busses, (pp, ii) => <Bus key={ii} bus={pp} />);
  return( <div className="tablestart">
    <p>Buses Arriving at {params.stop}</p>
    <div className="table-responsive">
    <table className="tablestyle">
  
  <tbody>
    <tr>
      <th>Route No.</th>
      <th>Arrival Time</th>
      <th>Check Schedule</th>
    </tr>
      { busses }
    </tbody>
  </table></div>
  </div>);
}