import React from 'react';
import { connect } from 'react-redux';
import api from '../api';
import { Link } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';





let LoginForm = connect(({login}) => {return {login};})((props) => {


//console.log("this is the props",props);



  function on_clickLoginButton(ev){
    let data = {};
    data['display_flag'] = true;
    $('.tab a').on('click', function (e) {
      e.preventDefault();
      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');
    });

    let action = {
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    };
    props.dispatch(action);
  }

    function on_clickSignUpButton(ev){
    let data = {};
    data['display_flag'] = false;

    $('.tab a').on('click', function (e) {
  
    e.preventDefault();
  
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
  });


    let action = {
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function update(ev) { 

    $('.form').find('input, textarea').on('keyup blur focus', function (e) {  
  var $this = $(this),
      label = $this.prev('label');
    if (e.type === 'keyup') {
      if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
      if( $this.val() === '' ) {
        label.removeClass('active highlight'); 
      } else {
        label.removeClass('highlight');   
      }   
    } else if (e.type === 'focus') {
      if( $this.val() === '' ) {
        label.removeClass('highlight'); 
      } 
      else if( $this.val() !== '' ) {
        label.addClass('highlight');
      }
    }
  });
  let tgt = $(ev.target);
  let data = {};
  data[tgt.attr('name')] = tgt.val();
  props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }
 
  
  function create_token(ev) {
    //console.log("in create token");
    api.submit_login(props.login);
    //console.log(props.login);
  }

  //attribution = https://stackoverflow.com/questions/16424659check-if-a-string-contains-an-email-address
  function checkIfEmailInString(text) { 
    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
  }

  function create_user(ev) {
    
    if (props.login.new_user_name == ""){
      alert('Name cannot be blank, Please enter name')
    }
    else if (props.login.new_user_email == "" || !checkIfEmailInString(props.login.new_user_email)){
      alert('Please enter a valid email id')
    }
    else if (props.login.new_user_pass == "" || props.login.new_user_pass.length < 8){
      alert('Please enter atleast 8 digits for password')
    }
    else if (props.login.new_user_confpass != props.login.new_user_pass){
      alert('The password entered do not match')
    }
    else if (props.login.new_user_mob == ""){
      alert('Please enter your mobile number')
    }
    else {
      //console.log("in create user");
      let data = {};
      data['display_flag'] = true;
        props.dispatch({
        type: 'UPDATE_LOGIN_FORM',
        data: data,
      });
      api.submit_user(props.login);
      alert('User Created Successfully')
    }
  }

  const responseGoogle = (response) => {
  //console.log(response);
  api.google_login(response);
  }

  const FailresponseGoogle = (response) => {
  //console.log('Pop Up Closed');
  }

  var FontAwesome = require('react-fontawesome');
  return(
  <div className="mainContent">
    <div className="form">

      <ul className="tab-group">
        <li className="tab"><a onClick={on_clickSignUpButton}>Sign Up</a></li>
        <li className="tab active"><a onClick={on_clickLoginButton}>Sign In</a></li>
      </ul>

          

          <div className="tab-content">
            {props.login.display_flag ?
               <div id="login">   
              <h4>Welcome Back!</h4>

              <Form>
              <FormGroup>
              
                <div className="field-wrap">
                <label>
                  Email Address<span className="req">*</span>
                </label>
                <input type="email"required autoComplete="off" name="email" value={props.login.email} onChange={update}/>
                </div>
              
                <div className="field-wrap">
                <label>
                  Password<span className="req">*</span>
                </label>
                <input type="password"required autoComplete="off" name="password" value={props.login.password} onChange={update}/>
                </div>
              
              
                <Button onClick={create_token} className="button button-block">Log In</Button>
              
              </FormGroup>
              </Form>
            </div> 
            :

            <div id="signup">   
              <h4>Sign Up for Free</h4>
              
              <FormGroup>                       
                <div className="field-wrap">
                  <label>
                    Full Name<span className="req">*</span>
                  </label>
                  <input type="text"required autoComplete="off" name="new_user_name" value={props.login.new_user_name} onChange={update}/>
                </div>
              

              <div className="field-wrap">
                <label>
                  Email Address<span className="req">*</span>
                </label>
                <input type="email"required autoComplete="off" name="new_user_email" value={props.login.new_user_email} onChange={update}/>
              </div>
              
              <div className="field-wrap">
                <label>
                  Set A Password<span className="req">*</span>
                </label>
                <input type="password"required autoComplete="off" name="new_user_pass" value={props.login.new_user_pass} onChange={update}/>
              </div>

              <div className="field-wrap">
                <label>
                  Confirm Password<span className="req">*</span>
                </label>
                <input type="password"required autoComplete="off" name="new_user_confpass" value={props.login.new_user_confpass} onChange={update}/>
              </div>

              <div className="field-wrap">
                <label>
                  Mobile Number<span className="req">*</span>
                </label>
                <input type="text" autoComplete="off" name="new_user_mob" value={props.login.new_user_mob} onChange={update}/>
              </div>
              
              <button type="submit" className="button button-block" onClick={create_user}>Get Started</button>
              
              </FormGroup>

            </div> 

            }

            <p className="googleButton">
            <GoogleLogin
             clientId={'142216964769-fcocsa3vmgk2l42komovekb65l93uhaf.apps.googleusercontent.com'}
             onSuccess={responseGoogle}
             onFailure={FailresponseGoogle}>
             <p className="loginBtn loginBtn--google">Login with Google</p>
            </GoogleLogin>
            </p>

            </div> 

            </div>

            </div>






  /* <div style={{padding: "4ex"}}>
    <h3>Login</h3>
    <FormGroup>
      <Label> User Email </Label>
      <Input type="email" name="email" placeholder="example@dot.com" value={props.login.email} onChange={update}/>
      <Label> Enter Password </Label>
      <Input type="password" name="password" placeholder="**password**" value={props.login.password} onChange={update}/>
    </FormGroup>
    <Button onClick={create_token} color="primary">Log In</Button> &nbsp;
    <div className="form">

      <ul className="tab-group">
        <li className="tab"><a onClick={on_clickSignUpButton}>Sign Up</a></li>
        <li className="tab active"><a onClick={on_clickLoginButton}>Sign In</a></li>
      </ul>
      </div>

  <GoogleLogin
    clientId={'1006692023654-ii7vqsoj0l55hqtkpulvifvr43tdj02l.apps.googleusercontent.com'}
    onSuccess={responseGoogle}
    onFailure={FailresponseGoogle}>
    <FontAwesome
      className='google'
    />
    <span> Login with Google</span>
  </GoogleLogin>  </div>*/ 
  );
});



function Login(props) {

  	let session_info;
  	session_info = <LoginForm />

  	return (
  		<div>
  		{session_info}
  		</div>
  	);
  }

function state2props(state) {
  return { 
  	token: state.token,
  };
}

// Export the result of a curried function call.
export default connect(state2props)(Login);