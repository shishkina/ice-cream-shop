import React, { Component } from 'react';
import './App.css';
import Router from './components/RouterComponent';
import Error from './components/Error';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: null,
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch('/api/auth/verify', { credentials: 'include' })
      .then(res => res.json())
      .then(res => {
        this.setState({
          auth: res.auth,
          user: res.data.user,
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: err,
          message: 'You need to log in to proceed',
        })
      });
  }

  handleLoginSubmit(e, data) {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        auth: res.auth,
        user: res.data.user,
      })
    })
    .catch(err => {
      console.log(err, 'thsis is error');
      this.setState({
        error: err,
        message: 'Wrong credentials!',
      })
    });
  }
  handleRegisterSubmit(e, data){
    e.preventDefault();
    fetch(`/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res, 'response from register');
      this.setState({
        auth: res.auth,
        user: res.data.user,
      })
    })
    .catch(err => {
      this.setState({
        error: err,
        message: 'OOoOoOOPS, something went wrong!'
      })

    });
  }
  logout() {
    fetch(`api/auth/logout`, {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        auth: res.auth,
        user: res.data.user
      })
    })
    .catch(err => console.log(err));
  }
  render() {
    console.log(this.state.error, 'oooops');
     return (
       this.state.error ?
        <Error message={this.state.message}/>
        : <Router userState={this.state}
                         handleLoginSubmit={this.handleLoginSubmit}
                         handleRegisterSubmit={this.handleRegisterSubmit}
                         logout={this.logout} />
      )
  }
}

export default App;
