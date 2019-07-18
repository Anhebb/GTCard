// miniprogram/pages/editPage/editPage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardInfo:{
      name:'姓名',
      position:'未填写职位',
      company:'未填写公司',
      address:'未填写办公地点',
      phone:'未填写电话',
      email:'未填写邮箱',
      website:'未填写官网',
      avatarUrl:'../../images/cardstyle1/label.png'
    },
  List:[
    { name: "职  位", placeholder: "请填写您的职位信息", value: "", attribute:"position"},
    { name: "单位名称", placeholder: "请填写您的单位名称", value: "", attribute:"company"},
    { name: "办公地址", placeholder: "请输入您的公司地址", value: "", attribute:"address"},
    { name: "主营业务", placeholder: "请简单介绍您的业务", value: "", attribute:"business"},
    { name: "公司电话", placeholder: "请填写固定电话", value: "", attribute:"telephone"},
    { name: "官  网", placeholder: "请填写公司官网", value: "", attribute: "website"},
    { name: "电子邮箱", placeholder: "请填写您的电子邮箱", value: "", attribute: "email"},
    { name: "微  信", placeholder: "请填写您的微信号码", value: "", attribute: "wechat"},
  ],
  changeable: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  addCardInfoToDatabase: function (cardInfo, avatarUrl) {
    const db = wx.cloud.database();
    db.collection('card_collection').add({
      data: {
        cardinfo: cardInfo,
        starcnt: 0,
        viewcnt: 0,
        starpeople: [],
        viewpeople: [],
        avatarurl: avatarUrl,
        cardUiType: 0
      },
      success: function (res) {
        console.log(res);
        db.collection('card_collection').doc(res._id).get({
          success: function (res) {
            app.globalData.cardData = res.data;
            // 将临时头像图片路径改为默认值
            app.globalData.tempAvatarPaths = '../../images/cardstyle1/label.png';
            wx.hideLoading();
            wx.redirectTo({
              url: '../myCardPage/myCard',
            });
          }
        });
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function() {
        
      }
    })
  },

  handleSubmitInfo: function(e) {
    console.log(e.detail.value);
    let defaultValue = "未填写";
    let avatarUrl = '../../images/cardstyle1/label.png'
    let cardInfo = e.detail.value;

    if (e.detail.value.name === '' || e.detail.value.phone === '') {
      wx.showToast({
        icon: 'none',
        title: '请填写必填项信息'
      });
      
      return ;
    }

    // 将其他空白项设为默认值
    for (var i in cardInfo) {
      if (cardInfo[i] === '') cardInfo[i] = defaultValue;
    }

    wx.showLoading({
      title: '上传名片中',
    })
    if (app.globalData.tempAvatarPaths !== '../../images/cardstyle1/label.png') {
      // 如果用户选择上传头像图片，则将其图片上传
      wx.cloud.uploadFile({
        cloudPath: 'avatar/' + Date.now() + app.globalData.tempAvatarPaths.match(/\.[^.]+?$/)[0], // 文件名称
        filePath: app.globalData.tempAvatarPaths,
        success: res => {
          avatarUrl = res.fileID;
          // 添加名片数据库记录
          this.addCardInfoToDatabase(cardInfo, avatarUrl);
        },
        fail: err => {
          console.log(err);
        }
      })
    } else {
      // 如果用户不选择上传头像图片
      // 直接添加名片数据库记录
      this.addCardInfoToDatabase(cardInfo, avatarUrl);
    }
  },

  handleInput: function(e) {
    if (e.currentTarget.id === 'name') {
      this.setData({
        'cardInfo.name': e.detail.value
      })
    } else if (e.currentTarget.id === 'phone') {
      this.setData({
        'cardInfo.phone': e.detail.value
      })
    } else if (e.currentTarget.id === 'position') {
      this.setData({
        'cardInfo.position': e.detail.value
      })
    } else if (e.currentTarget.id === 'company') {
      this.setData({
        'cardInfo.company': e.detail.value
      })
    }

    switch (e.currentTarget.id) {
      case 'name':
        this.setData({
          'cardInfo.name': e.detail.value
        });
        break;
      case 'phone':
        this.setData({
          'cardInfo.phone': e.detail.value
        });
        break;
      case 'position':
        this.setData({
          'cardInfo.position': e.detail.value
        });
        break;
      case 'company':
        this.setData({
          'cardInfo.company': e.detail.value
        });
        break;
      case 'address':
        this.setData({
          'cardInfo.address': e.detail.value
        });
        break;
      case 'email':
        this.setData({
          'cardInfo.email': e.detail.value
        });
        break;
      case 'website':
        this.setData({
          'cardInfo.website': e.detail.value
        });
        break;
      default:
        break;
    }
  }
})