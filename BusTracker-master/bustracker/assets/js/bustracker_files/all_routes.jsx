import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function All_Routes(props) {

  let stops;
  function update(ev) { 
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    props.dispatch(action);
  }


  function submit(ev) {
    let data = {};
    data['display_flag'] = false;
    let action = {
      type: 'UPDATE_SRCDEST_FORM',
      data: data,
    };
    props.dispatch(action);
    api.submit_stop(props.form);
  }

  
  // TODO check on preload or on button click? Not sure
  if (props.stops_nearby.length > 0){
  stops = _.map(props.stops_nearby, (uu) => <option value = {uu.stop_id}>{uu.stop_name}</option>);}
  
  return(   
    <div className="sourceDest">
      <h4 className="formText">Bus stops less than a mile from you</h4>
      <FormGroup>
           <div className="formFields">
          <Input type="select" name="selected_stop" value={props.form.stop_id} onChange={update}>
          <option>Source*</option>
              { stops }
          </Input>
          </div>
      </FormGroup>
      <Button onClick={submit} color="primary">Lemme Know</Button> &nbsp;
    </div>);
}



function state2props(state) {
  return { 
  form: state.form, 
  stops_nearby: state.stops_nearby,
  };
}

export default connect(state2props)(All_Routes);