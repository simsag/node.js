const { createClient } = require('redis'); // 이 함수는 Redis 클라이언트 인스턴스를 생성하는 데 사용

const redisCli = new createClient({ legacyMode: true }); // 솔직히 이건 잘 모르겠음
// Redis 클라이언트 인스턴스 생성
// legacyMode: true 옵션은 레거시 API 모드를 활성화. 이는 이전 버전의 Redis 클라이언트와 호환되도록 도움줌.

redisCli.on('connect', () => {
   // connect 이벤트는 Redis 클라이언트가 Redis 서버에 성공적으로 연결되었을 때 발생
   console.log(`Redis 서버가 초기화되었습니다`);
})
redisCli.on('error', err => {
   // error 이벤트는 Redis 클라이언트가 Redis 서버와의 연결 중에 오류가 발생했을 때 발생
   console.error(err)
})

module.exports = {
   redisCli
   // redisCli 인스턴스를 모듈의 내보내기로 설정
   // 다른 파일에서 이 모듈을 require 하여 redisCli 인스턴스를 사용할 수 있게 함
}