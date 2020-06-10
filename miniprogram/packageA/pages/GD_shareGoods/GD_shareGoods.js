// miniprogram/packageA/pages/GD_shareGoods/GD_shareGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  goToEmulsion: function () {
    wx.navigateTo({
      url: '../../../packageD/pages/GD_share_emulsion/GD_share_emulsion',
    })
  },
  goToEyeCream: function () {
    wx.navigateTo({
      url: '../../../packageD/pages/GD_share_eye_cream/GD_share_eye_cream',
    })
  },
  goToEssence: function () {
    wx.navigateTo({
      url: '../../../packageD/pages/GD_share_essence/GD_share_essence',
    })
  },
  goToFacialFoam: function () {
    wx.navigateTo({
      url: '../../../packageD/pages/GD_share_facial_foam/GD_share_facial_foam',
    })
  },
  goToLotion: function () {
    wx.navigateTo({
      url: '../../../packageD/pages/GD_share_lotion/GD_share_lotion',
    })
  }
})