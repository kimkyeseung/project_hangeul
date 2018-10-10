import { connect } from 'react-redux';
import App from '../components/App';
import axios from 'axios';
import { 
  getFontsListSuccess,
  openSignUpModal,
  openLoginModal
} from '../action';

const mapStateToProps = state => {
  console.log(state);
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
    getFontsList({q, page, limit}) {
      let serverUrl = `http://localhost:5000/fonts?limit=${limit}&page=${page}`;
      if (q) serverUrl += `&q=${q}`;


      axios.get(serverUrl).then(fonts => {
        console.log(fonts);
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
    }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer
