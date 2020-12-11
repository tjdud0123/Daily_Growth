# 🦉 oneTicle 서버 폴더 🦉

### 사용 패키지

```
$ yarn add promise-mysql
```

```
$ yarn add rand-token
```

```
$ yarn add jsonwebtoken
```

```
$ yarn add pbkdf2
```

### 폴더구조

```
├── bin
│   └── www
├── controllers
│   ├── article.js
│   ├── history.js
│   ├── note.js
│   └── user.js
├── middlewares
│   └── auth.js
├── models
│   ├── article.js
│   ├── history.js
│   ├── note.js
│   └── user.js
├── modules
│   ├── crypto.js
│   ├── jwt.js
│   ├── pool.js
│   ├── responseMessage.js
│   ├── statusCode.js
│   └── util.js
├── routes
│   ├── article.js
│   ├── history.js
│   ├── index.js
│   ├── note.js
│   └── user.js
├── ...
...
```

### 구현 API 및 요청/응답
[ 👀 wiki 문서 ](https://github.com/tjdud0123/oneTicle/wiki)

#### ✔️ BaseURL = "3.22.173.242:3000"

** uid : userId<br>
** aid : articleId<br>
** nid : noteId<br>
** hid : historyId<br>


#### 계정관련 (User)

* [POST] `/user/signup` - 회원가입

↗️ Request Body

```
{
   "userName":"김취업",
   "email":"tjdud0123@naver.com",
   "password":"1234abc",
   "job": "디자인",
   "jobDetail": "일러스트레이션"
}
```

↘️ Response

```
{
  "status": 204,
  "success": true,
  "message": "회원가입 성공"
}
```
* [POST] `/user/signin` - 로그인

↗️ Request Body

```
{
   "email":"tjdud0123@naver.com",
   "password":"1234abc"
}
```
↘️ Response
```
{
  "status": 200,
  "success": true,
  "message": "로그인 성공",
  "data": {
      "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHgiOjEsIm5hbWUiOiJnbmdzbiIsImlhdCI6MTU4ODU5NjEwOH0.ZvAXsth9RgtwvJRXdjuO3XC6A7uyeFNefhNxi2ok6R4",
    }
}
```
* [GET] `/user/profile` - 마이 페이지 정보 조회

↘️ Response

```
{
  "status": 200,
  "success": true,
  "message": "마이 페이지 조회 성공",
  "data": {
       "userName":"김취업",
       "savedArticles": 37,
       "notesNum": 28,
       "level": 100,
       "job": "디자인",
       "jobDetail": "일러스트레이션"
    }
}
```

#### 아티클 (Article)

* [GET] `/article/today` - 오늘의 아티클 받아보기

↘️ Response

```
{
  "status": 200,
  "success": true,
  "message": "오늘의 아티클 받아보기 성공",
  "data": [
        {
            article_id: 1,
            title: "UI를 위한 패턴",
            previewText: "패턴은 사용자가 디바이스를 조작해행동하는 일반적인 과정을 뜻합니다... ",
            thumbNailUrl: "https://sopt-26.s3.ap-northeast-2.amazonaws.com/1590760250103.jpeg",
            linkUrl:"https://velog.io/@tjdud0123",
            createdAt:"2020-11-23T04:55:03.000Z"
        },
        {
            article_id: 2,
            title: "UX를 위한 패턴",
            previewText: "패턴은 사용자가 디바이스를 조작해행동하는 일반적인 과정을 뜻합니다... ",
            thumbNailUrl: "https://sopt-26.s3.ap-northeast-2.amazonaws.com/1590760250103.jpeg",
            linkUrl:"https://velog.io/@tjdud0123",
            createdAt:"2020-11-23T04:55:03.000Z"
        }
        ...
    ]
}
```
* [POST] `/article/save/:aid` - 아티클 저장

↘️ Response

```
{
  "status": 201,
  "success": true,
  "message": "아티클 저장 성공",
}
```
* [POST] `/article/like/:aid` - 아티클 관심글 등록

↘️ Response

```
{
  "status": 201,
  "success": true,
  "message": "관심글 등록 성공",
}
```
* [DELETE] `/article/like/:aid` - 아티클 관심글 취소

↘️ Response

```
{
    "status": 204,
    "success": true,
    "message": "관심글 삭제 성공"
}
```


#### 노트 (Note)

* [POST] `/note/:aid` - 노트 추가

↗️ Request Body

```
{
    "content": "UI디자인에서 가장 중요한 것이 무엇일까 항상 고민을 많이 해왔는데, 이 아티클을 읽으면서 해답을 찾은 느낌이었다."
}
```

↘️ Response

```
{
    "status": 201,
    "success": true,
    "message": "노트 추가 성공"
}
```
* [PUT] `/note/:nid` - 노트 내용 수정

↗️ Request Body

```
{
    "content": "수정해야지 오늘 ! "
}
```

↘️ Response

```
{
    "status": 204,
    "success": true,
    "message": "노트 수정 성공"
}
```

#### 내 기록 (History)
* [GET] `/history` - 전체 기록 조회

↘️ Response

```
{
    "status": 200,
    "success": true,
    "message": "전체 기록 조회 성공",
    "data": [
        {
            date:"2020-11-26T23:16:44.000Z"
            article_id: 1,
            articleTitle: "UI를 위한 패턴",
            previewText: "패턴은 사용자가 디바이스를 조작해행동하는 일반적인 과정을 뜻합니다... ",
            thumbNailUrl: "https://sopt-26.s3.ap-northeast-2.amazonaws.com/1590760250103.jpeg",
            linkUrl:"https://velog.io/@tjdud0123",
            note_id: 2,
            noteContent: "UI디자인에서 가장 중요한 것이 무엇일까 항상",
            noteCreatedAt:"2020-11-23",
            isLike:true
        },
        {
            date:"2020-11-26T23:16:44.000Z"
            article_id: 1,
            articleTitle: "UI를 위한 패턴",
            previewText: "패턴은 사용자가 디바이스를 조작해행동하는 일반적인 과정을 뜻합니다... ",
            thumbNailUrl: "https://sopt-26.s3.ap-northeast-2.amazonaws.com/1590760250103.jpeg",
            linkUrl:"https://velog.io/@tjdud0123",
            note_id: 2,
            noteContent: "UI디자인에서 가장 중요한 것이 무엇일까 항상",
            noteCreatedAt:"2020-11-23",
            isLike:false
        }
        ...
    ]
}
```
