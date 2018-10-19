import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ThumbUp } from '@material-ui/icons';
import { Card, Button, CardContent, IconButton } from '@material-ui/core';
import './style/fontlist.css';
import WebFont from 'webfontloader';
import { dummyGenerate } from '../utils/dummyTexts';

class FontList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyText: dummyGenerate()
    };
  }

  componentDidMount() {
    this.props.getFontsListFromGgl();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.fontsFromGgl.length !== 0) {
      const fontFamilies = nextProps.fontsFromGgl.map(font => {
        return font.family;
      })
      WebFont.load({
        google: {
          families: fontFamilies
        }
      });
    }
    return true;
  }

  render() {
    return (
      <div className="main-font-list">
        {
          this.props.fontsFromGgl.map(val => {
            return (
              <Card key={`_${val.family}`} className="main-font-card">
                <CardContent>
                  <p className="main-font-title" style={{ fontFamily: val.family, fontSize: '30px'}}>
                    {this.state.dummyText}
                  </p>
                  <p>{val.family}</p>
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
      </div>
    );
  }
}

export default FontList
