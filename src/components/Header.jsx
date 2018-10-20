import React, { Component } from 'react';
import { Button, AppBar, Toolbar, Divider, Typography, IconButton, Menu, MenuItem, Modal } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
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
      anchor: null
    };
  }

  handleChange(event) {
    this.setState({ auth: event.target.checked });
  }

  handleOpen(context) {
    this.setState({ [context]: true });
  }

  handleMenuOpen(ev) {
    console.log(ev.currentTarget);
    this.setState({
      anchor: ev.currentTarget
    })
  }

  handleClose() {
    this.setState({
      showLoginModal: false,
      showSignUpModal: false,
      showuploadModal: false,
      anchor: null
    });
  }

  idGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

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
            <Divider/>
            {(
              <div>
                {
                  this.props.user.name
                    ? <div style={{position: 'relative'}}>
                      <IconButton
                        aria-haspopup="true"
                        aria-owns="authenticated_account"
                        onClick={this.handleMenuOpen.bind(this)}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="authenticated_account"
                        // anchorOrigin={{
                        //   vertical: 'top',
                        //   horizontal: 'right',
                        // }}
                        // transformOrigin={{
                        //   vertical: 'top',
                        //   horizontal: 'right',
                        // }}
                        anchorEl={this.state.anchor}
                        open={this.state.anchor}
                        onClose={this.handleClose.bind(this)}
                        >
                        <MenuItem onClick={this.handleClose.bind(this)}>My Page</MenuItem>
                        <MenuItem onClick={this.handleClose.bind(this)}>
                          <Link to={`/tryout/${this.idGenerate()}`}>
                            Tryout
                            </Link>
                        </MenuItem>
                      </Menu>
                      {this.props.user.name}님
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
                      <Modal
                        open={this.state.showSignUpModal}
                        onClose={this.handleClose.bind(this)}
                      >
                        <Signup signUp={this.props.signUp} />
                      </Modal>

                      <Modal
                        open={this.state.showLoginModal}
                        onClose={this.handleClose.bind(this)}
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