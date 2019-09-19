# DashBoard (가제/미완)

rss 구독 서비스 웹앱.  
MongoDB, GraphQL, Apollo을 익히기 위해 제작한 프로젝트

여러 feed 사이트를 추가하여 게시물 구독을 할 수 있으며, 추가한 feed 사이트는 제목과 카테고리로 관리 할 수 있습니다. 게시물 리스트는 feed 사이트 및 카테고리별로 숨기기/보이기가 가능하며 읽은 게시물을 읽음 표시가 되며, 수동으로 읽음/안읽음을 조절할 수 있습니다. 새로운 게시물 업데이트는 서버에서 주기적으로 조회하여 업데이트합니다.

[![dashboard video](https://img.youtube.com/vi/UyGTMlGMbOE/0.jpg)](https://www.youtube.com/watch?v=UyGTMlGMbOE) 실행 동영상

### 주요 기능 구현 사항(or 예정)

- [x] google 로그인 기능
  - [x] 로그인 시 유저 데이터 추가
  - [x] 로그인 유지 기능 추가 (cookie)
- [ ] 유저 정보 수정 페이지 구현
- [x] feed 사이트 추가 기능
  - [x] feed 사이트 주소 입력 중 유효성 검사 기능
  - [x] 추가시 기존 카테고리 선택 및 새 카테고리 선택
  - [ ] feed 사이트마다 고유 색상 지정 기능
    - [ ] feed 버튼 및 item 내에도 feed 고유 색상으로 스타일 지정
- [x] feed 설정 기능
  - [x] feed 제목, 카테고리 수정 기능
  - [x] feed 삭제
  - [x] 카테고리 이름 변경 및 해당 카테고리 feed에 전체 반영
- [x] feed 숨기기/보이기 기능
  - [x] 카테고리 내의 feed 전체 숨기기 및 숨기기 해제 시 예전 feed의 보이기 상태 복구 기능
- [x] feed item(게시물) 조회시 읽음 상태로 전환
  - [x] 아이콘을 통해 읽음/안읽음 상태 전환 기능
  - [x] 읽음 상태시 item 스타일 간략화
- [x] 게시물 검색 기능 구현
- [ ] Home 페이지를 소개 페이지로 구현
- [x] 서버의 feed items를 특정 시간마다 업데이트 (게시물 업데이트)
- [ ] server AWS EC2에 배포하기
- [x] client NAS에 배포하기

## Tech Stack

주요 기술 스택

- React
  - create-react-app
  - react-router
- express
- Apollo
  - Apollo-client
  - Apollo-express-server
- GraphQL
- MongoDB
  - mongoose
- etc.
  - SASS (SCSS)
  - FontAwesome
  - GoogleFonts
  - prettier
  - babel
  - moment
