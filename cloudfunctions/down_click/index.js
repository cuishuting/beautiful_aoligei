// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event) => {
  var collection_name = "";
  try {
    switch (event.goods_type) {
      case "洗面奶":
        collection_name = "facial_foam";
        break;
      case "眼霜":
        collection_name = "eye_cream";
        break;
      case "精华":
        collection_name = "essence";
        break;
      case "爽肤水":
        collection_name = "lotion";
        break;
      case "乳液":
        collection_name = "emulsion";
        break;
    }
    //这里的update依据是event._id
    return await db.collection(collection_name).where({
      _id: event.id
    }).update({
      data: {
        down: event.new_down
      }
    })
  } catch (e) {
    console.error(e)
  }
}