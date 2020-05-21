// miniprogram/pages/GD_recommend/GD_recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    list:[],
    list0: [
      {
        name: "DIOR花秘瑰萃洁颜泡沫",
        picture:"https://www.dior.cn/beauty/version-5.1563986503613/resize-image/ep/3000/2000/90/0/horizon%252Fcovers%252FY0996035_C099600035_E01_ZHC.jpg",
        cost: "2000"
      },
      {
        name: "DIOR肌活蕴能洁面凝露",
        picture:"https://www.dior.cn/beauty/version-5.1563986503613/resize-image/ep/3000/2000/90/0/%252FY0996419%252FV002%252FY0996419_C099600419_E02_ZHC.jpg",
        cost: "1800"
      }
    ],
    list1: [
      {
        name: "DIOR乐肤源澎澎弹盈润面膜",
        picture:"https://www.dior.cn/beauty/version-5.1563986503613/resize-image/ep/3000/2000/90/0/horizon%252Fcovers%252FY0691530_F069153080_E01_ZHC.jpg",
        cost: "1000"
      }
    ],
    list2:[],
    list3:[]
  }, 
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
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

  }
})