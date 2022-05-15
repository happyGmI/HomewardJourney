Component({
  data: {
    active: 0,
    imageURL1: '../../images/tabBar/home.jpg',
    imageURL2: '../../images/tabBar/selectMy.png'
  },
  methods: {
    //页面跳转
    switchJump: function(e){
      let url = e.currentTarget.dataset.url;
      let key = e.currentTarget.dataset.active;
      console.log(key)
      if(key == null) {
        key = 0
        this.setData({
          imageURL1: '../../images/tabBar/selectHome.jpg',
          imageURL2: '../../images/tabBar/my.png'
        })
      } else if(key==1){
        this.setData({
          imageURL1: '../../images/tabBar/home.jpg',
          imageURL2: '../../images/tabBar/selectMy.png'
        })
      }
      this.setData({
        active: key,
      })
      console.log(this.data.active)
      wx.switchTab({
        url: url,
      })
    }
  }
})