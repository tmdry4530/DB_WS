const userRepository = require("./user.repository");
const JWT = require("../../lib/jwt");
const jwt = new JWT();

exports.userLogin = async (userid, userpw) => {
  try {
    const result = await userRepository.findOneByUserInfo(userid, userpw);
    if (!result) return { isLogin: false, data: null };
    const token = jwt.sign({ id: result.userid });
    return { isLogin: true, data: token };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findOneByUserId = async (userid) => {
  try {
    const result = await userRepository.findOne("userid", userid);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.userUpdate = async (userid, modify_pw) => {
  try {
    const result = await userRepository.update(userid, modify_pw);
    return result;
  } catch (err) {
    throw new Error("service err" + err.message);
  }
};

exports.getFindOne = async (userid) => {
  try {
    const result = await userRepository.userFindOne(userid);
    return result;
  } catch (err) {
    throw new Error("service err" + err.message);
  }
};

exports.newUserJoin = async (data) => {
  const { new_user_id, new_user_pw } = data;
  try {
    const result = await userRepository.createUserData(
      new_user_id,
      new_user_pw
    );
    return result;
    // return;
  } catch (err) {
    throw new Error(err.message);
  }
};

// 변경 후 - userDelete 추가분(명칭 수정해야할 수도??)
exports.userDelete = async (userid) => {
  try {
    const result = await userRepository.deleteUserData(userid);
    return result;
  } catch (err) {
    throw new Error("service err" + err.message);
  }
};
