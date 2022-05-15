// page/component/new-pages/user/user.js
Page({
  data:{
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false

    //以下数据需从云数据库中获得使用
    envId: 'cloud1-6gfv5139e48ed24a',
    lostMsg: [],
    cloudImageURL: []
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
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.cloud.callFunction({
      name: 'returnSelfPublish',
      config: {
        env: this.data.envId
      },
      data: {
         number: 3
      }
    }).then(res => {
      this.setData({
        lostMsg: res.result.data
      })
      // console.log(this.data.lostMsg)
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
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onShow(){
    var that = this;
    /**
     * 获取本地缓存 地址信息
     */
   setTimeout(() => {
    wx.cloud.callFunction({
      name: 'returnSelfPublish',
      config: {
        env: this.data.envId
      },
      data: {
         number: 3
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
   }, 1000);
  },
  /**
   * 页面跳转函数如下
   */
  intoPublish: function() {
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  intoHistory: function() {
    wx.navigateTo({
      url: '../history/history',
    })
  },

  intoSelfInfo: function(){
    wx.navigateTo({
      url: 'self/self_info',
    })
  },

  intoAboutUs: function() {
    wx.navigateTo({
      url: 'aboutUs/aboutUs',
    })
  }
})

/**
 * function-box:
 */