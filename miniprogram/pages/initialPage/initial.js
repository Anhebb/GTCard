Page({

  /**
   * 页面的初始数据
   */
  data: {
    text1: '您还没有名片',
    text2: '快来创建名片，积累人脉吧~', 
    img1: '../../images/initialPage/bg.png',
    img2: '../../images/initialPage/bg1.png',
    text3: '创建名片'
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

  goToCreateCard: function() {
    // 跳转到创建名片页面
    wx.redirectTo({
      url: '../editCardPage/editCard',
    })
  }
})