import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import IceCreamController from './IceCreamController';



const RouterComponent = (props) => {
  return (
    <Router>
      <div className="App">
        <Header logout={props.logout}
                userState={props.userState}
              />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/register" render={() => (
            props.userState.auth ?
            <Redirect to="/" />
            : <Register handleRegisterSubmit={props.handleRegisterSubmit} />
          )} />
          <Route exact path="/login" render={() => (
            props.userState.auth ?
            <Redirect to='/dashboard' />
            : <Login handleLoginSubmit={props.handleLoginSubmit} />

          )} />
          <Route exact path="/logout" render={() => (
            <Redirect to='/' />
          )} />
          <Route exact path="/dashboard" render={() => (
            !props.userState.auth ?
            <Redirect to='/login' />
            : <Redirect to='/ice-cream' />
          )} />
          <Route exact path="/ice-cream"
            render={() => <IceCreamController currentPage="index" />}
          />
          <Route exact path="/new" render={() => (<IceCreamController currentPage="new" />)} />
          <Route exact path="/ice-cream/edit/:id"
            render={props => (<IceCreamController
              currentPage="edit" currentId={props.match.params.id} />)}
          />
          <Route exact path="/ice-cream/:id"
            render={props => (<IceCreamController
              currentPage="show" currentId={props.match.params.id} />)}
          />
        </div>
        <Footer />
      </div>
    </Router>
  )
}


export default RouterComponent;
