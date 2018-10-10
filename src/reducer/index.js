import { 
  GET_FONTS_LIST_SUCCESS, 
  OPEN_SIGN_UP_MODAL, 
  OPEN_LOGIN_MODAL 
} from '../constants';

const defaultState = {
  isAuthenticated: false,
  user: {
    name: '',
    email: ''
  },
  fonts: [],
  fontsPageIndex: 1,
  fontsTotalCount: 0,
  signUpModal: false,
  loginModal: false
};

const reducer = (state = defaultState, action) => {
  console.log('reducer');
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_FONTS_LIST_SUCCESS: {
      newState.fonts = action.fontsList.fonts;
      newState.page = action.fontsList.page;
      newState.total_count = action.fontsList.total_count;
      return newState;
    }
    case OPEN_SIGN_UP_MODAL: {
      newState.signUpModal = !state.signUpModal;
      return newState;
    }
    case OPEN_LOGIN_MODAL: {
      newState.loginModal = !state.loginModal;
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default reducer
