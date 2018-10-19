import React, { Component } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import TextBlock from './TextBlock';
import Controlpanel from './Controlpanel';
import WebFont from 'webfontloader';
import Blockinfo from './Blockinfo';

class Tryout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBlockinfoOn: false,
      selectedTextBlockIndex: 0,
      blockInfoIndex: 0
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

  render() {
    console.log('@@@@@',this.props.textBlocks);
    const boardStyle = {
      position: 'relative',
      width: this.props.boardData.boardWidth,
      height: this.props.boardData.boardHeight,
      border: `${this.props.boardData.boardBorderWidth} ${this.props.boardData.boardBorderStyle} ${this.props.boardData.boardBorderColor}`,
      backgroundColor: this.props.boardData.boardBackgroundColor
    };

    const blockIdentities = ['textBlockData', 'secondTextBlockData', 'thirdTextBlockData'];
    let range = [];

    for (let i = 0; i < this.props.activeTextBlock; i++) {
      range.push(i+1);
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
                  onAddButtonClick={this.props.addTextBlock}
                  onTextMouseEnter={this.toggleBlockInfo.bind(this, index)}
                  onTextMouseLeave={this.toggleBlockInfo.bind(this)}
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

        <Tabs
          value={this.state.selectedTextBlockIndex}
          fullWidth={true}
          style={{
            position: 'absolute',
            right: '20px',
            top: '8%',
          }}
          onChange={this.tabChangeHandler.bind(this)}
        >
        {
          range.length && range.map((order, index) => {
            return (
              <Tab key={index} label={'개체'+ order} style={{minWidth: 10}}></Tab>
            );
          })
        }
        </Tabs>
        
        <Controlpanel
          identity={blockIdentities[this.state.selectedTextBlockIndex]}
          textBlockData={this.props.textBlocks[this.state.selectedTextBlockIndex]}
          colorPickHandler={this.props.colorPickHandler}
          numberAdjustHandler={this.props.numberAdjustHandler}
          fontsFromGgl={this.props.fontsFromGgl}
        />
      </div>
    );
  }
};

export default Tryout
