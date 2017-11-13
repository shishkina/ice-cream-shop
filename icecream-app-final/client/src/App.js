import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import IceCreamController from './components/IceCreamController';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Route exact path="/" component={Home} />
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
    );
  }
}

export default App;
