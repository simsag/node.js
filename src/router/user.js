const router = require('express')();
const user = require('../service/user');

router.post('/signup', user.signUp); // 회원가입

module.exports = router;