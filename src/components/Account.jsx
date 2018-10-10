import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style/account.css';

class Account extends Component {
  render() {
    let AccountComponent;
    if (this.props.isAuthenticated) {
      AccountComponent = (<div className="account">
        <h2>user</h2>
        <p>name</p>
      </div>)
    } else {
      AccountComponent = (<div className="account">
        <button className="btn btn-signup" onClick={this.props.openSignUpModal}>회원가입</button>
        <button className="btn btn-login" onClick={this.props.openLoginModal}>로그인</button>
      </div>)
    }
    return AccountComponent;
  }
}

export default Account
