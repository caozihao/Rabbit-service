// 1:user
// 2:goods
module.exports = {
  USER_EXIST: {
    code: 10000101,
    message: '已经存在该手机用户，请前往登录'
  },
  USER_NOT_EXIST: {
    code: 10000102,
    message: '该手机用户不存在'
  },
  LOGIN_PASSWORD_ERROR: {
    code: 10000103,
    message: '登录密码错误'
  },
  USER_ACCOUNT_IS_BANNED: {
    code: 10000104,
    message: '您的账号被封禁，请去帮助中心向管理员邮箱发申请解禁'
  },
  SYS_ERROR: {
    code: 10000000,
    message: '系统内部异常'
  }

}