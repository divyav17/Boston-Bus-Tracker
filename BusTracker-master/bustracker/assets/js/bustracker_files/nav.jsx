import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { Button } from 'reactstrap';

export default function Nav(props) {
  
  function logout(){
    sessionStorage.clear();
    window.location.reload();
  }  

  return (
    <div className="row navlist">
        <div className="row">
           <div className="col-sm-3 leftnavlinks navright">
            <div className="row">
              <img src="/images/logo.png" className="logo" alt="logo" />
              <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Track</NavLink>
               <p className="showright"><Button onClick={logout} className="">Log Out</Button></p>
           </div>
           </div>
           <div className="col-sm-6 centernavlinks">
           <div className="row">
              <div className="header">BUS TRACKER</div>
           </div> 
           </div>
           <div className="col-sm-3 rightnavlinks">
               <div className="row">
               <div className="col-sm-8">
               <h3>{props.token.user_name}</h3>
               </div>
               <div className="col-sm-4">
               <p><Button onClick={logout} className="">Log Out</Button></p>
               </div>

               </div>
           </div>
        </div>
  
    </div>
  );
}