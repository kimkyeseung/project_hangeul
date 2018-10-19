import React, { Component } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField, Typography, Divider, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons/';
import { SketchPicker } from 'react-color';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class Controlpanel extends Component {
  state = {
    expanded: null,
  };

  render() {
    const { expanded } = this.state;
    
    return (
      <div className="textBlock-panel" style={{ width: '240px', position: 'absolute', top: '10%', right: '20px' }}>
        <ExpansionPanel variant="permanent" expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <p variant="body1">배경 / 위치(외부여백)</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

          </ExpansionPanelDetails>

          
        </ExpansionPanel>

        <ExpansionPanel variant="permanent" expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <p variant="body1">/내부여백</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails children={
            <p>asdasasdasd</p>
          }>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel variant="permanent" expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <p variant="body1">글꼴/문단</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails children={
            <p variant="body1">13245676</p>
          }>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel variant="permanent" expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <p variant="body1">꾸미기</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails children={
            <p variant="body1">zxcvxbcnv</p>
          }>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        
      </div>
    );
  }
};

export default withStyles(styles)(Controlpanel)
