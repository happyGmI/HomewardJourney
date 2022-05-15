/**
 * Athor：魏俊玮
 * Date： 2021/11/4
 * Function：返回模糊搜索以后的集合
 */
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  let searchValue = event.searchValue;
  return await db.collection("lostThing").where({
    Title: db.RegExp({
      regexp: searchValue,
      Option: "i"
    })
  }).get()
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}