import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import WebFont from 'webfontloader';
import { dummyGenerate } from '../utils/dummyTexts';
import { Typography } from '@material-ui/core';
import './style/fontdetail.css';

class FontDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      family: this.props.font.replace(/[+]/g, ' '),
      dummyText: dummyGenerate()
    };
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: [this.state.family]
      }
    });
    this.props.getFontDetailFromGgl(this.state.family);
  }

  render() {
    return (
      <div className="font-detail" style={{fontFamily: this.state.family}}>
        <div className="font-detail-left" >
          <Typography component="p">Font Name</Typography>
          <div className="font-detail-title">{this.state.family}</div>
          <Button variant="outlined" onClick={() => {this.setState(() => {
            let newDummy = dummyGenerate();
            return {dummyText: newDummy}
          })}}>텍스트 바꾸기</Button>
          <div className="font-detail-title"></div>
          <hr/>
          <div className="font-detail-dummy font-detail-80">{this.state.dummyText}</div>
          <div className="font-detail-dummy font-detail-70">{this.state.dummyText}</div>
          <div className="font-detail-dummy font-detail-60">{this.state.dummyText}</div>
          <div className="font-detail-dummy font-detail-50">{this.state.dummyText}</div>
          <div className="font-detail-dummy font-detail-40">{this.state.dummyText}</div>
          <div className="font-detail-dummy font-detail-30">{this.state.dummyText}</div>
          <div className="font-detail-dummy font-detail-20">{this.state.dummyText}</div>

          <Typography component="p">characters</Typography>
          <hr/>
          <div className="font-detail-all">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>abcdefghijklmnopqrstuvwxyz가개갸거게겨고괴괘교구귀궤규그긔기나내냐너네녀노뇌놰뇨누뉘눼뉴느늬니다대댜더데뎌도되돼됴두뒤뒈류드듸디라래랴러레려로뢰뢔료루뤼뤠류르릐리마매먀머메며모뫼뫠묘무뮈뭬뮤므믜미바배뱌버베벼보뵈봬뵤부뷔붸뷰브븨비사새샤서세셔소쇠쇄쇼수쉬쉐슈브븨비아애야어에여오외왜요우위웨유으의이자재쟈저제져조죄좨죠주쥐줴쥬즈즤지차채챠처체쳐초최쵀쵸추취췌츄츠츼치카캐캬커케켜코쾨쾌쿄쿠퀴퀘큐크킈키타태탸터테텨토퇴퇘툐투튀퉤튜트틔티파패퍄퍼페펴포푀퐤표푸퓌풰퓨프픠피하해햐허헤혀호회홰효후휘훼휴흐희히1234567890
          </div>

          <Typography component="p">styles</Typography>
          <hr/>
          {
            // this.props.fontsDetailFromGgl.variants ? 
            <ul className="font-detail-variant">
              {this.props.fontsDetailFromGgl.variants.map(style => {
                return (
                  <li style={{fontFamily: `${this.props.fontsDetailFromGgl.family}:${style}`}}>{style}</li>
                );
              })}
            </ul>
            //  : null
          }
          
          <Button component={Link} to="/tryout">Tryout</Button>
        </div>
      </div>
    );
  }
};

export default FontDetail
