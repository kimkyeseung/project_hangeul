import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './style/about.css';

class About extends Component {
  render() {
    return (
      <div className="about">
        <h1>프로젝트 한글은...</h1>
        <p>
          프로젝트 한글은 세상의 모든 한글 무료폰트 저장소입니다.
          무료 한글폰트를 다양한 사이즈 및 스타일로 사용해 볼 수 있고
          회원이시라면 만들어본 스타일을 저장하거나 공유할 수 있습니다.
        </p>

        <h2>마이페이지</h2>
        <p>
          회원 가입 후에 마이페이지에서 좋아하는 폰트를 모아 볼 수 있습니다.
          한글폰트를 사용하여 원하는 스타일로 꾸민후에 저장하여 나중에 다시 보거나
          수정하고 다른 사람에게 공유할 수 있습니다.
        </p>

        <Button variant="outlined" className="btn-tryout">Tryout</Button>
      </div>
    );
  }
};

export default About
