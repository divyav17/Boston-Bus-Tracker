import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import api from '../api';
export default function Bus(props) {

  function get_Schedule(){
      api.get_schedule({"tripid" :props.bus.tripId})
      //console.log('I am coming in',props.bus.tripId)
  }

 // console.log('this is bus',props)
  let bus = props.bus;
  if (bus.noBus){
    return(
    <tr>
        <td colSpan="5"> {bus.message} </td>
    </tr>
    );
  }
  else{
  return (
      
          <tr>
            <td><p> { bus.route_id}</p></td>
            <td><p> { bus.arrival_time } </p></td>
            <td><button className= "btn btn-primary" onClick={get_Schedule}> <NavLink to="/schedule" href="#" className="textcolor">Get Schedule</NavLink></button></td>
          </tr>
      
    );}
}