import React from 'react';
import ReactDOM from 'react-dom';

export default function Timer(props) {
	//console.log("TIMER BLOCK REACHED.....");
	return (
      <div>
      	<h1> Time </h1>
      	<p> {new Date().toLocaleString()} </p>
      </div>
      
    );
}
