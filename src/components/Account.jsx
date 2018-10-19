import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './style/account.css';

class Account extends Component {
  render() {
    let AccountComponent;
    if (this.props.isAuthenticated) {
      AccountComponent = (<div className="account">
        <h2>{this.props.user.name}</h2>
        <Button className="btn-about" >폰트 업로드</Button>
        <Button className="btn-logout" onClick={this.props.logout}>로그아웃</Button>
      </div>)
    } else {
      AccountComponent = (<div className="account">
        <Button className="btn-signup" onClick={this.props.openSignUpModal}>회원가입</Button>
        <Button className="btn-login" onClick={this.props.openLoginModal}>로그인</Button>
      </div>)
    }
    return AccountComponent;
  }
}

export default Account
