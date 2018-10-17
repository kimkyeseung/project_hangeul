import React, { Component } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField, Typography, Divider, Button } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons/';
import { SketchPicker } from 'react-color';
import './style/instance.css';

class Instance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '더블클릭하여 텍스트를 수정하세요',
      editMode: false,
      instanceHeight: '200px',//오브젝트
      instanceWidth: '100%',//오브젝트
      instanceColor: 'black',//꾸미기  color
      instanceColorPick: false,
      instanceFontSize: '60px',//폰트, 문단
      instanceFontFamily: '',//폰트, 문단
      instanceFontWeight: 'normal',//폰트, 문단
      instanceLineHeight: '70px', //폰트, 문단
      instanceFontStyle: 'normal',//폰트, 문단
      instanceTextAlign: 'center',//폰트, 문단
      instanceLetterSpace: '',//폰트, 문단
      instanceTextStrokeColor: '',//꾸미기  color
      instanceTextStrokeColorPick: false,
      instanceTextStrokeWidth: '',//꾸미기
      instanceTextShadowHorizonatal: '',//꾸미기
      instanceTextShadowVertical: '',//꾸미기
      instanceTextShadowBlur: '',//꾸미기
      instanceTextShadowColor: '',//꾸미기  color
      instanceTextShadowColorPick: false,
      instanceMarginTop: '200px',// 배경,위치
      instanceMarginRight: '0',// 배경,위치
      instanceMarginBottom: '0',// 배경,위치
      instanceMarginLeft: '0',// 배경,위치
      instanceBackgroundColor: 'rgba(255, 255, 255, 1)',// 배경,위치  color
      instanceBackgroundColorPick: false,
      instancePaddingTop: '10px',//오브젝트
      instancePaddingRight: '10px',//오브젝트
      instancePaddingBottom: '10px',//오브젝트
      instancePaddingLeft: '10px',//오브젝트
    }
  }

  handleTextEdit(ev) {
    if (ev.key === 'Enter') {
      this.setState({
        text: ev.target.value,
        editMode: false
      });
    } else if (ev.key === 'Escape') {
      this.setState({
        editMode: false
      });
    }
  }


  handleChangeComplete({ rgb }) {
    this.setState({ instanceBackgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})` });
  }

  render() {

    const editStyle = {
      display: 'block',
      position: 'absolute',
      top: this.state.instanceMarginTop,
      left: this.state.instanceMarginLeft,
      width: '100%',
      height: this.state.instanceHeight,
      color: this.state.instanceColor,
      fontSize: this.state.instanceFontSize,
      fontWeight: this.state.instanceFontWeight,
      textAlign: this.state.instanceTextAlign,
      letterSpacing: this.state.instanceLetterSpace,
      WebkitTextStrokeColor: this.state.instanceTextStrokeColor,
      WebkitTextStrokeWidth: this.state.instanceTextStrokeWidth
    }

    const displayStyle = {
      postion: 'relative',
      overFlow: 'visible',
      boxSizing: 'border-box',
      width: this.state.instanceWidth,
      height: this.state.instanceHeight,
      color: this.state.instanceColor,
      fontSize: this.state.instanceFontSize,
      lineHeight: this.state.instanceLineHeight,
      fontWeight: this.state.instanceFontWeight,
      fontStyle: this.state.instanceFontStyle,
      textAlign: this.state.instanceTextAlign,
      letterSpacing: this.state.instanceLetterSpace,
      WebkitTextStrokeColor: this.state.instanceTextStrokeColor,
      WebkitTextStrokeWidth: this.state.instanceTextStrokeWidth,
      backgroundColor: this.state.instanceBackgroundColor,
      textShadow: `${this.state.instanceTextShadowHorizonatal} ${this.state.instanceTextShadowVertical} ${this.state.instanceTextShadowBlur} ${this.state.instanceTextShadowColor}`,
      margin: `${this.state.instanceMarginTop} ${this.state.instanceMarginRight} ${this.state.instanceMarginBottom} ${this.state.instanceMarginLeft}`,
      padding: `${this.state.instancePaddingTop} ${this.state.instancePaddingRight} ${this.state.instancePaddingBottom} ${this.state.instancePaddingLeft}`,
    }

    return (
      <div className="instance-wrap">
        <div className="instance"
          onDoubleClick={(ev) => {
            ev.stopPropagation();
            this.setState({ editMode: true });
          }}
          onKeyPress={() => {
            this.handleTextEdit.bind(this);
          }}>
          <p style={displayStyle}>{this.state.text}
            {
              this.state.editMode
                ? <input
                  type="text"
                  autoFocus={true}
                  defaultValue={this.state.text}
                  onKeyDown={this.handleTextEdit.bind(this)}
                  style={editStyle}
                  onBlur={(ev) => {
                    this.setState({ editMode: false });
                  }}
                />
                : null
            }
          </p>
        </div>

        {/* cmd + s => save and view mode, blue, esc => view mode , shift enter => line change*/}

        <div className="instance-panel" style={{ width: '240px', position: 'absolute', top: '10%', right: '-260px' }}>
          <ExpansionPanel variant="permanent">
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography variant="p">배경 / 위치(외부여백)</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              onClick={() => {
                this.setState({
                  instanceBackgroundColorPick: !this.state.instanceBackgroundColorPick
                });
              }}
              style={{overflow: 'visible'}}
            >
              <p className="instance-control-label">색상 :</p>
                <div 
                className="instance-control-color-thumb"
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: this.state.instanceBackgroundColor,
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                >
                  {
                    this.state.instanceBackgroundColorPick
                    ? <SketchPicker 
                        color={this.state.instanceBackgroundColor}
                        onChangeComplete={this.handleChangeComplete.bind(this)}
                        style={{position: 'absolute', top: 0, left: 0, zIndex: 8}}
                      />
                    : null
                  }
                </div>
              </ExpansionPanelDetails>

              <ExpansionPanelDetails>
              <div>
                <p className="instance-control-label">상단 여백(px) :</p>
                <TextField
                  type="number"
                  value={parseInt(this.state.instanceMarginTop)}
                  onChange={ev => {
                    this.setState({
                      instanceMarginTop: ev.target.value + 'px'
                    });
                  }} />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel variant="permanent">
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography variant="p">오브젝트/내부여백</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel variant="permanent">
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography variant="p">글꼴/문단</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel variant="permanent">
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography variant="p">꾸미기</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Button onClick={() => {
            console.log(document.getElementById('tryout').innerHTML);
          }}>소스 공유하기</Button>
        </div>
      </div>
    );
  }
};

export default Instance
