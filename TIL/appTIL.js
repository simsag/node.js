
/*
< dotenv 라이브러리란? >
-> .env 파일에 정의된 환경 변수를 Node.js 애플리케이션에 로드하기 위해 사용되는 라이브러리
-> 환경 변수들은 'KEY=VALUE' 형식으로 정의 

< configDotenv 함수의 역할 >
-> .env 파일에 정의된 환경 변수를 읽어들이고, 이를 process.env 객체에 추가.
-> 이렇게 하면 애플리케이션의 어디에서든지 'process.env.PORT'와 같은 방식으로 환경 변수를 사용할 수있게 됨.

아래 코드 과정 수행
1. .env 파일을 읽는다
2. 그 파일에 정의된 모든 키-값 쌍을 process.env 객체에 추가
3. 이후 애플리케이션에서 process.env 를 통해 환경 변수를 사용할 수 있게 됨.

이렇게 하면 환경 설정을 코드에서 분리할 수 있어, 코드의 가독성과 유지보수성이 높아짐
*/
const { configDotenv } = require("dotenv");

configDotenv();
const port = process.env.PORT || 8000;
console.log(port); // .env 파일에 PORT=8000이 있으면 8000 이 출력



