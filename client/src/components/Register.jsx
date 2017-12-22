import React, { Component } from 'react';
import PasswordMask from 'react-password-mask';

class Register extends Component {
  constructor() {
    super();
    this.state = {
    username: '',
    email: '',
    password: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    console.log(name, val);
    this.setState({
      [name]: val,
    });
  }
  render() {
    return (
      <div className="container">
        <form className="add" onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
          <input type="text" name="username" placeholder="username" onChange={this.handleInputChange} />
          <input type="text" name="email" placeholder="email"  onChange={this.handleInputChange} />
          <PasswordMask id="password"
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        autoFocus={true}
          />
          <input type="submit" value="Register"/>
        </form>
      </div>
    )
  }
}

export default Register;
