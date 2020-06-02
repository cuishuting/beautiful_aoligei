// miniprogram/pages/GD_index/GD_index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  // jumptorecommend: function() {
  //   wx.navigateTo({
  //     url: '../GD_recommend/GD_recommend',
  //   })
  // },
  // jumptoreport: function() {
  //   wx.navigateTo({
  //     url: '../GD_Report/GD_Report',
  //   })
  // },
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

  }
})