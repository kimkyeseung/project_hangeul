import React, { Component } from 'react';
import { validateEmail, validateUserName } from '../utils/validate';
import './style/signup.css';

class Signup extends Component {
  render() {
    return (
      <div className="signup-wrap" onClick={this.props.openSignUpModal}>
        <form action="" className="signup">
          <h2>회원가입</h2>
          <label htmlFor="name">이름 : </label>
          <input type="text" name="name" id="name" onBlur={ev => {
            if (!ev.target.value) return;
            if (!validateUserName(ev.target.value)) {
              ev.target.value = "";
            }
          }} required />
          <p className="signup-message">올바르지 않은 이름 형식입니다.</p>

          <label htmlFor="email">이메일 : </label>
          <input type="email" name="email" id="email" onBlur={(ev) => {
            if (!ev.target.value) return;
            if (!validateEmail(ev.target.value)) {
              ev.target.value = "";
            }
          }} required />
          <p className="signup-message">올바르지 않은 이메일 형식입니다.</p>

          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" id="password" required />
          <p className="signup-message">비밀번호는 최소 6자 이상, 영문 대소문자와 숫자, 특수문자가 섞여있어야 합니다.</p>

          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" id="password" required />
          <p className="signup-message">입력하진 비밀번호와 일치하지 않습니다.</p>
          <button type="submit">회원가입</button>
        </form>
      </div>
    );
  }
};

export default Signup