import React, { Component } from 'react';
import { Typography, Divider } from '@material-ui/core';
import { Redirect } from 'react-router-dom'

class Mypage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mypage" style={{padding: '40px'}}>
      {
        this.props.user.name || <Redirect to="/"/>
      }
        <Typography component="p">{this.props.user.name}</Typography>
        <Divider/>

        <Typography component="p">내가 좋아하는 폰트</Typography>
        {/* map 내가 좋아한 폰트들을 받아와서 map을 돌린다. */}
      </div>
    );
  }
};

export default Mypage
