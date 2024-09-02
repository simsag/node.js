const router = require('express')(); 
// express 모듈을 가져와서 라우터 객체 생성, 
// express()는 일반적으로 express 애플리케이션 객체를 생성하는데 
// express.Router()와 같은 방식으로 라우터 객체를 생성하는 것으로 이해가능
const auth = require('./user'); 

router.use('/user', auth);
// /user 경로로 들어오는 모든 요청을 user 모듈에서 정의된 라우터로 처리
// 즉, /user 로 시작하는 모든 경로 (예: /user/뭐시깽이)는 auth 모듈에서 정의된 대로 처리

module.exports = router;
