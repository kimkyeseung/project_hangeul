import React, { Component } from 'react';
import { Tabs, Tab, Button } from '@material-ui/core';
import TextBlock from './TextBlock';
import BoardControlpanel from './BoardControlpanel';
import Controlpanel from './Controlpanel';
import WebFont from 'webfontloader';
import Blockinfo from './Blockinfo';
import './style/tryout.css';

class Tryout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBlockinfoOn: false,
      selectedTextBlockIndex: 0,
      blockInfoIndex: 0,
      texblockCount: 1,
      shareSource: null
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.fontsFromGgl.length !== 0) {
      const fontFamilies = nextProps.fontsFromGgl.map(font => font.family);
      WebFont.load({
        google: {
          families: fontFamilies
        }
      });
    }
    return true;
  }

  tabChangeHandler(ev, value) {
    this.setState({ selectedTextBlockIndex: value });
  }

  toggleBlockInfo(index) {
    let blockInfoIndex = index !== undefined ? index : 0;

    this.setState((prevState) => ({
      isBlockinfoOn: !prevState.isBlockinfoOn,
      blockInfoIndex
    }));
  }

  addTextBlock() {
    this.setState((prevState) => {
      return {
        texblockCount: prevState.texblockCount + 1
      };
    });
  }

  shareSource() {
    let plate = document.createElement('div');
    let board = document.createElement('div');

    const boardData = this.props.boardData;
    board.style.width = boardData.boardWidth;
    board.style.height = boardData.boardHeight;
    board.style.backgroundColor = boardData.boardBackgroundColor;
    board.style.borderWidth = boardData.boardBorderWidth;
    board.style.borderStyle = boardData.boardBorderStyle;
    board.style.borderColor = boardData.boardBorderColor;
    plate.appendChild(board);

    const textBlocks = this.props.textBlocks;
    let count = this.state.texblockCount;
    for (let i = 0; i < count; i++) {
      let textblock = document.createElement('div');
      if (textBlocks[i].textBlockBackgroundColor) textblock.style.backgroundColor = this.props.textBlocks[i].textBlockBackgroundColor;
      if (textBlocks[i].textBlockFontFamily) {
        textblock.style.fontFamily = textBlocks[i].textBlockFontFamily
        let link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css?family=${textBlocks[i].textBlockFontFamily.replace(/ /g,'+')}`;
        link.rel = 'stylesheet';
        plate.appendChild(link);
      };
      if (textBlocks[i].textBlockLetterSpace) textblock.style.letterSpacing = textBlocks[i].textBlockLetterSpace;
      textblock.textContent = textBlocks[i].text;
      textblock.style.color = textBlocks[i].textBlockColor;
      textblock.style.fontSize = textBlocks[i].textBlockFontSize;
      textblock.style.fontWeight = textBlocks[i].textBlockFontWeight;
      textblock.style.height = textBlocks[i].textBlockHeight;
      textblock.style.width = textBlocks[i].textBlockWidth;
      textblock.style.lineHeight = textBlocks[i].textBlockLineHeight;
      textblock.style.marginTop = textBlocks[i].textBlockMarginTop;
      textblock.style.marginBottom = textBlocks[i].textBlockMarginBottom;
      textblock.style.marginLeft = textBlocks[i].textBlockMarginLeft;
      textblock.style.marginRight = textBlocks[i].textBlockMarginLeft;
      textblock.style.paddingTop = textBlocks[i].textBlockPaddingTop;
      textblock.style.paddingBottom = textBlocks[i].textBlockPaddingBottom;
      textblock.style.paddingLeft = textBlocks[i].textBlockPaddingLeft;
      textblock.style.paddingRight = textBlocks[i].textBlockPaddingRight;
      textblock.style.textAlign = textBlocks[i].textBlockTextAlign;
      textblock.style.textShadow = `${textBlocks[i].textblockTextShadowHorizontal} ${textBlocks[i].textblockTextShadowVertical} ${textBlocks[i].textblockTextShadowBlur} ${textBlocks[i].textblockTextShadowColor}`;
      textblock.style.webkitTextStrokeColor = textBlocks[i].textBlockTextStrokeColor;
      textblock.style.webkitTextStrokeWidth = textBlocks[i].textBlockTextStrokeWidth;
      board.appendChild(textblock);
    }
    plate.appendChild(board);
    let shareSource = plate.innerHTML;
    this.setState({ shareSource });
    console.log(this.state.shareSource);
  }

  render() {
    const boardStyle = {
      position: 'relative',
      width: this.props.boardData.boardWidth,
      height: this.props.boardData.boardHeight,
      border: `${this.props.boardData.boardBorderWidth} ${this.props.boardData.boardBorderStyle} ${this.props.boardData.boardBorderColor}`,
      backgroundColor: this.props.boardData.boardBackgroundColor
    };

    const blockIdentities = ['textBlockData', 'secondTextBlockData', 'thirdTextBlockData'];
    let range = [];

    for (let i = 0; i < this.state.texblockCount; i++) {
      range.push(i + 1);
    }

    return (
      <div className="tryout">
        <div className="tryout-board" id="tryout-board" style={boardStyle}>
          {
            range.length && range.map((order, index) => {
              const shouldShowAddButton = this.state.isBlockinfoOn && range.length - 1 === index && index < 2;
              return (
                <TextBlock
                  key={index}
                  identity={blockIdentities[index]}
                  shouldShowAddButton={shouldShowAddButton}
                  textBlockData={this.props.textBlocks[index]}
                  textEditHandler={this.props.textEditHandler}
                  onTextMouseEnter={this.toggleBlockInfo.bind(this, index)}
                  onTextMouseLeave={this.toggleBlockInfo.bind(this)}
                  onAddButtonClick={this.addTextBlock.bind(this)}
                />
              );
            })
          }
          {
            this.state.isBlockinfoOn ?
              <Blockinfo
                textBlockFontFamily={this.props.textBlocks[this.state.blockInfoIndex].textBlockFontFamily}
                textBlockFontStyle={this.props.textBlocks[this.state.blockInfoIndex].textBlockFontStyle}
                textBlockFontSize={this.props.textBlocks[this.state.blockInfoIndex].textBlockFontSize}
                textBlockLineHeight={this.props.textBlocks[this.state.blockInfoIndex].textBlockLineHeight}
                textBlockLetterSpace={this.props.textBlocks[this.state.blockInfoIndex].textBlockLetterSpace}
              />
              : null
          }
        </div>


        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '8%',
          }}>
          <BoardControlpanel
            dataAdjustHandler={this.props.dataAdjustHandler}
            colorPickHandler={this.props.colorPickHandler}
            boardData={this.props.boardData}
          />
          <Tabs
            value={this.state.selectedTextBlockIndex}
            fullWidth={true}
            onChange={this.tabChangeHandler.bind(this)}
          >
            {
              range.length && range.map((order, index) => {
                return (
                  <Tab key={index} label={'개체' + order} style={{ minWidth: 10 }}></Tab>
                );
              })
            }
          </Tabs>

          <Controlpanel
            identity={blockIdentities[this.state.selectedTextBlockIndex]}
            textBlockData={this.props.textBlocks[this.state.selectedTextBlockIndex]}
            colorPickHandler={this.props.colorPickHandler}
            dataAdjustHandler={this.props.dataAdjustHandler}
            fontsFromGgl={this.props.fontsFromGgl}
          />
          <Button
            onClick={this.shareSource.bind(this)}>
            {/* onClick={ev => {
            this.shareSource.call(this);
          }}> */}
            소스 공유하기
        </Button>
        </div>
      </div>
    );
  }
};

export default Tryout
