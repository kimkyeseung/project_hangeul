import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import './style/app.css';
import FontList from './FontList';
import Signup from './Signup';
import Login from './Login';
import About from './About';
import Upload from './Upload';
import FontDetail from './FontDetail';
import Tryout from './Tryout';
import Header from './Header';
import Mypage from './Mypage';
import { TextField } from '@material-ui/core';
import { debounce } from 'lodash';

let defaultMainStyle = {
  titleStyle: {
    fontSize: '120px',
    paddingTop: '200px',
    marginBottom: '50px'
  },
  subTitleStyle: {
    fontSize: '30px',
    marginBottom: '30px'
  },
  shrinkedTitleStyle: {
    fontSize: '40px',
    paddingTop: '160px',
    marginBottom: '20px'
  },
  shrinkedSubTitleStyle: {
    fontSize: '20px',
    marginBottom: '20px'
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLimit: 8,
      titleStyle: defaultMainStyle.titleStyle,
      subTitleStyle: defaultMainStyle.subTitleStyle,
      searchKeyword: ''
    };
  }

  componentDidMount() {
    this.props.getFontsListFromGgl();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = debounce(() => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 80) && this.props.fontsFromGgl.length) {
      this.setState((prevState) => {
        return {
          listLimit: prevState.listLimit + 2
        };
      });
    }

    if (window.scrollY > 25) {
      this.setState({
        titleStyle: defaultMainStyle.shrinkedTitleStyle,
        subTitleStyle: defaultMainStyle.shrinkedSubTitleStyle
      })
    }  else if (window.scrollY === 0) {
      this.setState({
        titleStyle: defaultMainStyle.titleStyle,
        subTitleStyle: defaultMainStyle.subTitleStyle
      })
    }
  })

  searchHandler = debounce(word => {
    this.setState({
      searchKeyword: word
    });
  })

  render() {
    return (
      <div className="App">
        <Header
          openSignUpModal={this.props.openSignUpModal}
          openLoginModal={this.props.openLoginModal}
          openUploadModal={this.props.openUploadModal}
          login={this.props.login}
          logout={this.props.logout}
          signUp={this.props.signUp}
          user={this.props.user} />

        <div className="App-body">
          <Route exact path="/" render={() => {
            return (
              <Fragment>
                {this.props.signUpModal ? <Signup openSignUpModal={this.props.openSignUpModal} signUp={this.props.signUp} /> : null}
                {this.props.loginModal ? <Login openLoginModal={this.props.openLoginModal} login={this.props.login} /> : null}
                {this.props.uploadModal ? <Upload openUploadModal={this.props.openUploadModal} upload={this.props.upload} /> : null}

                <h1 style={this.state.titleStyle}>세상의 모든 무료 한글</h1>
                <h2 style={this.state.subTitleStyle}>모든 무료 한글 웹폰트를 여기에서!</h2>
                <form
                  className="App-body-fontlist"
                  onChange={ev => {
                    this.searchHandler.call(this, ev.target.value);
                  }}
                >
                  <TextField
                    label="폰트 이름을 검색하세요(영어)"
                    margin="normal"
                    fullWidth
                    placeholder="Nanum Gothic"
                  />

                  {/* {have to add detail search controller} */}
                </form>

                <FontList
                  user={this.props.user}
                  getFontsListFromGgl={this.props.getFontsListFromGgl}
                  fontsFromGgl={this.props.fontsFromGgl.filter(font => {
                    return font.family.toLowerCase().indexOf(this.state.searchKeyword.toLowerCase()) > -1;
                  }).slice(0, this.state.listLimit)}
                />
              </Fragment>
            );
          }} />

          <Route path="/about" component={About} />

          <Route path="/font/:fontDetail" render={({ match }) => {
            return (
              <FontDetail
                font={match.params.fontDetail}
                fontDetail={this.props.fontDetail}
                getFontDetail={this.props.getFontDetail}
                getFontDetailFromGgl={this.props.getFontDetailFromGgl}
                fontsDetailFromGgl={this.props.fontsDetailFromGgl}
                fontsFromGgl={this.props.fontsFromGgl}
              />
            );
          }} />

          <Route path="/user/:user_name" render={({match}) => {
            return (
              <Mypage
                user={this.props.user}
                
              />
            );
          }}/> 

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
                textEditHandler={this.props.textEditHandler}
                colorPickToggle={this.props.colorPickToggle}
                colorPickHandler={this.props.colorPickHandler}
                dataAdjustHandler={this.props.dataAdjustHandler}
              />
            );
          }} />
        </div>

      </div>
    );
  }
}

export default App;
