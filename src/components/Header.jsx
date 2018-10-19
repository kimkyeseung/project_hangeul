import React from 'react';
import { Button, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Modal } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle } from '@material-ui/icons';
import Signup from './Signup';
import './style/header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      showloginModal: false,
      showSignUpModal: false,
      showuploadModal: false,
    }
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleOpen = context => {
    this.setState({ [context]: true });
  };

  handleClose = () => {
    this.setState({
      showloginModal: false,
      showSignUpModal: false,
      showuploadModal: false,
    });
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
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            {(
              <div>
                {
                  this.state.user.name
                    ? <div>
                      <Menu
                        id="menu-appbar"
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={false}
                        onClose={this.handleClose}
                      >

                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                      </Menu>
                      <IconButton
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                    </div>
                    : <div>
                      <Button className="btn-signup" onClick={ev => {
                        this.handleOpen.call(this, 'showSignUpModal')
                      }}>회원가입</Button>
                      <Button className="btn-login" onClick={ev => {
                        this.handleOpen.call(this, 'showLoginModal')
                      }}>로그인</Button>
                      <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.showSignUpModal}
                        onClose={this.handleClose}
                      >
                        <Signup signUp={this.props.signUp} />
                        {/* <div style={{width: 500, height: 600, backgroundColor: 'white', margin: 'auto'}}>
                          <Typography variant="h6" id="modal-title">
                            this is sign up
                          </Typography>
                          <Typography variant="subtitle1" id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                          </Typography>
                        </div> */}
                      </Modal>

                      <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.showloginModal}
                        onClose={this.handleClose}
                      >
                        <div style={{left: 50, top: 50}}>
                          <Typography variant="h6" id="modal-title">
                            Text in a login
                          </Typography>
                          <Typography variant="subtitle1" id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                          </Typography>
                        </div>
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
}

export default Header;