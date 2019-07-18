// components/cardstyle2/cardstyle2.js
const app = getApp();
Component({
  /** 
   * 组件的属性列表 
   */
  properties: {
    name: {
      type: String,
      value: '姓名'
    },
    job: {
      type: String,
      value: '未填写职位'
    },
    photo: {
      type: String,
      value: '../../images/cardstyle2/label.png'
    },
    company: {
      type: String,
      value: '未填写公司'
    },
    address: {
      type: String,
      value: '未填写地址'
    },
    phone: {
      type: String,
      value: '未填写电话'
    },
    email: {
      type: String,
      value: '未填写邮箱'
    },
    changeable: {
      type: Boolean,
      value: false
    },
    net: {
      type: String,
      value: '未填写官网'
    },
  },

  methods: {
    // 处理用户选择头像图片 
    handleChooseAvatar: function () {
      var that = this;
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: function (res) {
          // 将用户选择的头像图片的临时地址保存到全局变量中 
          app.globalData.tempAvatarPaths = res.tempFilePaths[0];
          that.setData({
            "photo": app.globalData.tempAvatarPaths
          });
        },
      })
    }
  }
}) 