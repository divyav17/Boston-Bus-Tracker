import store from './store';

class TheServer {
  // GETS ALL THE USERS 
  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  // GETS THE BUS AT THE BUSSTOP 
  // TODO RENAME
  submit_stop(data){
    $.ajax("api/v1/stop_names", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'BUS_LIST',
          buslist: resp.buslist,
        });
      },
    });
  }


  // GETS THE BUS AT THE SOURCE BUSSTOP 
  // AND DETINATION BUS STOP
  submit_src_dest(data){
    //console.log('IN SOURCE DESTINATION',data)
    $.ajax("api/v1/stop_names", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'CUSTOM_BUS_LIST',
          buses: resp.buses,
        });
      },
    });
  }

  // Gets the stop that the user requested (In case there are multiple
  // there he might choose to see schedule of other bus-stop nearby)
  nearest_stops(data) {
    $.ajax("api/v1/stop_names", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'NEARBY_STOPS',
          nearby_stops: resp.nearby_stops,
        });
      },
    });
  }

  // GETS ALL THE STOPS NAME IN MBTA TO BE USED FOR 
  // SOURCE AND DESTINATION
  request_allStops(data) {
    $.ajax("api/v1/stop_names", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'STOPS_LIST',
          allStops: resp.allStops,
        });
      },
    });
  }

  get_schedule(data) {
    $.ajax("api/v1/stop_names", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SCHEDULE',
          schedule: resp.schedule,
        });
      },
    });
  }  

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      error: (resp) => {
        store.dispatch({
          type: 'ERROR_MSG',
          error_msg: resp.responseJSON.msg,
        });
      }
    });
  }


  google_login(data){
    let token = {"user_name": data.profileObj.givenName, "user_id": data.profileObj.googleId,
     "token": data.tokenId}
    store.dispatch({
      type: 'SET_TOKEN',
      token: token,
    });
  }

  // TO DISCUSS ABOUT MAPS AND DELETE
  request_coordinate_busstops(){
    store.dispatch({
      type: 'SET_COORDINATE',
      token: null,
    });
  }

  submit_user(data) {
      $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ user: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ERROR_MSG',
          error_msg: "User Created Successfully, Please log in again",
        });
      },
    });
  } 
}

export default new TheServer();