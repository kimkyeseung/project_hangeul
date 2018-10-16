import { 
  GET_FONTS_LIST_SUCCESS, 
  OPEN_SIGN_UP_MODAL,
  OPEN_UPLOAD_MODAL, 
  OPEN_LOGIN_MODAL,
  GET_FONT_DETAIL,
  AUTHENTICATE,
  LOGOUT 
} from '../constants';

export const getFontsListSuccess = fontsList => {
  return {
    type: GET_FONTS_LIST_SUCCESS,
    fontsList
  };
};

export const openSignUpModal = () => {
  return {
    type: OPEN_SIGN_UP_MODAL
  };
};

export const openLoginModal = () => {
  return {
    type: OPEN_LOGIN_MODAL
  };
};

export const openUploadModal = () => {
  return {
    type: OPEN_UPLOAD_MODAL
  };
};

export const authenticate = ({name, email}) => {
  return {
    type: AUTHENTICATE,
    name,
    email
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const getFontDetail = (result) => {
  return {
    type: GET_FONT_DETAIL,
    fontDetail: result
  };
};