import React, { Component } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField, Typography, Button, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WebFont from 'webfontloader';
import { BlockPicker } from 'react-color';
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

class BoardControlpanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    };
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleChangeComplete(locate, prop, { rgb }) {
    this.props.colorPickHandler(rgb, locate, prop);
  }

  dataAdjustHandler = debounce(this.props.dataAdjustHandler, 1000);


  render() {
    const { classes } = this.props;
    let { expanded } = this.state;
    const identity = 'boardData';
    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')} >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>캔버스</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <div>
              <p className="textBlock-control-label">캔버스 사이즈-가로(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.boardData.boardWidth) || 800}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'boardWidth');
                }}
              />
              <p className="textBlock-control-label">캔버스 사이즈-세로(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.boardData.boardHeight) || 800}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'boardHeight');
                }}
              />
            </div>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <BlockPicker
              width='240px'
              color={this.props.boardData.boardBackgroundColor}
              onChangeComplete={
                this.handleChangeComplete.bind(this, identity, 'boardBackgroundColor')
              }
              triangle="hide"
            />
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <div>
              <p className="textBlock-control-label">테두리 두께(px) :</p>
              <TextField
                type="number"
                defaultValue={parseInt(this.props.boardData.boardBorderWidth) || 1}
                onChange={ev => {
                  this.dataAdjustHandler(`${ev.target.value}px`, identity, 'boardBorderWidth');
                }}
              />
              <p className="textBlock-control-label">테두리 색상 :</p>

            </div>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <BlockPicker
              width='240px'
              color={this.props.boardData.boardBorderColor}
              onChangeComplete={
                this.handleChangeComplete.bind(this, identity, 'boardBorderColor')
              }
              triangle="hide"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>

    );
  }
}

export default withStyles(styles)(BoardControlpanel);