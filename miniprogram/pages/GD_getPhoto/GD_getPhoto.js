// pages/GD_getPhoto/GD_getPhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath:"", //初始化时一定要加“”（类型需要）
    takePhotoOrNot:true,
    gettingPhoto: true,
    base64_photo: "",
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
              console.log(result.data);
            },
          })
        }
        else {
          console.log("图片尺寸大于2m");
        }
        
      }
    });
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