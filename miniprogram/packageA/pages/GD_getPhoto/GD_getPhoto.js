// pages/GD_getPhoto/GD_getPhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath:"cloud://girls-diary-lcexw.6769-girls-diary-lcexw-1302183289/项目素材图/default-pic.png", //初始化时一定要加“”（类型需要）
    takePhotoOrNot:true,
    gettingPhoto: true,
    base64_photo: "",
    TestReport: true,
    text: "上传图片获取数据可能需要一定时间欧~如果长时间未响应，请重新上传~~"
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
  shareGoods: function() {
    wx.navigateTo({
      url: '../GD_shareGoods/GD_shareGoods',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //接下来需要完善请求api接口的调用
  upLoadImage: function() {
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType:['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        that.setData({
          imagePath: res.tempFilePaths,
        });
        var curPhotoSize = res.tempFiles[0].size;
        if (curPhotoSize <= 2000000) {
          var base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64');
          wx.uploadFile({
            filePath: res.tempFilePaths[0],
            name: 'file',
            url: 'https://api-facestyle.megvii.com/facestyle/v1/skinanalyze',
            fail: (res) => {
              console.log("调用失败");
            },
            header: {
              'content-type' : 'multipart/form-data'
            },
            formData: {
              'api_key' : 's4OuYgKYS9p1gmk0VpAu5RkPPs6So9gb',
              'api_secret' : '88bk_yKW4lheqB2ieV6UWS_oNVwxBcaT',
              'image_base64' : base64
            },
            success: (result) => {
              var res = result.data;//res是JSON格式
              var res_obj = JSON.parse(res); //res_obj是object格式
              console.log(res_obj);
              that.setData({
                TestReport: false,
              });
              var skinInfo = {};
              var skin_report = res_obj.result;
              skinInfo = {
                left_eyelid: skin_report.left_eyelids.value, //左眼双眼皮
                right_eyelid: skin_report.right_eyelids.value, //右眼双眼皮
                eye_pouch: skin_report.eye_pouch.value, //有无眼袋
                dark_circle: skin_report.dark_circle.value, //有无黑眼圈
                crows_feet: skin_report.crows_feet.value, //有无鱼尾纹
                eye_finelines: skin_report.eye_finelines.value, //眼部细纹
                skin_type: {
                  skin_type: skin_report.skin_type.skin_type,
                  details: {
                    '0': {confidence: skin_report.skin_type.details['0'].confidence, value: skin_report.skin_type.details['0'].value},
                    '1': {confidence: skin_report.skin_type.details['1'].confidence, value: skin_report.skin_type.details['1'].value},
                    '2': {confidence: skin_report.skin_type.details['2'].confidence, value: skin_report.skin_type.details['2'].value},
                    '3': {confidence: skin_report.skin_type.details['3'].confidence, value: skin_report.skin_type.details['3'].value},
                  }
                }, //肤质类型
                acne: {
                  value: skin_report.acne.value,
                  acne_level: skin_report.acne.confidence
                }, //痘痘以及痘痘的等级情况
                pores_forehead: skin_report.pores_forehead.value, //前额毛孔情况
                pores_jaw: skin_report.pores_jaw.value, //下巴上的毛孔情况
                pores_left_cheek: skin_report.pores_left_cheek.value, //左脸毛孔情况
                pores_right_cheek: skin_report.pores_right_cheek.value, //右脸毛孔情况
                skin_spot: skin_report.skin_spot.value, //有无斑点
              };
              wx.setStorageSync("face_data", skinInfo);
            },
          });
        }
        else {
          console.log("图片尺寸大于2m");
        }
      }
    });
  },
  jumpToTestReport: function() {
    wx.navigateTo({
      url: '../GD_Report/GD_Report',
    })
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

  }
})