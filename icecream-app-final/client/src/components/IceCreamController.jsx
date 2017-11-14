import React, { Component } from 'react';

import IceCreamList from './IceCreamList';
import IceCreamSingle from './IceCreamSingle';
import IceCreamForm from './IceCreamForm';

import { Link, Redirect } from 'react-router-dom'

class IceCreamController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.currentPage,
      currentId: props.currentId || null,
      dataLoaded: false,
      allIceCreams: null,
      currentIceCream: null,
      fireRedirect: false,
      redirectPath: null,
    }
    this.iceCreamSubmit = this.iceCreamSubmit.bind(this);
    this.iceCreamDelete = this.iceCreamDelete.bind(this);
  }

  componentDidMount() {
    if (this.state.currentPage === 'index') {
      fetch('/api/icecream')
        .then(res => res.json())
        .then(res => {
          this.setState({
            allIceCreams: res.data.icecreams,
            dataLoaded: true,
          });
        }).catch(err => console.log(err));
    } else if (this.state.currentPage === 'show' || this.state.currentPage === 'edit') {
      fetch(`/api/icecream/${this.state.currentId}`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            currentIceCream: res.data.icecream,
            dataLoaded: true,
          })
        }).catch(err => console.log(err));
    } else if (this.state.currentPage === 'new') {
      this.setState({
        dataLoaded: true,
      })
    }
  }

  iceCreamSubmit(method, event, data, id) {
    event.preventDefault();
    fetch(`/api/icecream/${id || ''}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(res => {
        this.setState({
          fireRedirect: true,
          redirectPath: `/ice-cream/${res.data.icecream.id}`,
        })
      });
  }

  iceCreamDelete(id) {
    fetch(`/api/icecream/${id}`, {
      method: 'DELETE',
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          fireRedirect: true,
          redirectPath: '/ice-cream',
        });
      }).catch(err => console.log(err));
  }

  decideWhichToRender() {
    switch (this.state.currentPage) {
      case 'index':
        return <IceCreamList allIceCreams={this.state.allIceCreams} />;
        break;
      case 'show':
        return <IceCreamSingle icecream={this.state.currentIceCream} iceCreamDelete={this.iceCreamDelete} />;
        break;
      case 'new':
        return <IceCreamForm isAdd={true} iceCreamSubmit={this.iceCreamSubmit} />;
        break;
      case 'edit':
        return <IceCreamForm isAdd={false} iceCreamSubmit={this.iceCreamSubmit} icecream={this.state.currentIceCream} />
        break;
      default:
        return <Redirect push to="/ice-cream" />;
        break;
    }
  }

  render() {
    return (
      <div className="container">
        {(this.state.dataLoaded) ? this.decideWhichToRender() : <p>Loading...</p>}
        {this.state.fireRedirect && <Redirect push to={this.state.redirectPath} />}
      </div>
    )
  }
}

export default IceCreamController;
