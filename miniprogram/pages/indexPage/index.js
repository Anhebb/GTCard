// miniprogram/pages/indexPage/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();

    wx.cloud.callFunction({
      name: 'getOpenId',
    }).then(r => {
      app.globalData.curUserOpenId = r.result.event.userInfo.openId;
      db.collection('card_collection').where({
        _openid: app.globalData.curUserOpenId
      }).get({
        success: function (res) {
          console.log(res.data);
          if (res.data.length > 0) {
            // 如果在数据库查找到该用户已创建名片
            // 存储用户的名片数据，跳转到我的名片页面
            app.globalData.cardData = res.data[0];
            wx.redirectTo({
              url: '../myCardPage/myCard',
            });
          } else {
            // 如果在数据库没有查找到该用户的名片
            // 跳转到创建名片页面
            wx.redirectTo({
              url: '../initialPage/initial',
            });
          }
        },
        fail: function (err) {
          console.log(err);
        }
      })
    }).catch(err => {
      console.log(err);
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