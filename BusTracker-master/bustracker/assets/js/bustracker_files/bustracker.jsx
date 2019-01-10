import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { Button } from 'reactstrap';
import Nav from './nav';
import All_Routes from './all_routes';
import All_Bus from './all_bus';
import Login from './login';
import Schedules from './schedules';
import Src_To_Des from './from_to_form';
import api from '../api';
import Map from './map'
import Custom_Bus from './custom_bus'
import Custom_Schedule from './custom_schedule'

export default function bustracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <BusTracker state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
    //console.log('this works',store.getState().latitude)
  );
}

let BusTracker = connect((state) => state)((props) => { 
	//console.log('this is bustracker',props)
  let stops;
  if (props.stops_nearby.length > 0){
  stops = _.map(props.stops_nearby, (uu) => <option>{uu}</option>);}


  function printErrorMsg(){
   // console.log("<=================>")
    //console.log(props.error_msg)
    if((props.error_msg != null)){
      return(<div>
        <p> {props.error_msg} </p>
      </div>);
    }
  }


  let table;
  //console.log('This is inside props',props)
  if (props.srcdest_form.display_flag == true){
  		table = <Custom_Bus busses={props.custom_bus_list}/>
  }else{
  		if(props.bus_list.length!=0)
  
    {
  
                 table = <All_Bus busses={props.bus_list} stop={props.form.selected_stop} />
  
   }
  }
  if (props.token == null){
  	return (
      <Router>
        <div className="row"> 

        <div className="col-sm-3">
        </div>
        <div className="col-sm-6">
        <div className="mainHeader">BUS TRACKER</div>
          {printErrorMsg()}
          <Login />
        </div>
        <div className="col-sm-3">
        </div>
        </div>
      </Router>
    );
  }
  else{
  	return (
    	<Router>
        	<div className="container-fluid">
          	<Nav token={props.token}/>
			<Route path="/" exact={true} render={() => 
			<div className="row mainrow">
				<div className="col-md-4">
					<div className = "row shiftright">

                                      
 
                                       <All_Routes />
 
         </div>
  
         <div className="row mainrow">
 
         <p className="orText">OR</p>
  
         </div>
  
         <div className = "row mainrow">
  
         <Src_To_Des />
  
       
 
         </div>
				</div>
					<div className="col-md-8 goright">
						<div className="container">

		            		<div className = "row">
		            			{ table }
		            		</div>
		            		<div className="row mainrow">
	                  			<Map latitude={props.latitude} longitude={props.longitude}/>
	            			</div>
	            		</div>
		          	</div>
	        </div>
			} />
          	<Route path="/schedule" exact={true} render={() =>
           	 <Schedules schedule={props.schedule} />
          	} />
            <Route path="/customschedule" exact={true} render={() =>
             <Custom_Schedule bus={props.custom_schedule} />
            } />
        	</div>
    	</Router>
  	);
  }	


});