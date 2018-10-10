import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/fonts.css';

class FontList extends Component {
  render() {
    console.log('FontList Component', this.props.fontsList);
    return (
      <ul className="main-font-list">
        {
          this.props.fonts.map(val => {
            return (
              <li key={val._id} className="main-font-thumbnail">
                <Link to={`/${val.font_family}`}>
                  <h2>{val.display_name}</h2>
                  <p>by {val.designer}</p>
                </Link>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default FontList
