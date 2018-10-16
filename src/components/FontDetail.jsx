import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { load } from 'webfontloader';
import './style/fontdetail.css';

class FontDetail extends Component {
  // componentDidMount() {
  //   alert(this.props.font);
  //   this.props.getFontDetail(this.props.font);
  // }

  shouldComponentUpdate(nextProps) {
    console.log(nextProps);
    nextProps.getFontDetail(nextProps.font);
    let families = nextProps.fontDetail.styles.length > 1 ? nextProps.styles : [nextProps.family];
    load({
      custom: {
        families,
        urls: nextProps.fontDetail.url
      }
    });
    return true;
  }

  render() {
    // console.log(this.props.fontDetail);
    
    return (
      <div className="font-detail">
        {/* <div className="font-detail-left" style={{fontFamily: this.props.fontDetail.family}}> */}
        <div className="font-detail-left" >
          {/* <div className="font-detail-title">{this.props.fontInfo.displayName}</div> */}
          <div className="font-detail-title"></div>
          <hr/>
          <div className="font-detail-80">다람쥐 헌 쳇바퀴에 타고파</div>
          <div className="font-detail-70">다람쥐 헌 쳇바퀴에 타고파</div>
          <div className="font-detail-60">다람쥐 헌 쳇바퀴에 타고파</div>
          <div className="font-detail-50">다람쥐 헌 쳇바퀴에 타고파</div>
          <div className="font-detail-40">다람쥐 헌 쳇바퀴에 타고파</div>
          <div className="font-detail-30">다람쥐 헌 쳇바퀴에 타고파</div>
          <div className="font-detail-20">다람쥐 헌 쳇바퀴에 타고파</div>
          <p>다람쥐 헌 쳇바퀴에 타고파</p>

          <div className="font-detail-all">
          ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz가개갸거게겨고괴괘교구귀궤규그긔기나내냐너네녀노뇌뇨누뉘눼뉴느늬니다대댜더데뎌도되돼됴두뒤뒈류드듸디라래랴러레려로뢰료루뤼뤠류르릐리마매먀머메며모뫼묘무뮈뭬뮤므미바배뱌버베벼보뵈뵤부뷔붸뷰브비사새샤서세셔소쇠쇼수쉬쉐슈브비아애야어에여오외왜요우위웨유으의이자재쟈저제져조죄좨죠주쥐줴쥬즈지차채챠처체쳐초최쵸추취췌츄츠치카캐캬커케켜코쾨쾌쿄쿠퀴퀘큐크키타태탸터테텨토퇴퇘툐투튀퉤튜트틔티파패퍄퍼페펴포푀표푸퓌퓨프피하해햐허헤혀호회홰효후휘훼휴흐희히1234567890
          </div>
          {/* {
            this.props.fontDetail.styles.length > 1
            ? <ul>
              {this.props.fontDetail.styles.map(style => {
                return (
                  <li style={{fontFamily: {style}}}>{style}</li>
                );
              })}
            </ul>
            : null
          } */}
          
          <Button>Tryout</Button>
        </div>
        <div className="font-detail-right">
          <div className="font-detail-right-info">
            <h3>Designer</h3>
            {/* <p>{this.props.fontInfo.designer}</p> */}
          </div>
        </div>
      </div>
    );
  }
};

export default FontDetail
