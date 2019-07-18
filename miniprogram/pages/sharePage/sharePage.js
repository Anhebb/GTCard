// miniprogram/pages/sharePage/sharePage.js
var util = require('../../libs/utils/util.js');
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardstyle:'0',
    personInfo: {
      email: '',
      website: '',
      avatarUrl: '../../images/cardstyle1/label.png'
    },
    List: [
      { name: "姓  名", value: "李嘉庚", attribute: "name" },
      { name: "手  机",  value: "13232146316", attribute: "phone" },
      { name: "职  位",  value: "前端工程师", attribute: "position" },
      { name: "单位名称",  value: "肇庆学院", attribute: "company" },
      { name: "办公地点",  value: "肇庆市迎宾大道北侧", attribute: "address" },
    ],
    thisCardOpenId: '',
    isStared: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let target_openid = options.targetId;
    this.data.thisCardOpenId = options.targetId;
    let that = this;

    if (target_openid === undefined) {
      // 现在是本人查看名片，所以只需要
      // 获取本人的名片信息
      this.setData({
        'List[0].value': app.globalData.cardData.cardinfo.name,
        'List[1].value': app.globalData.cardData.cardinfo.phone,
        'List[2].value': app.globalData.cardData.cardinfo.position,
        'List[3].value': app.globalData.cardData.cardinfo.company,
        'List[4].value': app.globalData.cardData.cardinfo.address,
        'personInfo.email': app.globalData.cardData.cardinfo.email,
        'personInfo.website': app.globalData.cardData.cardinfo.website,
        'personInfo.avatarUrl': app.globalData.cardData.avatarurl,
        'thisCardOpenId': app.globalData.cardData._openid
      });
      this.setData({
        'cardstyle': app.globalData.cardData.cardUiType
      });
    } else {
      // 现在是对方查看某人名片，所以需要
      // 去数据库获取某人的名片信息
      const db = wx.cloud.database();
      db.collection('card_collection').where({
        _openid: target_openid
      }).get({
        success: function(res) {
          that.setData({
            'List[0].value': res.data[0].cardinfo.name,
            'List[1].value': res.data[0].cardinfo.phone,
            'List[2].value': res.data[0].cardinfo.position,
            'List[3].value': res.data[0].cardinfo.company,
            'List[4].value': res.data[0].cardinfo.address,
            'personInfo.email': res.data[0].cardinfo.email,
            'personInfo.website': res.data[0].cardinfo.website,
            'personInfo.avatarUrl': res.data[0].avatarurl,
            'thisCardOpenId': res.data[0]._openid,
            'cardstyle': res.data[0].cardUiType
          });
        },
        fail: function(err) {
          console.log(err);
        }
      });

      // 查看该用户是否已经收藏过某人的名片
      wx.cloud.callFunction({
        name: 'getOpenId',
      }).then(res => {
        let viewUserId = res.result.event.userInfo.openId;
        db.collection('card_collection').where({
          _openid: target_openid
        }).get({
          success: function(res) {
            let starPeopleList = res.data[0].starpeople;
            for (var i = 0; i < starPeopleList.length; i++) {
              if (starPeopleList[i].userId === viewUserId) {
                that.setData({
                  isStared: true
                });
                break;
              }
            }
          },
          fail: function(err) {
            console.log(err);
          }
        });
      }).catch(err => {
        console.log(err);
      });

      // 将某人的人气值加1
      wx.cloud.callFunction({
        name: 'addViewcnt',
        data: {
          targetId: target_openid
        },
        success: function (r) {
          console.log(r);
        },
        fail: function (e) {
          console.log(e);
        }
      });

      // 获取当前用户的openid
      wx.cloud.callFunction({
        name: 'getOpenId',
      }).then(res => {
        let viewUserId = res.result.event.userInfo.openId;
        // 查找改用户的名片信息
        db.collection('card_collection').where({
          _openid: viewUserId
        }).get({
          success: function(r) {
            console.log(r.data);
            // 若该用户已经有添加名片
            if (r.data.length > 0) {
              // 获取viewpeople列表
              db.collection('card_collection').where({
                _openid: target_openid
              }).get({
                success: function(r1) {
                  let viewpeopleList = r1.data[0].viewpeople;
                  let needUpdate = true;
                  for (var i = 0; i < viewpeopleList.length; i++) {
                    if (viewpeopleList[i].userId === viewUserId) needUpdate = false;
                  }
                  if (needUpdate) {
                    // 若改用户还没有看过该名片
                    // 将该用户的名片信息添加到viewpeople中
                    console.log(util.formatTime(new Date()));
                    wx.cloud.callFunction({
                      name: 'addUserToViewpeople',
                      data: {
                        targetId: target_openid,
                        newUserId: viewUserId,
                        viewDate: util.formatTime(new Date())
                      },
                      success: function (r2) {
                        console.log(r2);
                      },
                      fail: function (e2) {
                        console.log(e2);
                      }
                    })
                  }
                },
                fail: function(e1) {
                  console.log(e1);
                }
              });
            }
          }
        })
      }).catch(err => {
        console.log(err);
      });
    }
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
    return {
      title: '这是我的名片，交个朋友吧！',
      path: '/pages/sharePage/sharePage?targetId=' + this.data.thisCardOpenId,
    }
  },

  goToIndexPage: function() {
    wx.reLaunch({
      url: '/pages/indexPage/index',
    })
  },

  handleStarEvent: function() {
    console.log("点击了收藏");
    const db = wx.cloud.database();
    let that = this;

    // 获取当前用户的openid
    wx.cloud.callFunction({
      name: 'getOpenId',
    }).then(res => {
      let viewUserId = res.result.event.userInfo.openId;
      if (viewUserId === that.data.thisCardOpenId) {
        // 不允许自己收藏自己的名片
        wx.showToast({
          icon: 'none',
          title: '不能收藏自己的名片',
        })
        return ;
      }

      // 处理收藏
      // 先获取viewpeople
      db.collection('card_collection').where({
        _openid: that.data.thisCardOpenId
      }).get({
        success: function(res) {
          console.log(res.data);
          // 先判断该用户是否有添加名片信息
          db.collection('card_collection').where({
            _openid: viewUserId
          }).get({
            success: function (res1) {
              // 若该用户已经有添加名片
              if (res1.data.length > 0) {
                // 查看是否已经收藏过该名片
                let index = -1;
                for (var i = 0; i < res.data[0].starpeople.length; i++) {
                  if (res.data[0].starpeople[i].userId === viewUserId) {
                    index = i;
                    break;
                  }
                }

                // 如果已经收藏过该名片，则取消收藏
                if (index !== -1) {
                  res.data[0].starpeople.splice(index, 1);
                  wx.cloud.callFunction({
                    name: 'subStarcnt',
                    data: {
                      targetId: that.data.thisCardOpenId
                    },
                    success: function (r) {
                      console.log(r);
                    },
                    fail: function (e) {
                      console.log(e)
                    }
                  });

                  wx.cloud.callFunction({
                    name: 'updateStarpeople',
                    data: {
                      targetId: that.data.thisCardOpenId,
                      starPeople: res.data[0].starpeople
                    },
                    success: function (r) {
                      console.log(r);
                      that.setData({
                        isStared: false
                      });
                      wx.showToast({
                        title: '取消收藏成功',
                      });
                    },
                    fail: function (e) {
                      console.log(e)
                    }
                  });
                }
                // 如果没有收藏过该名片，则加入收藏
                else {
                  wx.cloud.callFunction({
                    name: 'addStarcnt',
                    data: {
                      targetId: that.data.thisCardOpenId
                    },
                    success: function (r) {
                      console.log(r);
                    },
                    fail: function (e) {
                      console.log(e)
                    }
                  });

                  wx.cloud.callFunction({
                    name: 'addUserToStarpeople',
                    data: {
                      targetId: that.data.thisCardOpenId,
                      newUserId: viewUserId,
                      starDate: util.formatTime(new Date())
                    },
                    success: function (r) {
                      console.log(r);
                      that.setData({
                        isStared: true
                      });
                      wx.showToast({
                        title: '收藏成功',
                      });
                    },
                    fail: function (e) {
                      console.log(e)
                    }
                  });
                }
              } else {
                // 若该用户没有添加名片
                wx.showToast({
                  icon: 'none',
                  title: '请先添加你的名片信息',
                });
              }
            },
            fail: function(err1) {
              console.log(err1);
            }
          })
        }
      })
    }).catch(err => {
      console.log(err);
    });
  }
})