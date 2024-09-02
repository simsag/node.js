// 환경 변수 설정
// dotenv 패키지를 사용하여 환경 변수에서 데이터베이스 설정을 가져오는 설정 파일
const { configDotenv } = require('dotenv');

configDotenv();

module.exports = {
   "username": process.env.DB_USERNAME,
   "password": process.env.DB_PASSWORD,
   "database": process.env.DB_SCHEMA,
   "host": process.env.DB_HOST,
   "port": 3306, // mySQL 기본 port
   "dialect": "mysql" // 어떤 데이터베이스 쓰는지
}