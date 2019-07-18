// miniprogram/pages/minePage/minePage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardstyle:'0',
    cardInfo: {
      name: '姓名',
      position: '职位',
      company: '公司',
      address: '办公地点',
      phone: '电话',
      email: '邮箱',
      website: '官网',
      avatarUrl: '../../images/cardstyle1/label.png'
    },
    starCnt: 0,
    viewCnt: 0,
    changable: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    var that = this;

    db.collection('card_collection').where({
      _openid: app.globalData.curUserOpenId
    }).get({
      success: function (res) {
        app.globalData.cardData = res.data[0];
        // 获取用户的名片信息
        that.setData({
          cardInfo: app.globalData.cardData.cardinfo
        });
        // 获取用户的名片头像
        that.data.cardInfo.avatarUrl = app.globalData.cardData.avatarurl;
        that.setData({
          'cardInfo.avatarUrl': app.globalData.cardData.avatarurl
        })
        // 获取收藏数和日期数
        that.setData({
          'starCnt': app.globalData.cardData.starcnt
        })
        that.setData({
          'viewCnt': app.globalData.cardData.viewcnt
        })

        //获取用户选择的卡片样式
        that.setData({
          'cardstyle': app.globalData.cardData.cardUiType
        })
      },
      fail: function (err) {
        console.log(err);
      }
    });
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
    this.onLoad();
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

  goTomodifyMyCard: function() {
    wx.navigateTo({
      url: '../modifyMyCardPage/modifyMyCard',
    })
  },

  goToSharePage: function() {
    wx.navigateTo({
      url: '../sharePage/sharePage',
    })
  },

  goToCardTypePage: function () {
    wx.navigateTo({
      url: '../cardTypePage/cardTypePage',
    })
  },

  goToShareCodePage: function() {
    wx.navigateTo({
      url: '../shareCodePage/shareCode',
    })
  },
  goTomyCaardColPage: function () {
    wx.navigateTo({
      url: '../myCardColPage/myCardCol',
    })
  },
})