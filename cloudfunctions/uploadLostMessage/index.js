/*
 * Author： Wei Junwei
 * Funtion name: 'uploadLostMessage'
 * Funtion: 发布失物招领
 */
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    db.collection("lostThing").add({
    data: {
      openId: event.id,
      Title: event.Title,
      Date: new Date(event.date),
      datetoString: event.date,
      goodType: event.type,
      place: event.place,
      detailMsg: event.detailMsg,
      imageURL: event.URL,
      lostProperty: event.lostProperty,
      consign: event.consign,
      inputContacts: event.inputContacts,
      inputContactsMethod: event.inputContactsMethod,
      lostAndFound: event.lostAndFound
    },
    success: function(res) {
      console.log(res)
    }
  })
  }catch(e) {
    console.err(e)
  }
}