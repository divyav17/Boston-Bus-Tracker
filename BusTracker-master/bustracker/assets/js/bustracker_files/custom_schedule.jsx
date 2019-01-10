import React from 'react';
import { Link } from 'react-router-dom';

function Schedule(params) {
  return(<tr>
          	<td><p> { params.schedules.stopName}</p></td>
          	<td><p> { params.schedules.arrival_time} </p></td>
          	</tr>); 
}

export default function Custom_Schedule(params) {
  //console.log('This is custom_schdule params',params)
  let buses = _.map(params.bus, (uu,ii) => <Schedule key={ii} schedules={uu} />);
  return( <div className="table-responsive">
    <div className="tablestart">
    <p>Bus Schedule</p>
    <table className="tablestyle">
  
  <tbody>
    <tr>
      <th>Stop Name</th>
      <th>Arrival Time</th>
    </tr>
      { buses }
    </tbody>
  </table></div>
  </div>);
}