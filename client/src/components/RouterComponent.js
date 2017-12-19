import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import IceCreamController from './IceCreamController';



const RouterComponent = (props) => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
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
