// packageD/pages/GD_share_emulsion/GD_share_emulsion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emulsion_name: '', //string
    emulsion_price: 0, //number
    skin_type: '', //皮肤的种类
    img_URL: '' //上传的图片的云存储地址
  },
  get_name(e) {
    var that = this;
    that.setData({
      emulsion_name: e.detail,
    })
  },
  get_price(e) {
    var that = this;
    that.setData({
      emulsion_price: e.detail
    })
  },
  chooseSkin(e) {
    var that = this;
    var skin = 0; //表示皮肤的种类 1：油性 2：干性 3：中性 4：混合性
    skin = e.detail;
    if (skin == 1) {
      that.setData({
        skin_type: "油性皮肤"
      })
    }
    if (skin == 2) {
      that.setData({
        skin_type: "干性皮肤"
      })
    }
    if (skin == 3) {
      that.setData({
        skin_type: "中性皮肤"
      })
    }
    if (skin == 4) {
      that.setData({
        skin_type: "混合性皮肤"
      })
    }
  },
  uploadImage: function() {
   var that = this;
   wx.chooseImage({
    count:1,
    sizeType:['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      var cur_image_path = res.tempFilePaths[0];
      wx.cloud.uploadFile({
        cloudPath: (new Date()).valueOf()+'.png',
        filePath: cur_image_path,
        success: res => {
          that.setData({
            img_URL: res.fileID
          })
          wx.showToast({
            title: '图片上传成功',
          })
        }
      })
    }
   })
  },
  share: function() {
    console.log("share function is triggered");
    var that = this;
    const db = wx.cloud.database();
    var url =  that.data.img_URL;
    var cur_name = that.data.emulsion_name;
    var cur_price = that.data.emulsion_price;
    var cur_skintype = that.data.skin_type;
    db.collection('emulsion').add({
      data: {
        image: url,
        name: cur_name,
        price: cur_price,
        skintype: cur_skintype,
      },
      success: res => {
        wx.showToast({
          title: '好物分享成功',
        })
        console.log(res._id);
      }
    })
  }
})