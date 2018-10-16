import { connect } from 'react-redux';
import App from '../components/App';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  getFontDetailFromGgl,
  getFontsListSuccess,
  getFontsListFromGgl,
  openSignUpModal,
  openLoginModal,
  openUploadModal,
  authenticate,
  getFontDetail,
  logout
} from '../action';
import { ACCESS_KEY } from '../constants';


const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    fonts: state.fonts,
    fontsPageIndex: state.fontsPageIndex,
    fontsTotalCount: state.fontsTotalCount,
    signUpModal: state.signUpModal,
    loginModal: state.loginModal,
    uploadModal: state.uploadModal,
    fontDetail: state.fontDetail,
    fontsFromGgl: state.fontsFromGgl,
    fontsFromGglFamilies: state.fontsFromGglFamilies,
    fontsDetailFromGgl: state.fontsDetailFromGgl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFontsList({ q, page, limit }) {
      let serverUrl = `http://192.168.0.46:5000/fonts?limit=${limit}&page=${page}`;
      if (q) serverUrl += `&q=${q}`;

      axios.get(serverUrl).then(fonts => {
        dispatch(getFontsListSuccess(fonts.data));
      }).catch(err => {
        console.error(err);
      });
    },

    getFontsListFromGgl() {
      axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${ACCESS_KEY}`).then(result => {
        const fontFromGgl = result.data.items.reduce((accom, val) => {
          if (val.subsets.indexOf('korean') > -1) {
            accom.push(val);
          }
          return accom;
        }, []);
        const families = fontFromGgl.reduce((accom, val) => {
          accom.push(val.family);
          return accom;
        }, []);
        dispatch(getFontsListFromGgl(fontFromGgl, families));
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

    openUploadModal() {
      dispatch(openUploadModal());
    },

    login({email, password}) {
      fetch('http://192.168.0.46:5000/login', {
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
      fetch('http://192.168.0.46:5000/signup', {
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
    },

    upload(formData) {
      fetch('http://192.168.0.46:5000/upload', {
        method: 'POST',
        body: formData
      }).then(res => {
        if (res.status === 200) {
          alert('업로드가 완료되었습니다.');
          console.log(res);
          window.location.reload();
        } else if (res.status === 400) {
          alert('이미 존재하는 폰트입니다.');
        } else if (res.status === 500) {
          alert('서버 오류가 발생하였습니다. 잠시 후 다시 시도해주십시오.');
        }
      }).catch(err => {
        console.error(err);
        alert('오류가 발생하였습니다. 잠시 후 다시 시도해주십시오.')
      });
    },

    getFontDetail(fontname) {
      console.log('get font detail', fontname);
      axios.get(`http://192.168.0.46:5000/font/${fontname}`).then(fontInfo => {
        console.log('get font detail success',fontInfo);
        dispatch(getFontDetail({ fontDetail: fontInfo.data }));
      }).catch(err => {
        console.log('error on get Font detail ',err);
      });
    },

    getFontDetailFromGgl(fontname) {
      axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${ACCESS_KEY}`).then(result => {
        const fontFromGgl = result.data.items.filter(font => font.family === fontname)[0];
        dispatch(getFontDetailFromGgl(fontFromGgl))
      }).catch();
    }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer
