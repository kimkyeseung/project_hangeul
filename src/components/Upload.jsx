import React, { Component } from 'react';
//validate 파일명, 디스크립션, 디자이너 등..
import { Button } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import './style/upload.css';

class Upload extends Component {
  onUploadClick(ev) {
    ev.preventDefault();
    const data = new FormData(ev.target);
    data.append('font', ev.target.font_file.files[0]);
    this.props.upload(data);
  }

  render() {
    return (
      <div className="upload-wrap">
        <form className="upload" onSubmit={this.onUploadClick.bind(this)}>
          <h2>폰트 파일 업로드</h2>
          <Clear className="upload-clear" onClick={this.props.openUploadModal}/>
          <label htmlFor="displayName">폰트 이름</label>
          <input type="text" name="displayName" id="displayName" required/>

          <label htmlFor="designer">제작사/디자이너</label>
          <input type="text" name="designer" id="designer" required/>

          <label htmlFor="description">폰트 설명, 저작권</label>
          <textarea name="description" id="description"></textarea>

          <label htmlFor="monospaced">고정폭 글꼴</label>
          <input type="checkbox" name="monospaced" id="monospaced"/>

          <label htmlFor="font-file">폰트파일</label>
          <input type="file" name="font_file" id="font_file"/>
      
          <Button variant="contained" className="upload-submit" type="submit">업로드</Button>
        </form>
      </div>
    );
  }
};

export default Upload
