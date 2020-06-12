// miniprogram/pages/GD_recommend/GD_recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    TabCur: 0,
    list0: [],
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    skin_type: 0, //用数字表示的皮肤类型
    skin_type_str: "", //用中文表示的皮肤类型
    eye_pouch: 0, //0无眼袋 1有眼袋
    dark_circle: 0, //0无黑眼圈， 1有黑眼圈
    eye_finelines: 0, //0无眼部细纹 1有眼部细纹
    haveEyeProblem: true, //有无眼部问题
    eye_problem_list: [], //眼部问题的列表
    show_pic: true, //用于证明是否存在眼部问题
  },
  jumpToPhoto: function () {
    wx.navigateTo({
      url: '../../../packageA/pages/GD_getPhoto/GD_getPhoto',
    })
  },
  jumpToShare: function () {
    wx.navigateTo({
      url: '../../../packageA/pages/GD_shareGoods/GD_shareGoods',
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  getFacial_foam: function () {
    var that = this;
    if (that.data.list0.length == 0) {
      that.facialFoam();
    }
    that.setData({
      show_pic: true,
    })
  },
  getEye_cream: function () {
    var that = this;
    if (that.data.list1.length == 0) {
      that.eyeCream();
    }
  },
  getEssence: function () {
    var that = this;
    if (that.data.list2.length == 0) {
      that.Essence();
    }
    that.setData({
      show_pic: true,
    })
  },
  getLotion: function () {
    var that = this;
    if (that.data.list3.length == 0) {
      that.Lotion();
    }
    that.setData({
      show_pic: true,
    })
  },
  getEmulsion: function () {
    var that = this;
    if (that.data.list4.length == 0) {
      that.Emulsion();
    }
    that.setData({
      show_pic: true,
    })
  },
  up: function (e) {
    var that = this;
    //console.log("当前是list：", e.currentTarget.dataset.list);
    var cur_list_index = e.currentTarget.dataset.list; //当前列表的索引0-4
    var cur_list = [];
    var type = ""; //当前点赞的护肤品的种类
    switch (cur_list_index) {
      case 0:
        type = "洗面奶";
        break;
      case 1:
        type = "眼霜";
        break;
      case 2:
        type = "精华";
        break;
      case 3:
        type = "爽肤水";
        break;
      case 4:
        type = "乳液";
        break;
    }
    switch (cur_list_index) {
      case 0:
        cur_list = that.data.list0;
        break;
      case 1:
        cur_list = that.data.list1;
        break;
      case 2:
        cur_list = that.data.list2;
        break;
      case 3:
        cur_list = that.data.list3;
        break;
      case 4:
        cur_list = that.data.list4;
        break;
    }
    var index = e.currentTarget.dataset.curindex;
    var cur_up = cur_list[index].up;
    //console.log(cur_up);
    //console.log('okk');
    //console.log("current up_click state:", e.currentTarget.dataset.up_click);
    var cur_up_state = !e.currentTarget.dataset.up_click //up_state指的是目前是点赞还是消赞状态
    cur_list[index].up_click = cur_up_state;
    if (cur_list_index == 0) {
      that.setData({
        list0: cur_list,
      })
    }
    if (cur_list_index == 1) {
      that.setData({
        list1: cur_list,
      })
    }
    if (cur_list_index == 2) {
      that.setData({
        list2: cur_list,
      })
    }
    if (cur_list_index == 3) {
      that.setData({
        list3: cur_list,
      })
    }
    if (cur_list_index == 4) {
      that.setData({
        list4: cur_list,
      })
    }
    //点击up后，状态改变（false变true代表当前已点赞；true变false代表取消点赞）
    if (cur_up_state == true) {
      cur_list[index].up = (cur_up + 1);
      if (cur_list_index == 0) {
        that.setData({
          list0: cur_list,
        })
      }
      if (cur_list_index == 1) {
        that.setData({
          list1: cur_list,
        })
      }
      if (cur_list_index == 2) {
        that.setData({
          list2: cur_list,
        })
      }
      if (cur_list_index == 3) {
        that.setData({
          list3: cur_list,
        })
      }
      if (cur_list_index == 4) {
        that.setData({
          list4: cur_list,
        })
      }
      //console.log("e.currentTarget.dataset.up", e.currentTarget.dataset.up);
      var new_up_num = e.currentTarget.dataset.up;
      //console.log("点赞过后的new_up_num", new_up_num);

      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'up_click',
        // 传递给云函数的参数
        data: {
          id: e.currentTarget.dataset.id,
          new_up: new_up_num,
          goods_type: type
        },
        success: res => {
          //console.log("云函数upClick调用成功");

        },
        fail: err => {
          // handle error
        },
        complete: () => {
          // ...
        }
      })
    } else {
      cur_list[index].up = (cur_up - 1);
      if (cur_list_index == 0) {
        that.setData({
          list0: cur_list,
        })
      }
      if (cur_list_index == 1) {
        that.setData({
          list1: cur_list,
        })
      }
      if (cur_list_index == 2) {
        that.setData({
          list2: cur_list,
        })
      }
      if (cur_list_index == 3) {
        that.setData({
          list3: cur_list,
        })
      }
      if (cur_list_index == 4) {
        that.setData({
          list4: cur_list,
        })
      }
      //console.log("e.currentTarget.dataset.up", e.currentTarget.dataset.up);
      var new_up_num = e.currentTarget.dataset.up;
      //console.log("消赞过后的new_up_num", new_up_num);
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'up_click',
        // 传递给云函数的参数
        data: {
          id: e.currentTarget.dataset.id,
          new_up: new_up_num,
          goods_type: type
        },
        success: res => {
          //console.log("云函数upClick调用成功");

        },
        fail: err => {
          // handle error
        },
        complete: () => {
          // ...
        }
      })
    }
  },
  down: function (e) {
    var that = this;
    var cur_list_index = e.currentTarget.dataset.list; //当前列表的索引0-4
    var cur_list = [];
    var type = ""; //当前点赞的护肤品的种类
    switch (cur_list_index) {
      case 0:
        type = "洗面奶";
        break;
      case 1:
        type = "眼霜";
        break;
      case 2:
        type = "精华";
        break;
      case 3:
        type = "爽肤水";
        break;
      case 4:
        type = "乳液";
        break;
    }
    switch (cur_list_index) {
      case 0:
        cur_list = that.data.list0;
        break;
      case 1:
        cur_list = that.data.list1;
        break;
      case 2:
        cur_list = that.data.list2;
        break;
      case 3:
        cur_list = that.data.list3;
        break;
      case 4:
        cur_list = that.data.list4;
        break;
    }
    var index = e.currentTarget.dataset.curindex;
    var cur_down = cur_list[index].down;
    //console.log(cur_down);
    //console.log("current down_click state:", e.currentTarget.dataset.down_click);
    var cur_down_state = !e.currentTarget.dataset.down_click //up_state指的是目前是点赞还是消赞状态
    cur_list[index].down_click = cur_down_state;
    if (cur_list_index == 0) {
      that.setData({
        list0: cur_list,
      })
    }
    if (cur_list_index == 1) {
      that.setData({
        list1: cur_list,
      })
    }
    if (cur_list_index == 2) {
      that.setData({
        list2: cur_list,
      })
    }
    if (cur_list_index == 3) {
      that.setData({
        list3: cur_list,
      })
    }
    if (cur_list_index == 4) {
      that.setData({
        list4: cur_list,
      })
    }
    //点击down后，状态改变（false变true代表当前已点踩；true变false代表取消点踩）
    if (cur_down_state == true) {
      cur_list[index].down = (cur_down + 1);
      if (cur_list_index == 0) {
        that.setData({
          list0: cur_list,
        })
      }
      if (cur_list_index == 1) {
        that.setData({
          list1: cur_list,
        })
      }
      if (cur_list_index == 2) {
        that.setData({
          list2: cur_list,
        })
      }
      if (cur_list_index == 3) {
        that.setData({
          list3: cur_list,
        })
      }
      if (cur_list_index == 4) {
        that.setData({
          list4: cur_list,
        })
      }
      //console.log("e.currentTarget.dataset.down", e.currentTarget.dataset.down);
      var new_down_num = e.currentTarget.dataset.down;
      //console.log("点赞过后的new_down_num", new_down_num);
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'down_click',
        // 传递给云函数的参数
        data: {
          id: e.currentTarget.dataset.id,
          new_down: new_down_num,
          goods_type: type
        },
        success: res => {
          console.log("云函数down_click调用成功");

        },
        fail: err => {
          // handle error
        },
        complete: () => {
          // ...
        }
      })
    } else {
      cur_list[index].down = (cur_down - 1);
      if (cur_list_index == 0) {
        that.setData({
          list0: cur_list,
        })
      }
      if (cur_list_index == 1) {
        that.setData({
          list1: cur_list,
        })
      }
      if (cur_list_index == 2) {
        that.setData({
          list2: cur_list,
        })
      }
      if (cur_list_index == 3) {
        that.setData({
          list3: cur_list,
        })
      }
      if (cur_list_index == 4) {
        that.setData({
          list4: cur_list,
        })
      }
      //console.log("e.currentTarget.dataset.down", e.currentTarget.dataset.down);
      var new_down_num = e.currentTarget.dataset.down;
      //console.log("消赞过后的new_down_num", new_down_num);
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'down_click',
        // 传递给云函数的参数
        data: {
          id: e.currentTarget.dataset.id,
          new_down: new_down_num,
          goods_type: type
        },
        success: res => {
          //console.log("云函数down_click调用成功");

        },
        fail: err => {
          // handle error
        },
        complete: () => {
          // ...
        }
      })
    }
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
    switch (that.data.skin_type) {
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
    var problem_list = [];
    if (that.data.eye_finelines == 1) {
      problem_list.push("eye_finelines");
      that.setData({
        haveEyeProblem: false,
      });
    }
    if (that.data.eye_pouch == 1) {
      problem_list.push("eye_pouch");
      that.setData({
        haveEyeProblem: false,
      });
    }
    if (that.data.dark_circle == 1) {
      problem_list.push("dark_circle");
      that.setData({
        haveEyeProblem: false,
      });
    }
    that.setData({
      eye_problem_list: problem_list,
    })
    that.facialFoam();
    that.eyeCream();
    that.Essence();
    that.Lotion();
    that.Emulsion();
    console.log("页面数据加载完毕");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  facialFoam: function () {
    console.log("facialFoam被触发啦");
    var that = this;
    console.log(that.data.show_pic);
    var facial_foam = 0; //洗面奶的数量
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
      success: function (res) {
        var facial_foam_list = [];
        for (var i = 0; i < facial_foam; i++) {
          var cur_foam = {
            name: "",
            picture: "",
            cost: "",
            up: 0,
            down: 0,
            up_click: false, //点赞按钮的状态： false: 从来没有按过或者取消了“点赞”状态; true:选择了“点赞”状态 
            down_click: false, //消赞按钮的状态： false: 从来没有按过或者取消了“消赞”状态; true:选择了“消赞”状态
            id: "" //获取护肤品的id号，方便上传新的点赞数据
          };
          cur_foam.name = res.data[i].name;
          cur_foam.picture = res.data[i].image;
          cur_foam.cost = res.data[i].price;
          cur_foam.up = res.data[i].up;
          cur_foam.down = res.data[i].down;
          cur_foam.id = res.data[i]._id;
          facial_foam_list.push(cur_foam);
          console.log("当前洗面奶的信息");
          console.log(cur_foam);
        }
        console.log("洗面奶列表");
        console.log(facial_foam_list);
        that.setData({
          list0: facial_foam_list,
        })
        console.log("洗面奶列表加载完毕");
      }
    });
  },
  eyeCream: function () {
    var that = this;
    if (that.data.haveEyeProblem) {
      that.setData({
        show_pic: false,
      })
    }
    console.log(that.data.show_pic);
    that.setData({
      list1: []
    })
    console.log("eyeCream被触发啦");
    var problem_list = that.data.eye_problem_list;
    var eye_cream_list = [];
    const db = wx.cloud.database();
    const _ = db.command;
    for (var i = 0; i < problem_list.length; i++) {
      var cur_eye_cream_num = 0; //当前种类眼霜的个数
      db.collection('eye_cream').where({
        eye_problem: _.eq(problem_list[i])
      }).count().then(res => {
        cur_eye_cream_num = res.total;
      });
      db.collection('eye_cream').where({
        eye_problem: _.eq(problem_list[i])
      }).get({
        success: function (res) {
          console.log("当前眼部问题的返回结果");
          console.log(res.data);
          console.log(cur_eye_cream_num);
          eye_cream_list = [];
          for (var j = 0; j < cur_eye_cream_num; j++) {
            var cur_eye_cream = {
              name: "",
              picture: "",
              cost: "",
              eye_problem: "针对",
              up: 0,
              down: 0,
              up_click: false, //点赞按钮的状态： false: 从来没有按过或者取消了“点赞”状态; true:选择了“点赞”状态 
              down_click: false, //消赞按钮的状态： false: 从来没有按过或者取消了“消赞”状态; true:选择了“消赞”状态
              id: "" //获取护肤品的id号，方便上传新的点赞数据
            };
            cur_eye_cream.name = res.data[j].name;
            cur_eye_cream.picture = res.data[j].image;
            cur_eye_cream.cost = res.data[j].price;
            cur_eye_cream.up = res.data[j].up;
            cur_eye_cream.down = res.data[j].down;
            cur_eye_cream.id = res.data[j]._id;
            var eye_problem_str = "";
            switch (res.data[j].eye_problem) {
              case "dark_circle":
                eye_problem_str = "黑眼圈";
                break;
              case "eye_finelines":
                eye_problem_str = "眼部细纹";
                break;
              case "eye_pouch":
                eye_problem_str = "眼袋";
                break;
            }
            cur_eye_cream.eye_problem += eye_problem_str;
            console.log("当前眼霜：");
            console.log(cur_eye_cream);
            eye_cream_list.push(cur_eye_cream);
          }
          that.setData({
            list1: that.data.list1.concat(eye_cream_list),
          })
        }
      })
      that.setData({
        list1: that.data.list1.concat(eye_cream_list),
      })
      console.log("list1");
      console.log(that.data.list1);
    }
    console.log("眼霜加载完毕");
  },


  Essence: function () {
    console.log("Essence被触发啦");
    var that = this;
    that.setData({
      show_pic: true,
    })
    console.log(that.data.show_pic);
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
      success: function (res) {
        var essence_list = [];
        for (var i = 0; i < essence; i++) {
          var cur_essence = {
            name: "",
            picture: "",
            cost: "",
            up: 0,
            down: 0,
            up_click: false, //点赞按钮的状态： false: 从来没有按过或者取消了“点赞”状态; true:选择了“点赞”状态 
            down_click: false, //消赞按钮的状态： false: 从来没有按过或者取消了“消赞”状态; true:选择了“消赞”状态
            id: "" //获取护肤品的id号，方便上传新的点赞数据
          };
          cur_essence.name = res.data[i].name;
          cur_essence.picture = res.data[i].image;
          cur_essence.cost = res.data[i].price;
          cur_essence.up = res.data[i].up;
          cur_essence.down = res.data[i].down;
          cur_essence.id = res.data[i]._id;
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
  Emulsion: function () {
    var that = this;
    that.setData({
      show_pic: true,
    })
    console.log(that.data.show_pic);
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
      success: function (res) {
        var emulsion_list = [];
        for (var i = 0; i < emulsion; i++) {
          var cur_emulsion = {
            name: "",
            picture: "",
            cost: "",
            up: 0,
            down: 0,
            up_click: false, //点赞按钮的状态： false: 从来没有按过或者取消了“点赞”状态; true:选择了“点赞”状态 
            down_click: false, //消赞按钮的状态： false: 从来没有按过或者取消了“消赞”状态; true:选择了“消赞”状态
            id: "" //获取护肤品的id号，方便上传新的点赞数据
          };
          cur_emulsion.name = res.data[i].name;
          cur_emulsion.picture = res.data[i].image;
          cur_emulsion.cost = res.data[i].price;
          cur_emulsion.up = res.data[i].up;
          cur_emulsion.down = res.data[i].down;
          cur_emulsion.id = res.data[i]._id;
          emulsion_list.push(cur_emulsion);
        }
        console.log("乳液列表");
        console.log(emulsion_list);
        that.setData({
          list4: emulsion_list,
        })
      }
    });
    console.log("Emulsion加载完毕");
  },
  Lotion: function () {
    var that = this;
    that.setData({
      show_pic: true,
    })
    console.log(that.data.show_pic);
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
      success: function (res) {
        var lotion_list = [];
        for (var i = 0; i < lotion; i++) {
          var cur_lotion = {
            name: "",
            picture: "",
            cost: "",
            up: 0,
            down: 0,
            up_click: false, //点赞按钮的状态： false: 从来没有按过或者取消了“点赞”状态; true:选择了“点赞”状态 
            down_click: false, //消赞按钮的状态： false: 从来没有按过或者取消了“消赞”状态; true:选择了“消赞”状态
            id: "" //获取护肤品的id号，方便上传新的点赞数据
          };
          cur_lotion.name = res.data[i].name;
          cur_lotion.picture = res.data[i].image;
          cur_lotion.cost = res.data[i].price;
          cur_lotion.up = res.data[i].up;
          cur_lotion.down = res.data[i].down;
          cur_lotion.id = res.data[i]._id;
          lotion_list.push(cur_lotion);
        }
        console.log("爽肤水列表");
        console.log(lotion_list);
        that.setData({
          list3: lotion_list,
        })
      }
    });
    console.log("Lotion加载完毕");
  },
})