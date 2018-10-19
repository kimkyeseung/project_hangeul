import { 
  GET_FONTS_LIST_FROM_GOOGLE_SUCCESS,
  CHANGE_SELECTED_COLOR, 
  CHANGE_ADJUSTED_DATA,
  CHANGE_EDITED_TEXT,
  LOGOUT, 
  LOGIN
} from '../constants/actionTypes';

export const login = ({name, email}) => {
  return {
    name,
    type: LOGIN,
    email
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const getFontsListFromGgl = (fonts) => {
  return {
    type: GET_FONTS_LIST_FROM_GOOGLE_SUCCESS,
    fonts
  };
};

export const colorPickHandler = (color, locate, prop) => {
  return {
    type: CHANGE_SELECTED_COLOR,
    color,
    locate,
    prop
  };
};

export const textEditHandler = (locate, input) => {
  return {
    type: CHANGE_EDITED_TEXT,
    locate,
    input
  }
};

export const dataAdjustHandler = (data, locate, prop) => {
  return {
    type: CHANGE_ADJUSTED_DATA,
    data,
    locate,
    prop
  };
};
