const validator = require('validator'); // 발리데이터, 형식에 맞는지 검사해주는
const { User } = require('../model');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
   try {
      const {userId, name, email, birth, password } = req.body;
      if (!validator.isEmail(email)) { // 이메일 형식 맞음?
         return res.status(406).json({
            error: "구조체가 일치하지 않습니다"
         });
      }

      if (
         !validator.isDate(birth, {
            format: "yyyy-MM-dd", // 이렇게 설정한 날짜 형식이 맞냐?
         })
      ) {
         return res.status(406).json({
            error: "날짜가 아니다"
         })
      }

      if (await User.findOne({ where: {userId}})) {
         return res.status(409).json({
            error: "이미 존재하는 아이디입니다"
         })
      }
      if (await User.findOne({ where: {email} })) { // user 데이터에서 이 이메일이 있는지 하나 찾는다
         return res.status(409).json({
            error: "이미 존재하는 이메일입니다"
         });
      }

      const birthDate = new Date(birth).toISOString(); // birth 가 맞으면 그걸로 데이트객체 생성. toString 으로 하면 날짜가 겁나 길게 나옴. 하지만 이걸 쓰면 2011-10-05 이런식으로 간단하게 나옴
      const hash = bcrypt.hashSync(password, 10); // 해시함

      const newUser = await User.create({ 
         userId,
         name,
         email,
         birth: birthDate,
         password: hash,
      });

      return res.status(201).json({
         data: newUser.id, // auto로 id 자동 생성
         status: 201,
         statusNsg: "회원가입 완료",
      });
   } catch (err) {
      console.error(err);
      return res.status(400).json({
         error: "알 수 없는 에러",
      });
   }
};

module.exports = {
   signUp
}