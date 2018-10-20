import React, { Component } from 'react';
import { Button, FormControl, Input, InputLabel, Divider } from '@material-ui/core';
import { validateEmail } from '../utils/validate';
// import './style/login.css';

const loginFormStyle = {
  width: '200px',
  backgroundColor: 'white',
  margin: 'auto',
  padding: '20px',
  borderRadius: '4px',
  position: 'relative',
  top: '150px'
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValidation: false,
    };
  }

  onLoginClick(ev) {
    ev.preventDefault();
    this.props.login({
      email: ev.target.email.value,
      password: ev.target.password.value
    });
  }

  validate(ev) {
    this.setState({
      email: validateEmail(ev.target.value)
    });
  }

  render() {
    return (
        <form className="login" style={loginFormStyle} onSubmit={this.onLoginClick.bind(this)}>
          <h2>로그인</h2>

          <FormControl>
            <InputLabel htmlFor="name">이메일 : </InputLabel>
            <Input
              type="email" 
              id="email" 
              name="email"
              fullWidth
              required
              onChange={this.validate.bind(this)}
              error={this.state.emailValidation}
            />
          </FormControl>
          <Divider/>
          <FormControl>
            <InputLabel htmlFor="password">비밀번호 : </InputLabel>
            <Input
              type="password"
              id="password"
              name="password"
              fullWidth
              required
            />
          </FormControl>
          <Button variant="contained" className="login-submit" type="submit">로그인</Button>
        </form>
    );
  }
};

export default Login
