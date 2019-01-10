import React from 'react';
import { Link } from 'react-router-dom';

function Schedule(params) {
  return(<tr>
            <td><p> { params.schedule.stop_name}</p></td>
            <td><p> { params.schedule.arrival_time} </p></td>
            </tr>); ;
}

export default function Schedules(params) {
  //console.log('This is users params',params)
  let schedule = _.map(params.schedule, (uu,ii) => <Schedule key={ii} schedule={uu} />);
  return( <div className="table-responsive">
    <div className="tablestart">
   <p>Bus Schedule</p>
    <table className="tablestyle">
  
  <tbody>
    <tr>
      <th>Stop Name</th>
      <th>Arrival Time</th>
    </tr>
      { schedule }
    </tbody>
  </table>
  </div>
  </div>);
}