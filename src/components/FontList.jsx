import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ThumbUp } from '@material-ui/icons';
import { Card, Button, CardActionArea, CardContent, Typography, IconButton } from '@material-ui/core';
import './style/fontlist.css';
import WebFont from 'webfontloader';
import { dummyGenerate } from '../utils/dummyTexts';

class FontList extends Component {
  componentDidMount() {
    this.props.getFontsListFromGgl();
  }

  shouldComponentUpdate(nextProps) {
    console.log(nextProps.fontsFromGglFamilies);
    if (nextProps.fontsFromGglFamilies.length !== 0) {
      WebFont.load({
        google: {
          families: nextProps.fontsFromGglFamilies
        }
      });
    }
    return true;
  }

  render() {
    return (
      <div className="main-font-list">
        {/* {
          this.props.fonts.map(val => {
            return (
              <Card key={val._id} className="main-font-card">
                <CardActionArea component={Link} to={`/font/${val.family.split(' ').join('+')}`}>
                  <CardContent>
                    <Typography component="h2" className="main-font-title" style={{ fontFamily: val.family, color: "red" }}>
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
        } */}
        {
          this.props.fontsFromGgl.map(val => {
            return (
              <Card key={`_${val.family}`} className="main-font-card">
                <CardContent>
                  <Typography component="h2" className="main-font-title" style={{ fontFamily: val.family}}>
                    {dummyGenerate()}
                  </Typography>
                  <Typography component="p">{val.family}</Typography>
                </CardContent>
                <Button className="main-font-list-tryout" size="small" color="primary">Tryout</Button>
                <Button component={Link} to={`/font/${val.family.split(' ').join('+')}`} className="main-font-list-about" size="small" color="primary">About</Button>
                <IconButton className="main-font-list-like" onClick={() => {
                  alert(val._id)
                }} >
                  <ThumbUp />
                </IconButton>
              </Card>
            );
          })
        }
        work?
      </div>
    );
  }
}

export default FontList
