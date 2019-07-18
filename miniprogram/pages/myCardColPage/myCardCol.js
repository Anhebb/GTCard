const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    //我的收藏
    list_1: [],
    //谁看过我
    list_2: [],
    /**
      * 页面配置
      */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },
  onLoad: function () {
    let List1 = [];
    let List2 = [];
    
    var that = this;
    //查看谁看过我
    db.collection('card_collection').where({
      _openid: app.globalData.curUserOpenId
    }).get({
      success:function(res){
        let vp = res.data[0].viewpeople;

        for (let i = 0; i < vp.length; i++) {
          let userId = vp[i].userId;
          let viewTime = vp[i].viewTime;

          //搜索头像
          db.collection('card_collection').where({
            _openid: userId
          }).get({
            success:function(res){
              let avr = res.data[0].avatarurl;
              let name = res.data[0].cardinfo.name;
              List2[i] = {
                thisId: userId,
                avatar: avr,
                lookName: name,
                lookTime: viewTime
                }
              that.setData({
                list_2: List2
              });
            }
          })
        }
      }
    });

    // 查看我收藏过谁
    db.collection('card_collection').where({}).get({
      success: function(res) {
        console.log(res);
        let allCards = res.data;
        for (var i = 0; i < allCards.length; i++) {
          let starPeoples = allCards[i].starpeople;
          let index = -1;
          for (var j = 0; j < starPeoples.length; j++) {
            if (starPeoples[j].userId === app.globalData.curUserOpenId) {
              index = j;
              break;
            }
          }
          if (index != -1) {
            List1.push({
              thisId: allCards[i]._openid,
              avatar: allCards[i].avatarurl,
              starName: allCards[i].cardinfo.name,
              starTime: starPeoples[index].starTime
            });
          }
        }
        that.setData({
          list_1: List1
        });
      },
      fail: function(err) {
        console.log(err);
      }
    })

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  onShow() {
    this.onLoad();
  },

  /**
    * 滑动切换tab
    */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  goToSharePage: function(event) {
    wx.navigateTo({
      url: '/pages/sharePage/sharePage?targetId=' + event.currentTarget.dataset.thisid
    });
  }
})