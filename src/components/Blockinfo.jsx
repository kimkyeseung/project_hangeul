import React, { Component } from 'react';

class Blockinfo extends Component {
  render() {
    return (
      <div>
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          opacity: 0.5
        }} onClick={alert.bind(this, 1)
        }>
          <p>Font Family : {this.props.textBlockFontFamily}</p>
          <p>Font Style : {this.props.textBlockFontStyle}</p>
          <p>Font Size : {this.props.textBlockFontSize}</p>
          <p>Line Height : {this.props.textBlockLineHeight}</p>
          <p>Letter Space : {this.props.textBlockLetterSpace}</p>
        </div>
      </div>
    );
  }
}

export default Blockinfo
