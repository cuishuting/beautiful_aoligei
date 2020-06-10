// miniprogram/pages/GD_Report/GD_Report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acne_value: 0, //是否有痘痘
    acne_level: 10, //痘痘严重等级（可以考虑用那种进度条的形式表示这个数据）
    crows_feet: 0, //有无鱼尾纹
    dark_circle: 0, //有无黑眼圈
    eye_finelines: 0, //有无眼部细纹
    eye_pouch: 0, //有无眼袋
    left_eyelid: 0, //左眼有无双眼皮
    right_eyelid: 0, //右眼有无双眼皮
    pores_forehead: 0, //前额毛孔情况
    pores_jaw: 0, //下巴毛孔
    pores_left_cheek: 0, //左脸毛孔
    pores_right_cheek: 0, //右脸毛孔
    skin_spot: 0, //有无斑点
    skin_type: 0, //肤质类型（共0-3四种取值，具体可见官网）
    sskin_type: "",
    skin_0_confidence: 0, //0号肤质的可靠性（0-1之间取值）
    skin_1_confidence: 0, //1号肤质的可靠性（0-1之间取值）
    skin_2_confidence: 0, //2号肤质的可靠性（0-1之间取值）
    skin_3_confidence: 0 //3号肤质的可靠性（0-1之间取值）  
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
  jumptorecommend: function() {
    wx.navigateTo({
      url: '../../../packageC/pages/GD_recommend/GD_recommend',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var face_report_data = wx.getStorageSync('face_data');
    console.log(face_report_data);
    var that = this;
    that.setData({
      acne_value: face_report_data,
      acne_level: face_report_data.acne.acne_level,
      crows_feet: face_report_data.crows_feet,
      dark_circle: face_report_data.dark_circle,
      eye_finelines: face_report_data.eye_finelines,
      eye_pouch: face_report_data.eye_pouch,
      left_eyelid: face_report_data.left_eyelid,
      pores_forehead: face_report_data.pores_forehead,
      pores_jaw: face_report_data.pores_jaw,
      pores_left_cheek: face_report_data.pores_left_cheek,
      pores_right_cheek: face_report_data.pores_right_cheek,
      right_eyelid: face_report_data.right_eyelid,
      skin_spot: face_report_data.skin_spot,
      skin_type: face_report_data.skin_type.skin_type,
      skin_0_confidence: face_report_data.skin_type.details['0'].confidence,
      skin_1_confidence: face_report_data.skin_type.details['1'].confidence,
      skin_2_confidence: face_report_data.skin_type.details['2'].confidence,
      skin_3_confidence: face_report_data.skin_type.details['3'].confidence,
    });
    switch (that.data.skin_type) {
      case 0:
        that.setData({
          sskin_type: '油性皮肤'
        })
        break;
      case 1:
        that.setData({
          sskin_type: '干性皮肤'
        })
        break;
      case 2:
        that.setData({
          sskin_type: '中性皮肤'
        })
        break;
      case 3:
        that.setData({
          sskin_type: '混合性皮肤'
        })
        break;
    }
    console.log("this is the report page!!!!");

    console.log("&&&&&&&&&&&&&&&&");
    console.log(that.acne_value);
    console.log("***********");
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