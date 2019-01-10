import React from 'react';
import Bus from './bus';

export default function Src_Dest_bus(params) {

  let busses = _.map(params.busses, (pp, ii) => <Bus key={ii} bus={pp} />);
  return <table>
  <tbody>
  	<tr>
  		<th>Route No. </th>
		<th>Arrival</th>
		<th>Departure</th>
  	</tr>
    	{ busses }
   	</tbody>
  </table>;
}