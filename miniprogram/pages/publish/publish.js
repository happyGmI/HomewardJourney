Page({
  data:{
    find: 0,
    lost: 1,
    completion: 0,
    tipMsg: '',

    openId: '',//用户个人的openId
    
    inputTitle: '',//失物招领的标题
    array: ['一卡通/身份证', '雨伞', '钱包','文具'],//物品的类别数组
    index: 0,//类别索引
    goodType: '',//array[index]

    multiArray: [
    ['教学区', '生活区'], 
    ['A楼', 'B楼', 'C楼', 'D楼', 'E楼'],
    ['A-101', 'A-102','A-103','A-205','A-201','A-301']
    ],//物品丢失的地点数组
    multiIndex: [0, 0, 0],//地点索引号
    place: '未选择丢失地点',//multiArray[0][multiIndex[0]] + multiArray[1][multiIndex[1]] + multiArray[2][multiIndex[2]]

    date: '未选择丢失时间', //日期

    consign: false,//是否是需要寄存失物招领处
    lostPropertyIndex: 0,
    lostPropertyList: ['不寄存至失物招领处','丁香一号书院失物招领处','海棠二号书院失物招领处'],//失物招领处信息
    lostProperty: '未选择失物招领处',

    files: [],//图片临时存放的地址
    inputVal: '',//存放附加信息内容

    inputContacts: '',
    inputContactsMethod: '',
    
    lostAndFound: true,
    /******分割线 ----以上内容均需存入数据库中------*/
    envId: 'cloud1-6gfv5139e48ed24a',
    record: '',
    dialog: false,
  },
  onLoad:function(options) {
    if(options.lost == 0) {
      this.setData({
        find: 0,
        lost: 1,
        lostAndFound: true
      })
    }else if(options.lost == 1) {
      this.setData({
        find: 1,
        lost: 0,
        lostAndFound: false
      })
    }
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value])
    this.setData({
      index: e.detail.value,
      goodType: this.data.array[this.data.index]
    })
  },

  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['A楼', 'B楼', 'C楼', 'D楼', 'E楼'];
            data.multiArray[2] = ['A-101', 'A-102','A-103','A-205','A-201','A-301'];
            break;
          case 1:
            data.multiArray[1] = ['丁香宿舍', '海棠宿舍', '竹园宿舍'];
            data.multiArray[2] = ['I区', 'II区'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['A-101', 'A-102','A-103','A-205','A-201','A-301'];
                break;
              case 1:
                data.multiArray[2] = ['B-101', 'B-102','B-103','B-205','B-201','B-301'];
                break;
              case 2:
                data.multiArray[2] = ['C-101', 'C-102','C-103','C-205','C-201','C-301'];
                break;
              case 3:
                data.multiArray[2] = ['D-101', 'D-102','D-103','D-205','D-201','D-301'];
                break;
              case 4:
                data.multiArray[2] = ['E-101', 'E-102','E-103','E-205','E-201','E-301'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['I区', 'II区'];
                break;
              case 1:
                data.multiArray[2] = ['I区', 'II区'];
                break;
              case 2:
                data.multiArray[2] = ['I区', 'II区'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        // console.log(data.multiIndex);
        break;
    }
    this.setData(data)
    this.setData({
      place: data.multiArray[0][data.multiIndex[0]] + data.multiArray[1][data.multiIndex[1]] + data.multiArray[2][data.multiIndex[2]]
    });
    console.log(data)
  },

  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindLostProperty: function(e) {
    let id = e.detail.value
    this.setData({
      lostPropertyIndex: id,
      lostProperty: this.data.lostPropertyList[id]
    })
    if(id == 0){
      this.setData({
        consign: false
      })
    } else {
      let that = this
      wx.cloud.callFunction({
        name: 'getLostOfficeContact',
        config: {
          env: that.data.envId
        },
        data: {
          officeName: that.data.lostPropertyList[id]
        }
      }).then(res => {
        console.log(res)
        that.setData({
          inputContactsMethod: res.result.data[0].tel
        })
      })
      this.setData({
        consign: true,
        inputContacts: this.data.lostPropertyList[id],
        inputContactsMethod: ''
      })
    }
    console.log(id)
  },
  previewImage: function(e){
    wx.previewImage({
       current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  close: function () {
    this.setData({
        dialog: false,
     })
  },
  inputTitle: function (e) {
    //每输入一个字符，就触发一次这个函数
      this.setData({
        inputTitle: e.detail.value
      });
      // console.log(this.data.inputVal)
  },
  //inputTyping用于输入附加信息文本
  inputTyping: function (e) {
    //每输入一个字符，就触发一次这个函数
      this.setData({
          inputVal: e.detail.value
      });
      // console.log(this.data.inputVal)
  },
  inputContacts: function (e) {
    //每输入一个字符，就触发一次这个函数
      this.setData({
        inputContacts: e.detail.value
      });
      // console.log(this.data.inputVal)
  },
  inputContactsMethod: function (e) {
    //每输入一个字符，就触发一次这个函数
      this.setData({
        inputContactsMethod: e.detail.value
      });
      // console.log(this.data.inputVal)
  },
  chooseImage: function (e) {
    //目前只支持上传一张照片
    var that = this;
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
                files: that.data.files.concat(res.tempFilePaths)
            });
            // console.log(that.data.files[0])
            // console.log(that.data.files)
        }
    })
  },
  pickup:function(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    if(id == 0) {
      this.setData({
        find: 0,
        lost: 1,
        lostAndFound: true
      })
    } else if(id == 1) {
      this.setData({
        find: 1,
        lost: 0,
        lostAndFound: false
      })
    }
  },
  upload: function() {
    let that = this
    if(that.data.files[0] == undefined) {
      that.setData({
        completion: 1,
        tipMsg: '图片缺失'
      })
    } else {
      that.setData({
        completion: 0
      })
    }
   if(that.data.completion == 0) {
    wx.showModal({
        title: '提示',
        content: '是否确认上传',
      success:function(e) {
        if(e.confirm) {
          console.log("用户上传成功")
          var resp = ''
          var place = that.data.multiArray[0][that.data.multiIndex[0]] + that.data.multiArray[1][that.data.multiIndex[1]] + that.data.multiArray[2][that.data.multiIndex[2]]
          var goodType = that.data.array[that.data.index]
          var lostProperty = ''
          if(that.data.consign) {
            lostProperty = that.data.lostPropertyList[that.data.lostPropertyIndex]
            console.log(that.data.lostPropertyList[that.data.lostPropertyIndex])
          }
          console.log(lostProperty)
          //调用云函数，得到用户的openid
          wx.cloud.callFunction({
            name: 'getId',
            config: {
              env: that.data.envId
            }
          }).then(res=>{
            let i = 100000
            resp = res.result.openid
            console.log(resp)
            //调用云函数向数据库中插入行
            wx.cloud.uploadFile({
              // 指定上传到的云路径
              cloudPath: i /(new Date().getTime())/(Math.floor(Math.random()*1000000))+'.png',
              // 指定要上传的文件的小程序临时文件路径
              filePath: that.data.files[0],
              config: {
                env: that.data.envId
              },
            }).then(res => {
              that.setData({
                files :[res.fileID],
              })
              wx.hideLoading()
              wx.cloud.callFunction({
                name: "uploadLostMessage",
                config: {
                  env: that.data.envId
                },
                data: {
                  //用于存放上述选项中的内容
                  id: resp,
                  Title: that.data.inputTitle,
                  date: that.data.date,
                  type: goodType,
                  place: place,
                  detailMsg: that.data.inputVal,
                  URL: that.data.files[0],
                  consign: that.data.consign,
                  lostProperty: lostProperty,
                  inputContacts: that.data.inputContacts,
                  inputContactsMethod: that.data.inputContactsMethod,
                  lostAndFound: that.data.lostAndFound
                }
              }).catch(console.error) 

            }).catch((e) => {
              console.log(e)
              wx.hideLoading()
            })
          })
          that.setData({
          dialog: true
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            })
          }, 500);
        } else if(e.cancel) {
          console.log("用户取消")
        }
      }
    })
   } else {
    wx.showModal({
      title: '提示',
      content: that.data.tipMsg,
      success:function(e) {
        if(e.confirm) {
          console.log("用户重试")
        } else if(e.cancel) {
          console.log("用户取消")
        }
      }
    })
   }
  }
})