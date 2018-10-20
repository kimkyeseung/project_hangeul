import React, { Component } from 'react';
import { Button, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Modal } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Signup from './Signup';
import Login from './Login';
import './style/header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignUpModal: false,
      showuploadModal: false,
      openAccountMenu: false
    };
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  }

  handleOpen = context => {
    console.log(this.state[context]);
    this.setState({ [context]: true });
  }

  handleClose = () => {
    this.setState({
      showLoginModal: false,
      showSignUpModal: false,
      showuploadModal: false,
      openAccountMenu: false
    });
  }

  render() {

    //logout={this.props.logout}
    //user={this.props.user}
    return (
      <div>
        <AppBar position="fixed" className="header" color="white">
          <Toolbar>
            <Typography variant="headline" color="inherit" className="logo">
              {/* <Button component={Link} to="/"> */}
              퍼가요
              {/* </Button> */}
            </Typography>
            {(
              <div>
                {
                  this.props.user.name
                    ? <div>
                      <IconButton
                        aria-haspopup="true"
                        aria-owns="authenticated_account"
                        onClick={this.handleMenu}
                        color="inherit"
                      >
                        <Menu
                          id="authenticated_account"
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={this.state.openAccountMenu}
                          onClose={this.handleClose}
                        >

                          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                          <MenuItem onClick={this.handleClose}>My account</MenuItem>
                        </Menu>

                        <AccountCircle />
                      </IconButton>
                    </div>
                    : <div>
                      <Button
                        className="btn-signup"
                        onClick={ev => {
                          this.handleOpen.call(this, 'showSignUpModal')
                        }}>
                        회원가입
                      </Button>
                      <Button
                        className="btn-login"
                        onClick={ev => {
                          this.handleOpen.call(this, 'showLoginModal')
                        }}>
                        로그인
                      </Button>
                      {/* <Modal
                        open={this.state.showSignUpModal}
                        onClose={this.handleClose}
                      >
                        <Signup signUp={this.props.signUp} />
                      </Modal> */}

                      <Modal
                        open={this.state.showLoginModal}
                        onClose={this.handleClose}
                      >
                        <Login login={this.props.login} />
                      </Modal>
                    </div>
                }
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default Header;