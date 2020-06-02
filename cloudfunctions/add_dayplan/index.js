// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.addplan = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = wx.cloud.database()
  db.collection('Day_todo').add({
    data:{
      context:event.context,
      date: new Date("2020-05-31"),
      is_finished: false,
      openid: wxContext.OPENID,
    },
  }).get({
    success:function(res) {
      console.log("添加成功",res)
    },
  })


}