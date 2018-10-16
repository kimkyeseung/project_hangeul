import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ThumbUp } from '@material-ui/icons';
import { Card, Button, CardActionArea, CardContent, Typography, IconButton } from '@material-ui/core';
import './style/fontlist.css';
import WebFont from 'webfontloader'

class FontList extends Component {
  componentDidMount() {
  }

  shouldComponentUpdate(nextProps) {
    console.log('shouldComponentUpdate');
    let families = ['Nanum Gothic'];
    let urls = ['https://s3.ap-northeast-2.amazonaws.com/project-hangeul/NanumGothicBold/NanumGothicBold.css'];
    nextProps.fonts.forEach(val => {
      // let families = val.styles.length > 1 ? val.styles : [val.family];
      // console.log('families is ',families, [val.url]);
      // load({
      //   custom: {
      //     families,
      //     urls: [val.url]
      //   }
      // })
      families.push(val.family);
      urls.push(val.url);
    });
    console.log(families, urls);
    WebFont.load({
      custom: {
        families,
        urls
      }
    });

    return true;
  }

  render() {
    return (
      <div className="main-font-list">
        {
          this.props.fonts.map(val => {
            return (
              <Card key={val._id} className="main-font-card">
                <CardActionArea component={Link} to={`/font/${val.family.split(' ').join('+')}`}>
                  <CardContent>
                    <Typography component="h2" className="main-font-title" style={{fontFamily: val.family, color: "red"}}>
                      {val.display_name}
                    </Typography>
                    <Typography component="p">by {val.designer}</Typography>
                  </CardContent>
                </CardActionArea>
                <Button className="main-font-list-tryout" size="small" color="primary">Tryout</Button>
                <IconButton className="main-font-list-like" onClick={() => {
                  alert(val._id)
                }} >
                  <ThumbUp />
                </IconButton>
              </Card>
            );
          })
        }
      </div>
    );
  }
}

export default FontList
