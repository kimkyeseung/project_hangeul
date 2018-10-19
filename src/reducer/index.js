import { cloneDeep } from 'lodash';

import { 
  GET_FONT_DETAIL_FROM_GOOGLE,
  GET_FONTS_LIST_FROM_GOOGLE,
  GET_FONTS_LIST_SUCCESS,
  SET_ADJUSTED_NUMERIC,
  SET_SELECTED_COLOR, 
  OPEN_SIGN_UP_MODAL,
  OPEN_UPLOAD_MODAL,
  OPEN_LOGIN_MODAL,
  SET_EDITED_TEXT,
  START_TEXT_EDIT,
  GET_FONT_DETAIL,
  CALL_BLOCKINFO,
  ADD_TEXTBLOCK,
  AUTHENTICATE,
  LOGOUT
} from '../constants';

const defaultState = {
  isAuthenticated: false,
  user: {
    name: '',
    email: ''
  },
  signUpModal: false,//showSignUpModal
  loginModal: false,//
  uploadModal: false,//
  fontsFromGgl: [],
  fontsDetailFromGgl: {
    variants: []//노멀라이즈: 정규화: 반드시!
  },
  activeTextBlock: 1,
  textBlockData: {
    text: '더블클릭하여 텍스트를 수정하세요',
    editMode: false,
    textBlockHeight: '120px',
    textBlockWidth: '100%',
    textBlockColor: 'black',
    textBlockColorPick: false,
    textBlockFontSize: '60px',
    textBlockFontFamily: 'gothic',
    textBlockFontWeight: 'regular',
    textBlockLineHeight: '120px', 
    textBlockFontStyle: 'normal',
    textBlockTextAlign: 'center',
    textBlockLetterSpace: '0',
    textBlockTextStrokeColor: 'black',
    textBlockTextStrokeColorPick: false,
    textBlockTextStrokeWidth: '0',
    textBlockTextShadowHorizonatal: '0',
    textBlockTextShadowVertical: '0',
    textBlockTextShadowBlur: '0',
    textBlockTextShadowColor: '',
    textBlockTextShadowColorPick: false,
    textBlockMarginTop: '0',
    textBlockMarginRight: '0',
    textBlockMarginBottom: '0',
    textBlockMarginLeft: '0',
    textBlockBackgroundColor: 'rgba(255, 255, 255, 1)',
    textBlockBackgroundColorPick: false,
    textBlockPaddingTop: '10px',
    textBlockPaddingRight: '10px',
    textBlockPaddingBottom: '10px',
    textBlockPaddingLeft: '10px',
  },
  secondTextBlockData: {
    text: '더블클릭하여 텍스트를 수정하세요',
    editMode: false,
    textBlockHeight: '50px',
    textBlockWidth: '100%',
    textBlockColor: 'black',
    textBlockColorPick: false,
    textBlockFontSize: '20px',
    textBlockFontFamily: 'Gothic',
    textBlockFontWeight: 'regular',
    textBlockLineHeight: '50px', 
    textBlockFontStyle: 'normal',
    textBlockTextAlign: 'center',
    textBlockLetterSpace: '0',
    textBlockTextStrokeColor: 'black',
    textBlockTextStrokeColorPick: false,
    textBlockTextStrokeWidth: '0',
    textBlockTextShadowHorizonatal: '0',
    textBlockTextShadowVertical: '0',
    textBlockTextShadowBlur: '0',
    textBlockTextShadowColor: 'black',
    textBlockTextShadowColorPick: false,
    textBlockMarginTop: '20px',
    textBlockMarginRight: '0',
    textBlockMarginBottom: '0',
    textBlockMarginLeft: '0',
    textBlockBackgroundColor: 'rgba(255, 255, 255, 1)',
    textBlockBackgroundColorPick: false,
    textBlockPaddingTop: '1px',
    textBlockPaddingRight: '1px',
    textBlockPaddingBottom: '1px',
    textBlockPaddingLeft: '1px',
  },
  thirdTextBlockData: {
    text: '더블클릭하여 텍스트를 수정하세요',
    editMode: false,
    textBlockHeight: '20px',
    textBlockWidth: '100%',
    textBlockColor: 'black',
    textBlockColorPick: false,
    textBlockFontSize: '15px',
    textBlockFontFamily: 'Gothic',
    textBlockFontWeight: 'regular',
    textBlockLineHeight: '20px', 
    textBlockFontStyle: 'normal',
    textBlockTextAlign: 'center',
    textBlockLetterSpace: '0',
    textBlockTextStrokeColor: 'black',
    textBlockTextStrokeColorPick: false,
    textBlockTextStrokeWidth: '0',
    textBlockTextShadowHorizonatal: '0',
    textBlockTextShadowVertical: '0',
    textBlockTextShadowBlur: '0',
    textBlockTextShadowColor: 'black',
    textBlockTextShadowColorPick: false,
    textBlockMarginTop: '0',
    textBlockMarginRight: '0',
    textBlockMarginBottom: '0',
    textBlockMarginLeft: '0',
    textBlockBackgroundColor: 'rgba(255, 255, 255, 1)',
    textBlockBackgroundColorPick: false,
    textBlockPaddingTop: '1px',
    textBlockPaddingRight: '1px',
    textBlockPaddingBottom: '1px',
    textBlockPaddingLeft: '1px',
  },
  boardData: {
    boardWidth: '1200px',
    boardHeight: '800px',
    boardBackgroundColor: 'white',
    boardBackgroundImage: null,
    boardBorderWidth: '1px',
    boardBorderStyle: 'solid',
    boardBorderColor: 'black',
  },
  blockinfoOn: false
};

const reducer = (state = defaultState, action) => {
  let newState = cloneDeep(state);
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
      return newState;
    }
    case GET_FONT_DETAIL_FROM_GOOGLE: {
      newState.fontsDetailFromGgl = action.font;
      return newState;
    }
    case SET_SELECTED_COLOR: {
      newState[action.locate][action.prop] = `rgba(${action.color.r}, ${action.color.g}, ${action.color.b}, ${action.color.a})`;
      return newState;
    }
    case SET_EDITED_TEXT: {
      newState[action.locate].text = action.input;
      newState[action.locate].editMode = false;
      return newState;
    }
    case START_TEXT_EDIT: {
      newState.textBlockData.editMode = true;
      return newState;
    }
    case SET_ADJUSTED_NUMERIC: {
      newState[action.locate][action.prop] = action.numeric
      return newState;
    }
    case CALL_BLOCKINFO: {
      newState.blockinfoOn = action.locate
      return newState;
    }
    case ADD_TEXTBLOCK: {
      newState.activeTextBlock = newState.activeTextBlock + 1;
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default reducer
