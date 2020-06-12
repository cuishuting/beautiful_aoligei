// packageD/pages/GD_share_emulsion/GD_share_emulsion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emulsion_name: '', //string
    emulsion_price: 0, //number
    skin_type: '油性皮肤', //皮肤的种类
    img_URL: '', //上传的图片的云存储地址
  },
  containerTap: function (res) {
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    this.setData({
      rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
    });
  },
  onChange(event) {
    this.setData({
      skin_type: event.detail,
    });
    console.log("onChange");
    console.log(this.data.skin_type);
  },
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      skin_type: name,
    });
    console.log("onClick");
    console.log(this.data.skin_type);
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
        up: 0,
        down: 0
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