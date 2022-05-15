// pages/home/self/self_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,//是否正在进行修改初始为0
    modifyTip: ['修改信息','完成修改'],
    list: ['姓名','年级','所住公寓','联系电话'],
    grade: '',
    Tel: '',
    dorm: '',
    name:'',
  },
  onLoad: function (options) {
    //用于加载数据库中用户存放的信息，options表示从上一页传入的参数列表
    wx.cloud.callFunction({
      name: 'getUserInfomation',
      config: {
        env: 'cloud1-6gfv5139e48ed24a'
      }
    }).then(res => {
      console.log(res)
      this.setData({
        name: res.result.data[0].name,
        dorm: res.result.data[0].dorm,
        grade: res.result.data[0].grade,
        Tel: res.result.data[0].Tel,
      })
      console.log(this.data.name,this.data.dorm,this.data.grade,this.data.Tel)
    })
  },

  inputTyping: function(e) {
    let id = e.currentTarget.dataset.index
    if(id == 0){
      this.setData({
        name: e.detail.value
      })
      console.log("name",this.data.name)
    } else if(id == 1) {
      this.setData({
        grade: e.detail.value
      })
      console.log("grade",this.data.grade)
    } else if(id == 2) {
      this.setData({
        dorm: e.detail.value
      })
      console.log("dorm",this.data.dorm)
    } else if(id == 3) {
      this.setData({
        Tel: e.detail.value
      })
      console.log("Tel",this.data.Tel)
    }
  },

  modifyInfomation: function(e) {
    if(this.data.index == 0){
      this.setData({
        index: 1
      })
      console.log(this.data.index)
    } else if(this.data.index == 1){
      wx.cloud.callFunction({
        name: 'uploadUserInfomation',
        config: {
          env: 'cloud1-6gfv5139e48ed24a'
        },
        data:{
          name: this.data.name,
          grade: this.data.grade,
          dorm: this.data.dorm,
          Tel: this.data.Tel
        }
      })
      this.setData({
        index: 0
      })
      //页面的置换，并显示新值
      console.log(this.data.name,this.data.dorm,this.data.grade,this.data.Tel)
      console.log(this.data.index)
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  

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