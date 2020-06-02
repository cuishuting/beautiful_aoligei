// miniprogram/pages/GD_recommend/GD_recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    list0: [],
    list1: [],
    list2:[],
    list3:[],
    list4:[],
    skin_type: 0, //用数字表示的皮肤类型
    skin_type_str: "", //用中文表示的皮肤类型
    eye_pouch: 0, //0无眼袋 1有眼袋
    dark_circle: 0,//0无黑眼圈， 1有黑眼圈
    eye_finelines: 0, //0无眼部细纹 1有眼部细纹
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
    var that = this;
    var recommend_ref_data = wx.getStorageSync('face_data');
    console.log("皮肤测试数据");
    console.log(recommend_ref_data);
    that.setData({
      skin_type: recommend_ref_data.skin_type.skin_type, //皮肤类型的数字表示
      eye_pouch: recommend_ref_data.eye_pouch,
      dark_circle: recommend_ref_data.dark_circle,
      eye_finelines: recommend_ref_data.eye_finelines,
    });
    // console.log("数字版的皮肤类型");
    // console.log(that.data.skin_type);
    switch(that.data.skin_type){
      case 0:
        that.setData({
          skin_type_str: "油性皮肤",
        });
        break;
      case 1:
        that.setData({
          skin_type_str: "干性皮肤",
        });
        break;
      case 2:
        that.setData({
          skin_type_str: "中性皮肤",
        });
        break;
      case 3:
        that.setData({
          skin_type_str: "混合性皮肤",
        });
        break;
    }
    // console.log("皮肤类型");
    // console.log(that.data.skin_type_str);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  facialFoam: function() {
    console.log("faicialFoam被触发啦");
    var that = this;
    var facial_foam = 0; //精华的数量
    const db = wx.cloud.database();
    db.collection('facial_foam').where({
      skintype: that.data.skin_type_str
    }).count().then(res => {
      facial_foam = res.total;
      console.log("洗面奶的数量");
      console.log(facial_foam);
    });
    db.collection('facial_foam').where({
      skintype: that.data.skin_type_str
    }).get({
      success: function(res) {
        var facial_foam_list = [];
        for (var i = 0; i < facial_foam; i++) {
          var cur_foam = {
            name: "",
            picture: "",
            cost:"",
          };
          cur_foam.name = res.data[i].name;
          cur_foam.picture = res.data[i].image;
          cur_foam.cost = res.data[i].price;
          facial_foam_list.push(cur_foam);
          console.log("当前洗面奶的信息");
          console.log(cur_foam);
        }
        console.log("洗面奶列表");
        console.log(facial_foam_list);
        that.setData({
          list0: facial_foam_list,
        })
      }

    });
  },
  eyeCream: function() {
    console.log("eyeCream被触发啦");
    var that = this;
    var problem_list = [];
    if (that.data.eye_finelines == 1) {
      problem_list.push("eye_finelines");
    }
    else if (that.data.eye_pouch == 1) {
      problem_list.push("eye_pouch");
    }
    else if (that.data.dark_circle == 1) {
      problem_list.push("dark_circle");
    }
    else {
      
    }
    console.log("eye_prolem_list:");
    console.log(problem_list);
    const db = wx.cloud.database();
    var eye_cream_list = [];
    const _ = db.command;
    for (var i = 0; i < problem_list.length; i++) {
      console.log("*************");
      console.log(problem_list[i]);
      console.log("*************");
      var cur_eye_cream_num = 0; //当前种类眼霜的个数
      db.collection('eye_cream').where({
        eye_problem: _.eq(problem_list[i])
      }).count().then(res => {
        cur_eye_cream_num = res.total;
      });
      console.log(problem_list[i]);
      console.log("当前问题的眼霜的个数");
      console.log(cur_eye_cream_num);
      db.collection('eye_cream').where({
        eye_problem: _.eq(problem_list[i])
      }).get({
        success: function(res) {
          console.log(problem_list[i]);
          console.log("res.data");
          console.log(res.data);
          for (var j = 0; j < cur_eye_cream_num; j++) {
            var cur_eye_cream = {
              name: "",
              picture: "",
              cost:"",
            };
            cur_eye_cream.name = res.data[j].name;
            cur_eye_cream.picture = res.data[j].image;
            cur_eye_cream.cost = res.data[j].price;
            eye_cream_list.push(cur_eye_cream);
          }
        }
      })
    }
    that.setData({
      list1: eye_cream_list,
    })
  },
  Essence: function() {
    console.log("Essence被触发啦");
    var that = this;
    var essence = 0; //精华的数量
    const db = wx.cloud.database();
    db.collection('essence').where({
      skintype: that.data.skin_type_str
    }).count().then(res => {
      essence = res.total;
      console.log("精华水的数量");
      console.log(essence);
    });
    db.collection('essence').where({
      skintype: that.data.skin_type_str
    }).get({
      success: function(res) {
        var essence_list = [];
        for (var i = 0; i < essence; i++) {
          var cur_essence = {
            name: "",
            picture: "",
            cost:"",
          };
          cur_essence.name = res.data[i].name;
          cur_essence.picture = res.data[i].image;
          cur_essence.cost = res.data[i].price;
          essence_list.push(cur_essence);
          console.log("当前精华的信息");
          console.log(cur_essence);
        }
        console.log("精华列表");
        console.log(essence_list);
        that.setData({
          list2: essence_list,
        })
      }

    });
  },
  Emulsion: function() {
    var that = this;
    console.log("emulsion被触发啦");
    var emulsion = 0; //乳液的数量
    const db = wx.cloud.database();
    db.collection('emulsion').where({
      skintype: that.data.skin_type_str
    }).count().then(res => {
      emulsion = res.total;
    });
    db.collection('emulsion').where({
      skintype: that.data.skin_type_str
    }).get({
      success:function(res) {
       var emulsion_list = [];
       for (var i = 0; i < emulsion; i++) {
         var cur_emulsion = {
           name: "",
           picture: "",
           cost:"",
         };
         cur_emulsion.name = res.data[i].name;
         cur_emulsion.picture = res.data[i].image;
         cur_emulsion.cost = res.data[i].price;
         emulsion_list.push(cur_emulsion);
       }
       console.log("乳液列表");
       console.log(emulsion_list);
       that.setData({
         list4: emulsion_list,
       })
      }
    });
  }, 
  Lotion: function() {
    var that = this;
    console.log("Lotion被触发啦");
    var lotion = 0; //乳液的数量
    const db = wx.cloud.database();
    db.collection('lotion').where({
      skintype: that.data.skin_type_str
    }).count().then(res => {
      lotion = res.total;
    });
    db.collection('lotion').where({
      skintype: that.data.skin_type_str
    }).get({
      success:function(res) {
       var lotion_list = [];
       for (var i = 0; i < lotion; i++) {
         var cur_lotion = {
           name: "",
           picture: "",
           cost:"",
         };
         cur_lotion.name = res.data[i].name;
         cur_lotion.picture = res.data[i].image;
         cur_lotion.cost = res.data[i].price;
         lotion_list.push(cur_lotion);
       }
       console.log("爽肤水列表");
       console.log(lotion_list);
       that.setData({
         list3: lotion_list,
       })
      }
    });
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