# [퍼가요(Pergayo)](https://pergayo.com/)

## Introduction
퍼가요는 구글에서 제공하는 웹폰트 API를 이용하여 여러 웹폰트들을 직접 사용해보고 원하는 크기, 자간, 행간 뿐만 아니라 배경색 및 테두리, 그림자 효과 등으로 편집하고 공유할 수 있는 어플리케이션입니다.

## Period
2018년 10월 4일 ~ 10월 19일

## Prerequisites
- Node, NPM 환경기반
- Chrome Browser(권장)

## Installation
### Client
```
git clone https://github.com/kimkyeseung/project_hangeul.git
npm install
npm start
```

### Server
```
git clone https://github.com/kimkyeseung/project_hangeul_server.git
npm install
npm start
```

## Feature
- 메인페이지에서 한글 웹폰트를 간단한 텍스트와 함께 미리볼 수 있습니다.
- 퍼가요 사이트에 회원가입, 로그인을 할 수 있습니다. (회원가입시 바로 로그인됩니다)
- 폰트 디테일페이지에서 해당 폰트에 대한 정보 및 사용가능한 글자들을 확인할 수 있습니다.
- 로그인 후 ```TRYOUT```을 통하여 폰트를 체험할 수 있습니다.
- 폰트 편집 시 최대 3개의 블록을 추가할 수 있습니다. (기본 1개)
- 각 블록마다 다른 폰트를 적용하고 각각 스타일을 편집할 수 있습니다.
- 편집 후 ```소스 공유하기``` 버튼으로 사용할 수 있는 소스로 공유할 수 있습니다.

## Client-Side
- 자바스크립트(ES2015+)를 기본으로 제작하였습니다.
- Redux 라이브러리를 사용한 Flux 아키텍처 기반 설계를 하였습니다.
- React, Webpack, CSS Modules을 사용한 컴포넌트 베이스 UI 아키텍처를 구현하였습니다.
- Material-UI를 이용한 flat하고 일관성있는 디자인전략 추구하였습니다.

## Server-Side
- 자바스크립트 엔진(V8 engine)기반의 서버사이드 플랫폼 Node.js를 사용하였습니다.
- Node.js 웹 어플리케이션 프레임워크 Express를 사용하였습니다.
- JSON Web Token Authentication을 이용하여 효율적인 로그인 세션 관리를 시도하였습니다.
- 대표적인 NoSQL 데이터베이스, MongoDB를 사용하였습니다.
- MongoDB 기반의 Node.js 전용 ODM 라이브러리 Mongoose를 사용하였습니다.
- DB관리 및 조회 시 MongoDB 호스팅 플랫폼인 mlab과 Robo 3T를 이용하였습니다.
- Amazon Web Serviece (S3)를 이용하여 웹폰트 파일 및 @font-face css를 보관하였습니다.

## Things to do
초기 기획은 구글에서 제공하는 API 뿐만 아니라 세상에 존재하는 무료 한글 폰트들을 전부 웹폰트화시켜 디자이너들, 개발자들이 사용할 수 있도록 제공하고자 하는 것이 목표였습니다. 위키피디아와 같이 집단지성을 활용하여 서로가 가진 폰트를 업로드하고 저작권을 정확히 명시하며, 유저들이 스스로 관리하게 되는 사이트를 만들었으면 싶었으나 2주라는 한정된 시간동안 진행하기엔 어려움이 많았고 일부 woff 파일이 웹에서 작동하지 않는 현상의 원인의 정확한 파악이 되지 않아서 현재의 기획으로 변경되었습니다.

- 폰트별 '좋아요' 기능 및 계정별 ```My Page```에서 좋아하는 폰트 모아보기 기능,
- 렌더링 속도 개선
- 폰트 별 style 매칭으로 균일한 폰트 경험 제시하기
- 반응형 웹으로 개선하여 Mobile 에서 같은 경험 제시하기
- 전반적인 UI 개선으로 좋은 사용자 경험 제시하기
- Code Refactoring
- Unit Test

Special thanks to [Ken Huh](https://github.com/Ken123777)
