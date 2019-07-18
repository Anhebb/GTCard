// miniprogram/pages/Card/code/code.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareCodeImage: '',
    name: '张毅',
    position: '高级前端工程师',
    avatarUrl: '../../images/shareCodePage/图层 3.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在生成分享码',
    })
    wx.cloud.callFunction({
      name: 'getShareCode',
      data: {
        targetId: app.globalData.curUserOpenId
      },
      success: function(res) {
        console.log(res);
        that.setData({
          shareCodeImage: 'data:image/png;base64,' + wx.arrayBufferToBase64(res.result.buffer)
        });
        wx.hideLoading();
      },
      fail: function(err) {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          icon: 'none',
          title: '分享码生成失败'
        })
      }
    })
    this.setData({
      name: app.globalData.cardData.cardinfo.name,
      position: app.globalData.cardData.cardinfo.position,
      avatarUrl: app.globalData.cardData.avatarurl
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

  },

  handleSaveImage: function() {
    // 检查用户是否授权
    let that = this;

    wx.getSetting({
      success: function(res) {
        // 如果用户已经授权保存到相册
        if(res.authSetting['scope.writePhotosAlbum']) {
          let startIdx = that.data.shareCodeImage.indexOf('base64,') + 7;
          let timestamp = new Date().getTime()

          wx.showLoading({
            title: '正在保存',
          });
          wx.getFileSystemManager().writeFile({
            filePath: `${wx.env.USER_DATA_PATH}/sharecode_${timestamp}.png`,
            data: that.data.shareCodeImage.slice(startIdx),
            encoding: 'base64',
            success: r1 => {
              wx.saveImageToPhotosAlbum({
                filePath: `${wx.env.USER_DATA_PATH}/sharecode_${timestamp}.png`,
                success: r2 => {
                  wx.hideLoading();
                  wx.showToast({
                    icon: 'none',
                    title: '保存成功',
                  })
                },
                fail: e2 => {
                  wx.hideLoading();
                  wx.showToast({
                    icon: 'none',
                    title: '保存失败'
                  })
                }
              })
            },
            fail: e1 => {
              wx.hideLoading();
              wx.showToast({
                icon: 'none',
                title: '保存失败'
              })
            }
          })
        }
        // 如果用户没有授权保存到相册
        else {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              // 用户已经同意保存到相册功能
              let startIdx = that.data.shareCodeImage.indexOf('base64,') + 7;
              let timestamp = new Date().getTime()

              wx.showLoading({
                title: '正在保存',
              });
              wx.getFileSystemManager().writeFile({
                filePath: `${wx.env.USER_DATA_PATH}/sharecode_${timestamp}.png`,
                data: that.data.shareCodeImage.slice(startIdx),
                encoding: 'base64',
                success: r1 => {
                  wx.saveImageToPhotosAlbum({
                    filePath: `${wx.env.USER_DATA_PATH}/sharecode_${timestamp}.png`,
                    success: r2 => {
                      wx.hideLoading();
                      wx.showToast({
                        icon: 'none',
                        title: '保存成功',
                      })
                    },
                    fail: e2 => {
                      wx.hideLoading();
                      wx.showToast({
                        icon: 'none',
                        title: '保存失败'
                      })
                    }
                  })
                },
                fail: e1 => {
                  wx.hideLoading();
                  wx.showToast({
                    icon: 'none',
                    title: '保存失败'
                  })
                }
              })
            },
            fail() {
              wx.showToast({
                icon: 'none',
                title: '请到关于->设置中授权保存到相册!'
              })
              wx.openSetting({
                success(res) {
                  console.log(res.authSetting);
                }
              })
            }
          });
        }
      },
      fail: function(err) {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          icon: 'none',
          title: '保存失败'
        })
      }
    })
  }
})