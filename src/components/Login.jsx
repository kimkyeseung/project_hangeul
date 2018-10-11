import React, { Component } from 'react';
import { Clear } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import './style/login.css';

class Login extends Component {
  onLoginClick(ev) {
    ev.preventDefault();
    this.props.login({
      email: ev.target.email.value,
      password: ev.target.password.value
    });
  }

  render() {
    return (
      <div className="login-wrap">
        <form className="login" onSubmit={this.onLoginClick.bind(this)}>
          <h2>로그인</h2>
          <Clear className="login-clear" onClick={this.props.openLoginModal}/>
          <label htmlFor="email">이메일 : </label>
          <input type="email" name="email" id="email" required />

          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" id="password" required />
          <Button variant="contained" className="login-submit" type="submit">로그인</Button>
        </form>
      </div>
    );
  }
};

export default Login
