import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const setPosition = (position) => {
  let lat = position.coords.latitude //y
  let long = position.coords.longitude //x

  ReactDOM.render(
    <React.StrictMode>
      <App lat={lat} long={long} />
    </React.StrictMode>,
    document.getElementById('root')
  );

}

const getCurrentLocation = () => {
  console.log("haha")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition,
      (error)=>{ console.error("Error code =" +error.code+"-"+error.message)}
    )
  } else {
    alert("Cannot Use GeoLocation In This Browser")
  }
}

getCurrentLocation()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
