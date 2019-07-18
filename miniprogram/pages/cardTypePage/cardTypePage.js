// miniprogram/pages/cardTypePage/cardTypePage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type1Display:'block',
    type2Display: 'none',
    cardUiType:''

  },

  choose1: function(event) {
    this.setData({
      type2Display: 'none',
      type1Display: 'block',
    });
    wx.cloud.callFunction({
      name: 'modifyCardUiType',
      data: {
        targetId: app.globalData.cardData._openid,
        newType: 0
      },
      success: function(res) {
        console.log(res);
      },
      fail: function(err) {
        console.log(err);
      }
    });
  },
  choose2: function (event) {
    this.setData({
      type1Display: 'none',
      type2Display: 'block',
    });
    wx.cloud.callFunction({
      name: 'modifyCardUiType',
      data: {
        targetId: app.globalData.cardData._openid,
        newType: 1
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cardUiType: app.globalData.cardData.cardUiType
    });

    if (this.data.cardUiType==0){
      this.choose1();
    }else{
      this.choose2();
    };

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