import React, { Component } from 'react';

class IceCreamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flavor: props.icecream ? props.icecream.flavor : '',
      description: props.icecream ? props.icecream.description : '',
      rating: props.icecream ? props.icecream.rating : '',
      url: props.icecream ? props.icecream.url : '',
      brand: props.icecream ? props.icecream.brand : '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val,
    });
  }

  render() {
    return (
      <div className="add">
      <form className={this.props.isAdd ? 'addform' : 'editform'}
        onSubmit={this.props.isAdd
            ? e => this.props.iceCreamSubmit('POST', e, this.state)
            : e => this.props.iceCreamSubmit('PUT', e, this.state, this.props.icecream.id)}>
        <input type="text" name="flavor" placeholder="Flavor" value={this.state.flavor} onChange={this.handleInputChange} />
        <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleInputChange} />
        <input type="text" name="rating" placeholder="rating" value={this.state.rating} onChange={this.handleInputChange} />
        <input type="text" name="url" placeholder="url" value={this.state.url} onChange={this.handleInputChange} />
        <input type="text" name="brand" placeholder="brand" value={this.state.brand} onChange={this.handleInputChange} />
        <input type="submit" value={this.props.isAdd ? 'Add it!' : 'Edit it!'} />
      </form>
      </div>
    );
  }
}

export default IceCreamForm;
