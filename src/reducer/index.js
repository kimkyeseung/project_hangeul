import { cloneDeep } from 'lodash';

import { 
  GET_FONTS_LIST_FROM_GOOGLE_SUCCESS,
  CHANGE_ADJUSTED_DATA,
  CHANGE_SELECTED_COLOR, 
  CHANGE_EDITED_TEXT,
  LOGOUT,
  LOGIN
} from '../constants/actionTypes';

const defaultState = {
  user: {
    name: '',
    email: ''
  },
  fontsFromGgl: [],
  textBlockData: {
    text: '더블클릭하여 텍스트를 수정하세요',
    editMode: false,
    textBlockHeight: '120px',
    textBlockWidth: '100%',
    textBlockColor: 'rgba(0, 0, 0, 1)',
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
    text: `별 하나에 추억(追憶)과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경(憧憬)과 별 하나에 시(詩)와 별 하나에 어머니, 어머니\n
    어머님, 나는 별 하나에 아름다운 말 한마디씩 불러봅니다 소학교(小學校) 때 책상(冊床)을 같이 했든 아이들의 이름과, 패(佩), 경(鏡), 옥(玉)\n
    이런 이국(異國) 소녀(少女)들의 이름과, 벌써 아기 어머니 된 계집애들의 이름과 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새,\n
    노루, “프랑시스 · 잠” “라이너 · 마리아 · 릴케” 이런 시인(詩人)들의 이름을 불러봅니다.\n
    이네들은 너무나 멀리 있읍니다. 별이 아슬이 멀듯이, 어머님, 그리고 당신은 멀리 북간도(北間島)에 게십니다.\n
    나는 무엇인지 그리워 이 많은 별빛이 나린 언덕 우에 내 이름자를 써 보고, 흙으로 덮어 버리었읍니다.\n
    딴은 밤을 새워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다.\n
    그러나 겨울이 지나고 나의 별에도 봄이 오면 무덤우에 파란 잔디가 피어나듯이 내 이름자 묻힌 언덕우에도 자랑처럼 풀이 무성할게외다.`,
    editMode: false,
    textBlockHeight: '200px',
    textBlockWidth: '100%',
    textBlockColor: 'rgba(0, 0, 0, 1)',
    textBlockColorPick: false,
    textBlockFontSize: '16px',
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
    textBlockMarginTop: '20px',
    textBlockMarginRight: '0',
    textBlockMarginBottom: '0',
    textBlockMarginLeft: '0',
    textBlockBackgroundColor: 'rgba(0, 200, 200, 1)',
    textBlockBackgroundColorPick: false,
    textBlockPaddingTop: '1px',
    textBlockPaddingRight: '1px',
    textBlockPaddingBottom: '1px',
    textBlockPaddingLeft: '1px',
  },
  thirdTextBlockData: {
    text: '첫 눈처럼 그대가 오길',
    editMode: false,
    textBlockHeight: '100px',
    textBlockWidth: '100%',
    textBlockColor: 'rgba(0, 0, 0, 1)',
    textBlockColorPick: false,
    textBlockFontSize: '30px',
    textBlockFontFamily: 'Gothic',
    textBlockFontWeight: 'regular',
    textBlockLineHeight: '100px', 
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
    textBlockBackgroundColor: 'rgba(80, 255, 75, 1)',
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
  }
};

const reducer = (state = defaultState, action) => {
  let newState = cloneDeep(state);
  switch (action.type) {
    case LOGIN: {
      newState.user.name = action.name;
      newState.user.email = action.email;
      return newState;
    }
    case LOGOUT: {
      newState.user.name = null;
      newState.user.email = null;
      return newState;
    }
    case GET_FONTS_LIST_FROM_GOOGLE_SUCCESS: {
      newState.fontsFromGgl = action.fonts;
      return newState;
    }
    case CHANGE_SELECTED_COLOR: {
      newState[action.locate][action.prop] = `rgba(${action.color.r}, ${action.color.g}, ${action.color.b}, ${action.color.a})`;
      return newState;
    }
    case CHANGE_EDITED_TEXT: {
      newState[action.locate].text = action.input;
      return newState;
    }
    case CHANGE_ADJUSTED_DATA: {
      newState[action.locate][action.prop] = action.data
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default reducer
