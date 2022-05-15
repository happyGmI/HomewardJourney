// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    db.collection('user').add({
    data: {
      _openId: wxContext.OPENID,
      name: "",
      dorm: "",
      grade: "",
      Tel: ""
    }
  }).then({
    success:function() {
      console.log("成功写入数据")
    }
  })
  }catch(e) {
    console.error(e.error)
  }
}