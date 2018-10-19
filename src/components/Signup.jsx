import React, { Component } from 'react';
import { validateEmail, validateUserName, validatePassword } from '../utils/validate';
import { Button, FormControl, Input, InputLabel, Divider } from '@material-ui/core';

const signUpFormStyle = {
  width: '200px',
  backgroundColor: 'white',
  margin: 'auto',
  padding: '20px',
  borderRadius: '4px',
  position: 'relative',
  top: '150px'
}

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValidation: false,
      emailValidation: false,
      passwordValidation: false,
      passwordConfirmValidation: false
    }
  }
  onSignUpClick(ev) {
    ev.preventDefault();
    console.log(ev.target.name.value, ev.target.email.value, ev.target.password.value)
    this.props.signUp({
      name: ev.target.name.value,
      email: ev.target.email.value,
      password: ev.target.password.value
    });
  }

  validate(input, ev) {
    if (input === 'name') {
      this.setState({
        [input]: validateUserName(ev.target.value)
      });
    } else if (input === 'email') {
      this.setState({
        [input]: validateEmail(ev.target.value)
      });
    } else if (input === 'password') {
      this.setState({
        [input]: validatePassword(ev.target.value)
      });
    } else if (input === 'password_confirm') {
      this.setState({
        [input]: document.getElementById('password').value === ev.target.value
      });
    }
  }

  render() {
    return (
        <form className="signup" style={signUpFormStyle} onSubmit={this.onSignUpClick.bind(this)}>
          <h2>회원가입</h2>

          <FormControl>
            <InputLabel htmlFor="name">이름 : </InputLabel>
            <Input
              type="text"
              name="name"
              id="name"
              fullWidth
              onChange={this.validate.bind(this, 'name')}
              error={this.state.nameValidation}
            />
          </FormControl>
          <Divider/>

          <FormControl>
            <InputLabel htmlFor="email">이메일 : </InputLabel>
            <Input 
              type="email" 
              id="email" 
              name="email"
              fullWidth
              onChange={this.validate.bind(this, 'email')}
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
              onChange={this.validate.bind(this, 'password')}
              error={this.state.passwordValidation}
            />
          </FormControl>
          <Divider/>

          <FormControl>
            <InputLabel htmlFor="password">비밀번호 확인 : </InputLabel>
            <Input
              type="password"
              id="password_confirm"
              name="password_confirm"
              fullWidth
              onChange={this.validate.bind(this, 'password_confirm')}
              error={this.state.passwordConfirmValidation}
            />
          </FormControl>
          <Divider/>
          <Button style={{margin: 'auto', marginTop: '20px'}} variant="contained" className="signup-submit" type="submit">회원가입</Button>
        </form>
    );
  }
};

export default Signup
