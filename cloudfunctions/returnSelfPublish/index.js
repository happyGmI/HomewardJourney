const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection("lostThing")
    .where({
      openId: wxContext.OPENID
    }).limit(event.number)
    .orderBy('Date','desc')
    .get({
      success:function(res) {
        console.log(res.data)
      }
    })
  }catch(e) {
    console.error(e)
  }
}