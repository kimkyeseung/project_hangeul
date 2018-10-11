import { connect } from 'react-redux';
import App from '../components/App';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  getFontsListSuccess,
  openSignUpModal,
  openLoginModal,
  authenticate,
  logout
} from '../action';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    fonts: state.fonts,
    fontsPageIndex: state.fontsPageIndex,
    fontsTotalCount: state.fontsTotalCount,
    signUpModal: state.signUpModal,
    loginModal: state.loginModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFontsList({ q, page, limit }) {
      let serverUrl = `http://localhost:5000/fonts?limit=${limit}&page=${page}`;
      if (q) serverUrl += `&q=${q}`;

      axios.get(serverUrl).then(fonts => {
        dispatch(getFontsListSuccess(fonts.data));
      }).catch(err => {

        console.error(err);
      });
    },

    openSignUpModal() {
      dispatch(openSignUpModal());
    },

    openLoginModal() {
      dispatch(openLoginModal());
    },

    login({email, password}) {
      fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { "Content-Type": "application/json" }
      }).then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            jwt.verify(data.token, 'KimKyeseung!', (err, decode) => {
              dispatch(authenticate({ name: decode.name, email: decode.email }))
            });
          }).catch(err => {
            console.error(err);
          });
        } else {
          alert('로그인 정보가 올바르지 않습니다.');
        }
      }).catch(err => {
        console.error(err);
      })

    },

    signUp({name, email, password}) {
      fetch('http://localhost:5000/signup', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        if (res.status === 400) {
          alert('이미 가입된 이메일이 존재합니다.');
          return;
        } else if (res.status === 201) {
          dispatch(authenticate({ name: name, email: email }));
        } else {
          alert('오류가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다.');
        }
      });
    },

    logout() {
      dispatch(logout());
    }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer
