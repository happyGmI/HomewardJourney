// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
/*
 * Author: Wei Junwei
 * functionName: 'reMyPublish'
 * Function: 找出三条（limit(3)）某个User发布的失物招领/寻物启事信息
 */
const db = cloud.database()
exports.main = async (event, context) => {
  
  try{
    //仅输出三条数据，且按照最新到最旧进行排序。'desc'时间升序，'asc'时间降序
    return await db.collection('lostThing')
    .orderBy('Date','desc')
    .limit(6)
    .get({
      success: function (res) {
        console.log(res.data)
      }
    })}catch(e) {
      console.error(e.error)
    }
}