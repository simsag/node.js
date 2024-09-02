const express = require('express'); // node.js 환경에서 서버를 구축하고 웹 애플리케이션을 개발하기 위해 사용되는 프레임워크, 간단한 api와 미들웨어를 통해 다양한 요구 사항 처리
const cors = require('cors'); // 도메인이 다른 서버끼리 리소스를 주고 받을 때 보안을 위해 설정된 정책, 13줄
const { configDotenv } = require('dotenv');

const router = require('./router/index') 
const { sequelize } = require('./model');
const { redisCli } = require('./redis');


configDotenv();
const port = process.env.PORT || 8000; // 앞에걸 못팢으면 뒤에껄 사용

const app = express(); // app 이라는 서버 객체를 생성(인스턴스), 이 객체를 통해 경로 설정, 미들웨어 추가, 서버 실행 등 가능

app.use(express.urlencoded({extrended: true})); // 미들웨어 -> TIL

app.use(express.json()); // 미들웨어 -> json 형식의 데이터를 처리하기 위해 사용되는 미들웨어
app.use(cors({
   origin: 'localhost', // 허용할 도메인
   methods: ['POST'], // 허용할 HTTP 메서드
   credentials: true // 자격 증명 포함 여부, 클라이언트가 서버에 요청을 보낼 때 자격 증명(예: 쿠키, HTTP 인증 헤더 등)을 포함할 수 있는지
}));

app.use('/', router); // 특정경로 '/'에 대한 모든 요청을 router가 처리

app.listen(port, async () => { // express.js 애플리케이션을 지정된 port에서 실행, async 키워드를 사용하여 비동기 함수로 선언됨.
   console.log(`서버가 ${port} 에서 성공적으로 시작되었습니다`);
   // 서버가 성공적으로 시작되었음

   await redisCli.connect(); // Redis는 key-value 구조로 동작하는 NoSQL, 싱글 스레드 기반으로 돌아가서 굉장히 빠른 DB, 서버와 연결될 때

   sequelize.sync({ force: false }) // 잘 모르겠음 설명 필요
      .then(() => { // 동기화 작업 성공적
         console.log(`DB 준비 완료`)
         // 데이터벳이스와 모델 간의 동기화가 완료되었음
      })
      .catch(err => { // 동기화 작업 중 오류 발생
         console.error(err);
      })
})


