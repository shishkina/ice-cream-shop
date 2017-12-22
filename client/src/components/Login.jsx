import React, { Component } from 'react';
import PasswordMask from 'react-password-mask';


class Login extends Component {
  constructor() {
    super();
    this.state = {
    username: '',
    password: '',
    }
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
      <div className="container">
        <form className="edit" onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)}>
          <input type="text" name="username" value={this.state.username} placeholder="username" onChange={this.handleInputChange} />
          <PasswordMask id="password"
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        autoFocus={true}
                        />
          <input type="submit" value="Log in" />
        </form>
      </div>
    )
  }
}

export default Login;
