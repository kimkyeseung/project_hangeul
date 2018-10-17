import React, { Component } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField, Typography, List, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { dummyGenerate } from '../utils/dummyTexts';
import { SketchPicker } from 'react-color';
import Instance from './Instance';
import WebFont from 'webfontloader';

class Tryout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      family: '',//this.props.font.replace(/[+]/g, ' '),
      dummyText: dummyGenerate(),
      boardWidth: '1200px',
      boardHeight: '800px',
      boardBackgroundColor: 'white',
      boardBackgroundImage: null,
      boardBorderWidth: '1px',
      boardBorderStyle: 'solid',
      boardBorderColor: 'black',
    };
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: [this.state.family]//
      }
    });
    // this.props.getFontDetailFromGgl(this.state.family);
  }

  handleChangeComplete(color) {
    this.setState({boardBackgroundColor: color.hex});
  }

  render() {
    const boardStyle = {
      position: 'relative',
      width: this.state.boardWidth,
      height: this.state.boardHeight,
      border: `${this.state.boardBorderWidth} ${this.state.boardBorderStyle} ${this.state.boardBorderColor}`,
      backgroundColor: this.state.boardBackgroundColor
    }

    return (
      <div className="tryout" id="tryout">
        <div className="tryout-board" style={boardStyle}>
          <Instance/>
        </div>
      </div>
    );
  }
};

export default Tryout
