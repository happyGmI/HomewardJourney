// 从数据库中获取获取用户个人信息界面的信息
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    return await db.collection('user').where({
      _openId: wxContext.OPENID
    }).get({
      success: function(res) {
        console.log(res)
      }
    })
  }catch(e) {
    console.error(e.error)
  }
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}