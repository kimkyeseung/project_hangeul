import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Account from './Account';
import logo from './img/bi.jpg';
import './style/app.css';
import FontList from './FontList';

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_LIST_LIMIT = 10;

class App extends Component {
  componentDidMount() {
    this.props.getFontsList({
      page: DEFAULT_PAGE_INDEX,
      limit: DEFAULT_LIST_LIMIT
    });
  }
  render() {
    console.log('render');
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <img src={logo} alt="Project Hangeul logo"/>
              <h1>Project Hangeul</h1>
            </Link>
            <Account 
              isAuthenticated={this.props.isAuthenticated}
              openSignUpModal={this.props.openSignUpModal}
              openLoginModal={this.props.openLoginModal}
            />
          </header>

          <Route exact path="/" render={() => {
            return (
              <div className="App-body">
                <h1>세상의 모든 무료 한글</h1>
                <h2>모든 무료 한글 웹폰트를 여기에서!</h2>
                <form action="" onSubmit={this.props}>
                  <input type="text" name="text" id="main-search" />
                  <button type="submit"></button>

                  {/* {have to add detail search controller} */}
                </form>

                <FontList
                  fonts={this.props.fonts}
                  fontsPageIndex={this.props.fontsPageIndex}
                  fontsTotalCount={this.props.fontsTotalCount}
                />
              </div>
            );
          }} />
        </div>
      </Router>
    );
  }
}

export default App;
