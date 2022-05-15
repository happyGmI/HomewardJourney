// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    envId: 'cloud1-6gfv5139e48ed24a',
    title: "",
    place: "",
    time: "",
    detail: "",
    Tel: '',
    contacts: ''
  },
  onLoad(options) {
    console.log(options._id)
    console.log(options.imageurl)
    let that = this
    that.setData({
      _id: options._id,
      url: options.imageurl
    })
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'queryRecord',
      config: {
        env: that.data.envId
      },
      data: {
        _id: that.data._id,
      }
        
    }).then((resp) => {
      console.log(that.data.envId),
      that.setData({
        record: resp.result.data,
        title: resp.result.data[0].Title, 
        place: resp.result.data[0].place, 
        detail: resp.result.data[0].detailMsg,
        time: resp.result.data[0].datetoString,
        contacts: resp.result.data[0].inputContacts,
        Tel: resp.result.data[0].inputContactsMethod
      })
      console.log(that.data.title)
      console.log(that.data.record),
      wx.hideLoading()
    }).catch((e) => {
      console.log(e)
      wx.hideLoading()
    })
    console.log(that.data.title)
  },
  contact: function() {
    let that = this
    wx.makePhoneCall({
      phoneNumber: that.data.Tel,
    })
  }
})
