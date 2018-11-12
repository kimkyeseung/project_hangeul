import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from '../components/App';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  getFontsListFromGgl,
  colorPickHandler,
  dataAdjustHandler,
  textEditHandler,
  logout,
  login
} from '../action';
import { ACCESS_KEY } from '../config';


const mapStateToProps = state => {
  return {
    user: state.user,
    fontDetail: state.fontDetail,
    fontsFromGgl: state.fontsFromGgl,
    fontsDetailFromGgl: state.fontsDetailFromGgl,
    activeTextBlock: state.activeTextBlock,
    textBlockData: state.textBlockData,
    secondTextBlockData: state.secondTextBlockData,
    thirdTextBlockData: state.thirdTextBlockData,
    boardData: state.boardData,
    blockinfoOn: state.blockinfoOn
  };
};

const mapDispatchToProps = dispatch => {
  return {

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

    login({email, password}) {
      fetch('http://api-dev.pergayo.com/login', {
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
              dispatch(login({ name: decode.name, email: decode.email }))
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
      fetch('http://api-dev.pergayo.com/signup', {
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
          dispatch(login({ name: name, email: email }));
        } else {
          alert('오류가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다.');
        }
      });
    },

    logout() {
      dispatch(logout());
    },

    upload(formData) {
      fetch('http://api-dev.pergayo.com/upload', {
        method: 'POST',
        body: formData
      }).then(res => {
        if (res.status === 200) {
          alert('업로드가 완료되었습니다.');
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

    colorPickHandler(rgb, locate, prop) {
      dispatch(colorPickHandler(rgb, locate, prop));
    },

    textEditHandler(locate, input) {
      dispatch(textEditHandler(locate, input));
    },

    dataAdjustHandler(numeric, locate, prop) {
      dispatch(dataAdjustHandler(numeric, locate, prop));
    }
  };
};

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default AppContainer
