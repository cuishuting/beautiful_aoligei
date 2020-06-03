// miniprogram/pages/GD_index/GD_index.js
Page({
  data: {
    openid: '',
  },
  onLoad: function () {
  },
 // 获取用户openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
    name: 'getOpenid',
    complete: res => {
    console.log('云函数获取到的openid: ', res.result.openId)
    var openid = res.result.openId;
    that.setData({
     openid: openid
    })
   }
  })
 },
  jumptoplan: function() {
    wx.navigateTo({
      url: '../../packageB/pages/GD_plan/GD_plan',
    })
  },
  jumptogetphoto: function() {
    wx.navigateTo({
      url: '../../packageA/pages/GD_getPhoto/GD_getPhoto',
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