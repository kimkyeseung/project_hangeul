import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons/';
import './style/textblock.css';

class TextBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    };

    this.shouldTurnOffEditMode = this.shouldTurnOffEditMode.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.shouldTurnOffEditMode);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.shouldTurnOffEditMode);
  }

  shouldTurnOffEditMode(ev) {
    if (ev.key === 'Escape') {
      this.turnOffEditMode();
    }
  }

  turnOffEditMode() {
    this.setState({
      editMode: false
    });
  }

  onTextEdit(ev) {
    if (ev.key === 'Enter') {
      this.props.textEditHandler(this.props.identity, ev.target.value);
      this.turnOffEditMode();
    }
  }

  render() {
    const editStyle = {
      display: 'block',
      position: 'absolute',
      zIndex: 1,
      boxSizing: 'border-box',
      top: 0,
      left: 0,
      width: '100%',
      whiteSpace: 'pre',
      height: this.props.textBlockData.textBlockHeight,
      color: this.props.textBlockData.textBlockColor,
      fontFamily: this.props.textBlockData.textBlockFontFamily,
      fontSize: this.props.textBlockData.textBlockFontSize,
      fontWeight: this.props.textBlockData.textBlockFontWeight,
      textAlign: this.props.textBlockData.textBlockTextAlign,
      letterSpacing: this.props.textBlockData.textBlockLetterSpace,
      WebkitTextStrokeColor: this.props.textBlockData.textBlockTextStrokeColor,
      WebkitTextStrokeWidth: this.props.textBlockData.textBlockTextStrokeWidth,
      marginTop: this.props.textBlockData.textBlockMarginTop,
      marginBottom: this.props.textBlockData.textBlockMarginBottom,
      marginRight: this.props.textBlockData.textBlockMarginRight,
      marginLeft: this.props.textBlockData.textBlockMarginLeft,
      paddingTop: this.props.textBlockData.textBlockPaddingTop,
      paddingBottom: this.props.textBlockData.textBlockPaddingBottom,
      paddingRight: this.props.textBlockData.textBlockPaddingRight,
      paddingLeft: this.props.textBlockData.textBlockPaddingLeft
    };

    const displayStyle = {
      position: 'relative',
      overFlow: 'visible',
      boxSizing: 'border-box',
      width: this.props.textBlockData.textBlockWidth,
      height: this.props.textBlockData.textBlockHeight,
      color: this.props.textBlockData.textBlockColor,
      fontFamily: this.props.textBlockData.textBlockFontFamily,
      fontSize: this.props.textBlockData.textBlockFontSize,
      lineHeight: this.props.textBlockData.textBlockLineHeight,
      fontWeight: this.props.textBlockData.textBlockFontWeight,
      fontStyle: this.props.textBlockData.textBlockFontStyle,
      textAlign: this.props.textBlockData.textBlockTextAlign,
      letterSpacing: this.props.textBlockData.textBlockLetterSpace,
      WebkitTextStrokeColor: this.props.textBlockData.textBlockTextStrokeColor,
      WebkitTextStrokeWidth: this.props.textBlockData.textBlockTextStrokeWidth,
      backgroundColor: this.props.textBlockData.textBlockBackgroundColor,
      textShadow: `${this.props.textBlockData.textBlockTextShadowHorizonatal} ${this.props.textBlockData.textBlockTextShadowVertical} ${this.props.textBlockData.textBlockTextShadowBlur} ${this.props.textBlockData.textBlockTextShadowColor}`,
      marginTop: this.props.textBlockData.textBlockMarginTop,
      marginBottom: this.props.textBlockData.textBlockMarginBottom,
      marginRight: this.props.textBlockData.textBlockMarginRight,
      marginLeft: this.props.textBlockData.textBlockMarginLeft,
      paddingTop: this.props.textBlockData.textBlockPaddingTop,
      paddingBottom: this.props.textBlockData.textBlockPaddingBottom,
      paddingRight: this.props.textBlockData.textBlockPaddingRight,
      paddingLeft: this.props.textBlockData.textBlockPaddingLeft
    };

    return (
      <div className="textBlock"
        onDoubleClick={ev => {
          this.setState({
            editMode: true
          });
        }}
        onBlur={this.turnOffEditMode.bind(this)}
        onMouseEnter={ev => {
          ev.stopPropagation();
          this.props.onTextMouseEnter();
        }}
        onMouseLeave={ev => {
          this.props.onTextMouseLeave();
        }}
      >
        <div style={displayStyle}>{this.props.textBlockData.text}
          {
            this.state.editMode ?
              <textarea
                // type="text"
                autoFocus={true}
                defaultValue={this.props.textBlockData.text}
                onKeyDown={ev => {
                  this.onTextEdit.call(this, ev)
                }}
                style={editStyle}
              />
              : null
          }
        </div>
        {
          this.props.shouldShowAddButton &&
          <Button variant="fab" color="primary" aria-label="Add"
            mini
            onClick={this.props.onAddButtonClick}
            style={{
              top: '-20px'
            }}
          >
            <Add />
          </Button>
        }
        {/* cmd + s => save and view mode, blue, esc => view mode , shift enter => line change*/}
      </div>
    );
  }
};

export default TextBlock
