import React, { Component } from 'react';
import './App.css';
import Router from './components/RouterComponent'

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: null,
    }
  }
  render() {
    return (
      <Router />
    );
  }
}

export default App;
