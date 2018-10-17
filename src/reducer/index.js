import { 
  GET_FONT_DETAIL_FROM_GOOGLE,
  GET_FONTS_LIST_FROM_GOOGLE,
  GET_FONTS_LIST_SUCCESS, 
  OPEN_SIGN_UP_MODAL, 
  OPEN_UPLOAD_MODAL,
  OPEN_LOGIN_MODAL,
  GET_FONT_DETAIL,
  AUTHENTICATE,
  LOGOUT
} from '../constants';

const defaultState = {
  isAuthenticated: false,
  user: {
    name: '',
    email: ''
  },
  fonts: [],//안쓰는거 다 지우기..
  fontsPageIndex: 1,
  fontsTotalCount: 0,
  signUpModal: false,//showSignUpModal
  loginModal: false,//
  uploadModal: false,//
  // fontDetail: {
  //   description: '',
  //   designer: '',
  //   display_name: '',
  //   family: '',
  //   monospaced: false,
  //   liked: [],
  //   styles: [],
  //   url: '',
  // },
  fontsFromGgl: [],
  fontsFromGglFamilies: [],
  fontsDetailFromGgl: {
    variants: []//노멀라이즈: 정규화: 반드시!
  }
};

const reducer = (state = defaultState, action) => {
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
    case OPEN_UPLOAD_MODAL: {
      newState.uploadModal = !state.uploadModal;
      return newState;
    }
    case AUTHENTICATE: {
      newState.isAuthenticated = true;
      newState.user.name = action.name;
      newState.user.email = action.email;
      newState.signUpModal = false;
      newState.loginModal = false;
      return newState;
    }
    case LOGOUT: {
      newState.isAuthenticated = false;
      newState.user.name = '';
      newState.user.email = '';
      return newState;
    }
    case GET_FONT_DETAIL: {
      newState.fontDetail = action.fontDetail
      return newState;
    }
    case GET_FONTS_LIST_FROM_GOOGLE: {
      newState.fontsFromGgl = action.fonts;
      newState.fontsFromGglFamilies = action.families
      return newState;
    }
    case GET_FONT_DETAIL_FROM_GOOGLE: {
      newState.fontsDetailFromGgl = action.font;
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default reducer
