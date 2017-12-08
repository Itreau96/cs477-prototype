import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  LineChart from './LineChart'

class App extends Component {

  // Initializes application with empty containe data
  constructor() {
    super();
    this.state = {
      contData: [],
    };
  }

  componentWillMount() {
    // Set request parameters and self reference
    var url = 'http://localhost:8090/test.json';
    var app = this;

    // Fetch json data from url
    fetch(url)
    // If no data is found at url, throw error
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      // Return response if found
      return response.json();
    })
    // If found, store data in state data array
    .then(function(data) {
      app.setState({ contData: data });
    });
  }

  render() {
    // Pull data from http request
    var size = this.state.contData.bytes;
    const contId = this.state.contData.id;

    // Return app element
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="react-logo" alt="logo" />
          <img src="http://thomasrickard.uk/images/projects/javascript/images/d3-getting-started/thumbnail.svg" className="d3-logo" alt="logo" />
          <h1 className="App-title">Welcome to our React/D3 Prototype Demo</h1>
        </header>
        <LineChart data={[0, 25, 100, 30, 67, 45, 10, 0]} size={[500, 500]}/>
        <h2>Container ID: {contId}</h2>
        <h2>Total bytes: {size}</h2>
      </div>
    );
  }
}
export default App;
