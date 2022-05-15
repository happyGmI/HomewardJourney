// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    return await db.collection('user').where({
      _openId: wxContext.OPENID
    }).update({
      data:{
        name: event.name,
        grade: event.grade,
        dorm: event.dorm,
        Tel: event.Tel
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