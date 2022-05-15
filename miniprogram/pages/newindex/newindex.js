var app = getApp()
Page({
  data: {
    //向模板传入数据
    // 轮播
    text: "1.希望能在这里找到您丢失的物品呐。<一个专注的失物招领处>",
    animation: null,
    timer: null,
    duration: 0,
    textWidth: 0,
    wrapWidth: 0,
    envId: 'cloud1-6gfv5139e48ed24a',
    lostMsg: [],
    lostPropertyList: [],
    cloudImageURL: []
  },

  //事件处理函数
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
      wx.cloud.callFunction({
        name: 'userLogin',
        config: {
          env: this.data.envId
        },
        data: {
        }
      }).then()
    }
    wx.cloud.callFunction({
      name: 'returnHomePublish',
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
  },
  onShow() {
    this.initAnimation(this.data.text)
    setTimeout(() => {
      wx.cloud.callFunction({
        name: 'returnHomePublish',
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
          // console.log(res.result)
          this.setData({
            cloudImageURL: res.result
          })
        })
      })
    }, 2000);
  },
  
  jumpMoreNotice: function() {
    wx.navigateTo({
      url: '../moreNotice/moreNotice',
    })
  },

  toAllLost: function() {
    wx.navigateTo({
      url: '../all/all',
    })
  },

  toDetailPage: function(e) {
    let id = e.currentTarget.dataset.id
    let _id = this.data.lostMsg[id]._id
    let imageurl = this.data.cloudImageURL[id].tempFileURL
    wx.navigateTo({
      url: '../index/index?_id='+_id+'&imageurl='+ imageurl,
    })
  },
  jumpLostDetail :function(e) {
    let id = e.currentTarget.dataset.id
    let _id = this.data.lostMsg[id]._id
    let imageurl = this.data.cloudImageURL[id].tempFileURL
    // console.log(imageurl)
    // console.log(id)
    wx.navigateTo({
      url: '../index/index?_id='+_id+'&imageurl='+ imageurl,
    })
  },

  toAllFind: function() {
    wx.navigateTo({
      url: '../findMsg/findMsg',
    })
  },
  jumpFindDetail: function(e) {

  },
  onShareAppMessage: function () {
    return {
      title: 'Y&W小程序设计团队',
      desc: '专注的失物招领平台!',
      path: '/pages/newindex/newindex'
    }
  },
  tofind: function () {
    wx.navigateTo({
      url: '../publish/publish?lost=' + 0,
    })
  },
  toLost: function () {
    wx.navigateTo({
      url: '../publish/publish?lost=' + 1,
    })
  },
  openMap: function () {
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        wx.openLocation({
          latitude: 34.124381, // 纬度，范围为-90~90，负数表示南纬
          longitude: 108.82828, // 经度，范围为-180~180，负数表示西经
          scale: 28, // 缩放比例  
          name: '西安电子科技大学丁香11号楼',
          address: '二层I区203',
        })
      }
    })
  },
  onHide() {
    this.destroyTimer()
    this.setData({
      timer: null
    })
  },
  onUnload() {
    this.destroyTimer()
    this.setData({
      timer: null
    })
  },
  destroyTimer() {
    if (this.data.timer) {
      clearTimeout(this.data.timer);
    }
  },
  initAnimation(text) {
    let that = this
    this.data.duration = 15000
    this.data.animation = wx.createAnimation({
      duration: this.data.duration,
      timingFunction: 'linear'   
    })
    let query = wx.createSelectorQuery()
    query.select('.content-box').boundingClientRect()
    query.select('#text').boundingClientRect()
    query.exec((rect) => {
      that.setData({
        wrapWidth: rect[0].width,
        textWidth: rect[1].width
      }, () => {
        this.startAnimation()
      })
    })
  },
  startAnimation() {
    const resetAnimation = this.data.animation.translateX(this.data.wrapWidth).step({ duration: 0 })
    this.setData({
      animationData: resetAnimation.export()
    })
    const animationData = this.data.animation.translateX(-this.data.textWidth).step({ duration: this.data.duration })
    setTimeout(() => {
      this.setData({
        animationData: animationData.export()
      })
    }, 100)
    const timer = setTimeout(() => {
      this.startAnimation()
    }, this.data.duration)
    this.setData({
      timer
    })
  },
})
