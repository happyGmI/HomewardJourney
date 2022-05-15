// pages/all/all.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'请选择',
    type: ['请选择','一卡通/身份证', '雨伞', '钱包','文具'],
    index: 0,
    goodType: '请选择',
    lost: true,
    envId: 'cloud1-6gfv5139e48ed24a',
    lostMsg: [],
    cloudImageURL: [],
    target: 0
  },

  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value])
    let that = this
    that.setData({
      index: e.detail.value,
    })
    setTimeout(() => {  
      that.setData({
        goodType: that.data.type[that.data.index]
      })
      console.log(that.data.goodType)
    }, 300);
  },
  lost:function() {
    this.setData({
      lost: true
    })
  },
  found:function() {
    this.setData({
      lost: false
    })
  },
  toDetailPage:function(e) {
    let id = e.currentTarget.dataset.id
    let _id = this.data.lostMsg[id]._id
    let imageurl = this.data.cloudImageURL[id].tempFileURL
    // console.log(imageurl)
    // console.log(id)
    wx.navigateTo({
      url: '../index/index?_id='+_id+'&imageurl='+ imageurl,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'allMsg',
      config: {
        env: this.data.envId
      }
    }).then(res => {
      this.setData({
        lostMsg: res.result.data
      })
      console.log(this.data.lostMsg)

      let list = []
      for(var i=0; this.data.lostMsg[i]!=null;i++ ) {
        list.push(this.data.lostMsg[i].imageURL)
      }
      // console.log(list)
      wx.cloud.callFunction({
        name: 'getCloudTempFileURL',
        config: {
          env: 'cloud1-6gfv5139e48ed24a'
        },
        data: {
          list: list
        }
      }).then( res =>{
        console.log(res.result)
        this.setData({
          cloudImageURL: res.result
        })
      })
    })
    console.log(this.data.lostMsg)
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