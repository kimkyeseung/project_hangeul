import React, { Component } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField, Typography, Button, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WebFont from 'webfontloader';
import { SketchPicker } from 'react-color';
import { debounce } from 'lodash';

const styles = theme => ({
  root: {
    paddingBottom: 0
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Controlpanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
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

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleChangeComplete(locate, prop, { rgb }) {
    this.props.colorPickHandler(rgb, locate, prop);
  }

  dataAdjustHandler = debounce(this.props.dataAdjustHandler, 100);
  

  render() {
    const { classes, identity } = this.props;
    let { expanded } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>배경 / 위치(외부여백)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SketchPicker
              width='240px'
              color={this.props.textBlockData.textBlockBackgroundColor}
              onChangeComplete={
                this.handleChangeComplete.bind(this, identity, 'textBlockBackgroundColor')
              }
              triangle="hide"
            />
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <div>
              <p className="textBlock-control-label">상단 여백(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockMarginTop) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockMarginTop');
                }}
              />
              <p className="textBlock-control-label">하단 여백(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockMarginBottom) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockMarginBottom');
                }}
              />
              <p className="textBlock-control-label">좌측 여백(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockMarginLeft) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockMarginLeft');
                }}
              />
              <p className="textBlock-control-label">우측 여백(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockMarginRight) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockMarginRight');
                }}
              />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>


        <ExpansionPanel variant="permanent" expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <p variant="body1">글씨, 문단</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SketchPicker
              width='240px'
              color={this.props.textBlockData.textBlockColor}
              onChangeComplete={
                this.handleChangeComplete.bind(this, identity, 'textBlockColor')
              }
              triangle="hide"
            />
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <div>
              <p className="textBlock-control-label">서체 :</p>
              <TextField
              select
              value={this.props.textBlockData.textBlockFontFamily}
              onChange={ev => {
                this.dataAdjustHandler(ev.target.value, identity, 'textBlockFontFamily')
              }}
              >
                {
                  this.props.fontsFromGgl.length 
                  ? this.props.fontsFromGgl.map(font => {
                    return (
                      <MenuItem key={font.family} value={font.family} style={{fontFamily: font.family}}>
                        {font.family}
                      </MenuItem>
                    );
                  })
                  : null
                }
              </TextField>

              <p className="textBlock-control-label">글씨 크기(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockFontSize) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockFontSize');
                }}
              />

              <p className="textBlock-control-label">스타일 :</p>
              <TextField
              select
              value={this.props.textBlockData.textBlockFontStyle}
              onChange={ev => {
                this.dataAdjustHandler(ev.target.value, identity, 'textBlockFontStyle')
              }}
              >
                {
                   ['normal', 'italic', 'oblique'].map(style => {
                    return (
                      <MenuItem key={style} value={style}>
                        {style}
                      </MenuItem>
                    );
                  })
                }
              </TextField>

              <p className="textBlock-control-label">굵기 :</p>
              <TextField
              select
              value={this.props.textBlockData.textBlockFontWeight}
              onChange={ev => {
                this.dataAdjustHandler(ev.target.value, identity, 'textBlockFontWeight')
              }}
              >
                {
                  this.props.fontsFromGgl.length 
                  ? this.props.fontsFromGgl.filter(font => {
                    return font.family === this.props.textBlockData.textBlockFontFamily;
                  }).map(({variant}, index) => {
                    return (
                      <MenuItem key={variant} value={variant}>
                        {variant}
                      </MenuItem>
                    );
                  })
                  : null
                }
              </TextField>

              <p className="textBlock-control-label">정렬 :</p>
              <TextField
              select
              value={this.props.textBlockData.textBlockTextAlign}
              onChange={ev => {
                this.dataAdjustHandler(ev.target.value, identity, 'textBlockTextAlign')
              }}
              >
                {
                   ['left', 'right', 'center', 'justify'].map(align => {
                    return (
                      <MenuItem key={align} value={align}>
                        {align}
                      </MenuItem>
                    );
                  })
                }
              </TextField>

              <p className="textBlock-control-label">자간(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockLetterSpace) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockLetterSpace');
                }}
              />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>


        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>개체 / 내부여백</Typography>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <p className="textBlock-control-label">개체 높이(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockHeight) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockHeight');
                }}
              />
              <p className="textBlock-control-label">개체 너비(%) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockWidth) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}%`, identity, 'textBlockWidth');
                }}
              />
              <p className="textBlock-control-label">상단 여백(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockPaddingTop) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockPaddingTop');
                }}
              />
              <p className="textBlock-control-label">하단 여백(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockPaddingBottom) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockPaddingBottom');
                }}
              />
              <p className="textBlock-control-label">좌측 여백(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockPaddingLeft) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockPaddingLeft');
                }}
              />
              <p className="textBlock-control-label">우측 여백(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockPaddingRight) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockPaddingRight');
                }}
              />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>


        <ExpansionPanel variant="permanent" expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <p variant="body1">꾸미기</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <p className="textBlock-control-label">글씨 테두리 :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockTextStrokeWidth) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockTextStrokeWidth');
                }}
              />
            </div>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
              <SketchPicker
                width='240px'
                color={this.props.textBlockData.textBlockTextStrokeColor}
                onChangeComplete={
                  this.handleChangeComplete.bind(this, identity, 'textBlockTextStrokeColor')
                }
                triangle="hide"
              />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>그림자</Typography>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SketchPicker
              width='240px'
              color={this.props.textBlockData.textBlockTextShadowColor}
              onChangeComplete={
                this.handleChangeComplete.bind(this, identity, 'textBlockTextShadowColor')
              }
              triangle="hide"
            />
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <div>
              <p className="textBlock-control-label">그림자 가로거리(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockTextShadowHorizonatal) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockTextShadowHorizonatal');
                }}
              />
              <p className="textBlock-control-label">그림자 세로거리(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockTextShadowVertical) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockTextShadowVertical');
                }}
              />
              <p className="textBlock-control-label">그림자 흐림(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.textBlockData.textBlockTextShadowBlur) || 0}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'textBlockTextShadowBlur');
                }}
              />
            </div>
          </ExpansionPanelDetails>

        </ExpansionPanel>

        {/* <Button onClick={() => {
          console.log(document.getElementById('tryout-board').innerHTML);
        }}>소스 공유하기</Button> */}
      </div>

    );
  }
}

export default withStyles(styles)(Controlpanel);