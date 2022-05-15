Page({
  mixins: [require('../../mixin/themeChanged')],
  data: {
    inputShowed: false,
    inputVal: "",
    curNav:1,
    curNav1:0,
    curNav2:0,
    resultSet: [],
    dialog3: false
  },
  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
    //每输入一个字符，就触发一次这个函数
      let that = this
      this.setData({
          inputVal: e.detail.value
      });
      console.log(e.detail.value)
      if(that.data.inputVal.length > 0){
        wx.cloud.callFunction({
        name: "searshResult",
        config: {
          env: "cloud1-6gfv5139e48ed24a"
        },
        data: {
          searchValue: e.detail.value
        }
      }).then(res => {
        that.setData({
          resultSet: res.result.data
        })
      })
      setTimeout(() => {
        console.log(that.data.resultSet)
      }, 500);
    }

  },
  mixins: [require('../../mixin/themeChanged')],
    close: function() {
        this.setData({
            dialog3: false
        });
    },
  open1:function(e) {
    let id = e.target.dataset.id;
  console.log(id);
      this.setData({
          dialog3: true,
          curNav1: id
      });
  },
  open3:function(e) {
    let id = e.target.dataset.id;
  console.log(id);
      this.setData({
          dialog3: true,
          curNav2: id
      });
  },
/* 把点击到的某一项 设为当前curNav   */

switchRightTab:function(e){
  let id = e.target.dataset.id;
  console.log(id);
  this.setData({
    curNav: id
  })
}
});