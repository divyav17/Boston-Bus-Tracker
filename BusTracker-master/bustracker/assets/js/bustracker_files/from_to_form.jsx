import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';


function From_To_Form(props) {

  let stops;

  function update(ev) { 
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_SRCDEST_FORM',
      data: data,
    };
    props.dispatch(action);
  }


  function submit(ev) {
    let data = {};
    data['display_flag'] = true;
    let action = {
      type: 'UPDATE_SRCDEST_FORM',
      data: data,
    };
    props.dispatch(action);
    //console.log('This is source and destination', props.srcdest_form) 
    if (props.srcdest_form.source_stop == ""){
       alert('Source cannot be empty')
    }
    else if (props.srcdest_form.source_stop == "" && props.srcdest_form.destination_stop == ""){
      alert('Source and destination cannot be empty, please make a valid selection')
    }
    else if (props.srcdest_form.destination_stop == ""){
      let data = {};
      data['display_flag'] = false;
      let action = {
      type: 'UPDATE_SRCDEST_FORM  ',
      data: data,
      };
    props.dispatch(action);
      api.submit_stop({selected_stop: props.srcdest_form.source_stop})
    }
    else{
    api.submit_src_dest(props.srcdest_form);
    }
  }

  //console.log('In SRC_TO_DESTINATION Props', props)
  // TODO check on preload or on button click? Not sure
  stops = _.map(props.allStops, (uu) => <option value= {uu.stop_id}>{uu.stop_name}</option>);
  
  return(   
    <div className="sourceDest">
      <h4 className="formText">Check for buses arriving at any stop in Boston</h4>
      <FormGroup>
          <div className="formFields">
          <Input type="select" name="source_stop" value={props.srcdest_form.source_stop} onChange={update}>
          <option>Source *</option>
              { stops }
          </Input>
          </div>
          <div className="formFields">
          <Input type="select" required name="destination_stop" value={props.srcdest_form.destination_stop} onChange={update}>
          <option>Destination</option>
              { stops }
          </Input>
          </div>
      </FormGroup>
      <Button onClick={submit} color="primary">Get Buses</Button> &nbsp;
    </div>
    );
}



function state2props(state) {
  return { 
  srcdest_form: state.srcdest_form, 
  allStops: state.allStops,
  };
}

export default connect(state2props)(From_To_Form);