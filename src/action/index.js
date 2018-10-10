import { 
  GET_FONTS_LIST_SUCCESS, 
  OPEN_SIGN_UP_MODAL, 
  OPEN_LOGIN_MODAL 
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
