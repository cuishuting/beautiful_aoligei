// miniprogram/pages/GD_recommend/GD_recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    list0: [
      {
        name: "DIOR花秘瑰萃洁颜泡沫",
        picture:"https://www.dior.cn/beauty/version-5.1563986503613/resize-image/ep/3000/2000/90/0/horizon%252Fcovers%252FY0996035_C099600035_E01_ZHC.jpg",
        cost: 2000
      },
      {
        name: "DIOR肌活蕴能洁面凝露",
        picture:"https://www.dior.cn/beauty/version-5.1563986503613/resize-image/ep/3000/2000/90/0/%252FY0996419%252FV002%252FY0996419_C099600419_E02_ZHC.jpg",
        cost: 1800
      }
    ],
    list1: [
      {
        name: "DIOR乐肤源澎澎弹盈润面膜",
        picture:"https://www.dior.cn/beauty/version-5.1563986503613/resize-image/ep/3000/2000/90/0/horizon%252Fcovers%252FY0691530_F069153080_E01_ZHC.jpg",
        cost: 1000
      }
    ],
    list2:[],
    list3:[],
    list4:[],
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
    var recommend_ref_data = wx.getStorageSync('face_data');
    //console.log(recommend_ref_data);
    var skin_type = recommend_ref_data.skin_type.skin_type; //皮肤类型的数字表示
    var skin = ""; //皮肤类型的中文表示
    switch(skin_type){
      case 0:
        skin = "油性皮肤";
        break;
      case 1:
        skin = "干性皮肤";
        break;
      case 2:
        skin = "中性皮肤";
        break;
      case 3:
        skin = "混合性皮肤";
        break;
    }
    // console.log("*******************");
    // console.log(skin);
    // console.log("######################");
    var that = this;
    var emulsion = 0;
    const db = wx.cloud.database();
    db.collection('emulsion').where({
      skintype: skin
    }).count().then(res => {
      emulsion = res.total;
      // console.log("(((((((((((((((((((");
      // console.log(emulsion);
      // console.log(")))))))))))))))))))");
    })
    db.collection('emulsion').where({
      skintype: skin
    }).get({
      success:function(res) {
        console.log("&&&&&&&&&&&&&&");
        console.log(res.data[0]);
        console.log(res.data[1]);
        console.log(res.data[2]);
        console.log("^^^^^^^^");
       var emulsion_list = [];
       for (var i = 0; i < emulsion; i++) {
         var cur_emulsion = {
           name: "",
           picture: "",
           cost:0
         };
         cur_emulsion.name = res.data[i].name;
         cur_emulsion.picture = res.data[i].image;
         cur_emulsion.cost = res.data[i].price;
         console.log("当前乳液信息");
         console.log(cur_emulsion);
         emulsion_list.push(cur_emulsion);
       }
       console.log("emulsion list: !!!!!!");
       console.log(emulsion_list);
       that.setData({
         list4: emulsion_list,
       })
      }
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