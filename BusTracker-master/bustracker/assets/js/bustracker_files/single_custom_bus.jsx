import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import api from '../api';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../store';
import { connect } from 'react-redux';

function SingleCustomBus(props) {
  function get_Schedule(){
      //console.log('I am coming in single custom bus',props)
      let data = {};
      data['custom_schedule'] = props.bus;
      let action = {
      type: 'UPDATE_CUSTOM_SCHEDULE',
      data: data,
    };
    props.dispatch(action);
  }

  //console.log('this is bus',props)
  let bus = props.bus;
  if (bus.noBus){
    return(
    <tr>
        <td colSpan="6"> {bus.message} </td>
    </tr>
    );
  }
  else{
  return (
      
          <tr>
            <td><p> { bus[0].route_id}</p></td>
            <td><p> { bus[0].arrival_time } </p></td>
            <td><p>{ bus[0].stopName } </p></td>
            <td><p>{ bus[bus.length - 1].stopName } </p></td>
            <td><p>{ bus[bus.length -1 ].arrival_time } </p></td>
            <td><button className= "btn btn-primary"onClick={get_Schedule}> <NavLink to="/customschedule" href="#" className="textcolor">Get Schedule</NavLink> </button></td>
          </tr>
    );}
}



function state2props(state) {
  return { 
  form: state.form, 
  };
}

export default connect(state2props)(SingleCustomBus);