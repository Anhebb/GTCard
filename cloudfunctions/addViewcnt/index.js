// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const _  = db.command;

  return db.collection('card_collection').where({
    _openid: event.targetId
  }).update({
    data: {
      viewcnt: _.inc(1)
    },
    success: function (res) {
      console.log(res.data);
    },
    fail: function(err) {
      console.log(err);
    }
  });
}