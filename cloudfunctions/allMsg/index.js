// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
/**
 * author: weijunwei103
 * return  all of message
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {

  return await db.collection("lostThing").get()
  // const wxContext = cloud.getWXContext()


  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}