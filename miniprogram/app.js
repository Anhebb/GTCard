//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {};
    this.globalData.tempAvatarPaths = '../../images/cardstyle1/label.png';

    // 获取当前用户的openid并存储起来
    wx.cloud.callFunction({
      name: 'getOpenId',
    }).then(res => {
      this.globalData.curUserOpenId = res.result.event.userInfo.openId;
    }).catch(err => {
      console.log(err);
    });
  }
})
