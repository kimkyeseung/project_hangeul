import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style/app.css';
import logo from './img/bi.jpg';
import Account from './Account';
import FontList from './FontList';
import Signup from './Signup';
import Login from './Login';
import About from './About';
import Upload from './Upload';
import FontDetail from './FontDetail';
import Tryout from './Tryout';

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_LIST_LIMIT = 10;

class App extends Component {
  componentDidMount() {
    this.props.getFontsListFromGgl();
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <img src={logo} alt="Project Hangeul logo" />
              <h1>Project Hangeul</h1>
            </Link>
            <Account
              isAuthenticated={this.props.isAuthenticated}
              openSignUpModal={this.props.openSignUpModal}
              openLoginModal={this.props.openLoginModal}
              openUploadModal={this.props.openUploadModal}
              logout={this.props.logout}
              user={this.props.user}
            />
          </header>

          <div className="App-body">
            <Route exact path="/" render={() => {
              return (
                <Fragment>
                  {this.props.signUpModal ? <Signup openSignUpModal={this.props.openSignUpModal} signUp={this.props.signUp} /> : null}
                  {this.props.loginModal ? <Login openLoginModal={this.props.openLoginModal} login={this.props.login} /> : null}
                  {this.props.uploadModal ? <Upload openUploadModal={this.props.openUploadModal} upload={this.props.upload}/> : null}

                  <h1>세상의 모든 무료 한글</h1>
                  <h2>모든 무료 한글 웹폰트를 여기에서!</h2>
                  <form
                    className="App-body-fontlist"
                    onSubmit={ev => {
                      ev.preventDefault();
                      this.props.getFontsList({
                        q: ev.target.text.value,
                        page: DEFAULT_PAGE_INDEX,
                        limit: DEFAULT_LIST_LIMIT
                      })
                    }}
                    onBlur={ev => {
                      ev.currentTarget.text.value = ""
                    }}
                  >
                    <input type="text" name="text" id="main-search" />
                    <button type="submit"></button>

                    {/* {have to add detail search controller} */}
                  </form>

                  <FontList
                    getFontsListFromGgl={this.props.getFontsListFromGgl}
                    fontsFromGgl={this.props.fontsFromGgl}
                  />
                </Fragment>
              );
            }} />

            <Route path="/about" component={About} />

            <Route path="/font/:fontDetail" render={({match}) => {
              return (
                <FontDetail
                  font={match.params.fontDetail}
                  fontDetail = {this.props.fontDetail}
                  getFontDetail={this.props.getFontDetail}
                  getFontDetailFromGgl={this.props.getFontDetailFromGgl}
                  fontsDetailFromGgl={this.props.fontsDetailFromGgl}
                  fontsFromGgl={this.props.fontsFromGgl}
                />
              );
            }} />

            <Route path="/tryout/:tryout_id" render={({ match }) => {
              let textBlocks = [
                this.props.textBlockData,
                this.props.secondTextBlockData,
                this.props.thirdTextBlockData
              ];

              return (
                <Tryout
                  tryoutId={match.params.tryout_id}
                  textBlocks={textBlocks}
                  boardData={this.props.boardData}
                  fontsFromGgl={this.props.fontsFromGgl}
                  textEditStart={this.props.textEditStart}
                  textEditHandler={this.props.textEditHandler}
                  colorPickToggle={this.props.colorPickToggle}
                  colorPickHandler={this.props.colorPickHandler}
                  numberAdjustHandler={this.props.numberAdjustHandler}
                  activeTextBlock={this.props.activeTextBlock}
                  callBlockinfo={this.props.callBlockinfo}
                  blockinfoOn={this.props.blockinfoOn}
                  addTextBlock={this.props.addTextBlock}
                />
              );
            }}/>
          </div>

        </div>
    );
  }
}

export default App;
