// packageD/pages/GD_share_emulsion/GD_share_emulsion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eye_cream_name: '', //string
    eye_cream_price: 0, //number
    eye_problem: '针对黑眼圈', //眼霜对应的功效
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
      eye_problem: event.detail,
    });
    console.log("onChange");
    console.log(this.data.eye_problem);
  },
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      eye_problem: name,
    });
    console.log("onClick");
    console.log(this.data.eye_problem);
  },
  get_name(e) {
    var that = this;
    that.setData({
      eye_cream_name: e.detail,
    })
  },
  get_price(e) {
    var that = this;
    that.setData({
      eye_cream_price: e.detail
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
    var cur_name = that.data.eye_cream_name;
    var cur_price = that.data.eye_cream_price;
    var cur_eye_problem = "";
    switch (that.data.eye_problem) {
      case "针对黑眼圈":
        cur_eye_problem = "dark_circle";
        break;
      case "针对眼部细纹":
        cur_eye_problem = "eye_finelines";
        break;
      case "针对眼袋":
        cur_eye_problem = "eye_pouch";
        break;
    }
    db.collection('eye_cream').add({
      data: {
        image: url,
        name: cur_name,
        price: cur_price,
        eye_problem: cur_eye_problem,
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