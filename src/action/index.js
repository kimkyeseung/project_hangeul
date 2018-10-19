import { 
  GET_FONT_DETAIL_FROM_GOOGLE,
  GET_FONTS_LIST_FROM_GOOGLE,
  GET_FONTS_LIST_SUCCESS,
  SET_ADJUSTED_NUMERIC,
  SET_SELECTED_COLOR, 
  OPEN_SIGN_UP_MODAL,
  OPEN_UPLOAD_MODAL, 
  OPEN_LOGIN_MODAL,
  START_TEXT_EDIT,
  SET_EDITED_TEXT,
  GET_FONT_DETAIL,
  CALL_BLOCKINFO,
  ADD_TEXTBLOCK,
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

export const getFontDetail = result => {
  return {
    type: GET_FONT_DETAIL,
    fontDetail: result
  };
};

export const getFontsListFromGgl = (fonts, families) => {
  return {
    type: GET_FONTS_LIST_FROM_GOOGLE,
    fonts,
    families
  };
} ;

export const getFontDetailFromGgl = font => {
  return {
    type: GET_FONT_DETAIL_FROM_GOOGLE,
    font
  };
};

export const colorPickHandler = (color, locate, prop) => {
  console.log('action', color, locate, prop);
  return {
    type: SET_SELECTED_COLOR,
    color,
    locate,
    prop
  };
};

export const textEditHandler = (locate, input) => {
  return {
    type: SET_EDITED_TEXT,
    locate,
    input
  }
};

export const textEditStart = () => {
  return {
    type: START_TEXT_EDIT
  };
};

export const numberAdjustHandler = (numeric, locate, prop) => {
  return {
    type: SET_ADJUSTED_NUMERIC,
    numeric,
    locate,
    prop
  };
};

export const callBlockinfo = locate => {
  return {
    type: CALL_BLOCKINFO,
    locate
  };
};

export const addTextBlock = () => {
  return {
    type: ADD_TEXTBLOCK
  };
};
