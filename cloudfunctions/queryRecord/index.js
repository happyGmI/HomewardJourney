// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
/*
 * Author: Wei Junwei
 * functionName: 'queryRecord'
 * Function: 查询失物招领/寻物启事中的某条数据（是否将失物招领和寻物启事分开？）
 */
exports.main = async (event, context) => {
  try {
    return await db.collection('lostThing').where({
    _id: event._id
  }).get({
    success: function (res) {
      console.log(res.data)
    }
  })}catch(e) {
    console.error()
  } 
}