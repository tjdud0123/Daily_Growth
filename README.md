# 🌱 oneTicle
성장을 위한 1일 1아티클 서비스 with PWA
![image](https://user-images.githubusercontent.com/22907830/101022669-09850f80-35b5-11eb-8876-9274a419101a.png)

### ERD
![image](https://user-images.githubusercontent.com/22907830/101021847-cbd3b700-35b3-11eb-9e41-8a96f6809ccc.png)

### API
#### ✔️ BaseURL = "http://3.22.173.242"


** aid : articleId<br>
** nid : noteId<br>


### 계정관련 (User)

* [POST] `/user/signup` - 회원가입
* [POST] `/user/signin` - 로그인
* [GET] `/user/profile` - 마이 페이지 정보 조회

### 아티클 (Article)

* [GET] `/article/today` - 오늘의 아티클 받아보기
* [POST] `/article/save/:aid` - 아티클 저장
* [POST] `/article/like/:aid` - 아티클 좋아요
* [DELETE] `/article/like/:aid` - 아티클 좋아요 취소


### 노트 (Note)

* [POST] `/note/:aid` - 노트 추가
* [PUT] `/note/:nid` - 노트 내용 수정


### 내 기록 (History)

* [GET] `/history` - 전체 기록 조회
