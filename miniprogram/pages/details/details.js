// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    envId: 'cloud1-6gfv5139e48ed24a',
    _id: '',
    url:'',
    record: '',
    contactWho: '联系ta/联系失物招领处',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options._id)
    console.log(options.imageurl)
    this.setData({
      _id: options._id,
      url: options.imageurl
    })
    wx.showLoading({
      title: '',
    })
   wx.cloud.callFunction({
      name: 'queryRecord',
      config: {
        env: this.data.envId
      },
      data: {
        _id: this.data._id
      }
      
    }).then((resp) => {
      console.log(this.data.envId),
      this.setData({
        record: resp.result.data
      })
      console.log(this.data.record),
     wx.hideLoading()
   }).catch((e) => {
      console.log(e)
     wx.hideLoading()
   })
  },

  contact:function() {
    wx.makePhoneCall({
      phoneNumber: '13174530720' //这个号码来自上一页的this.data.record[0].TEL
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})