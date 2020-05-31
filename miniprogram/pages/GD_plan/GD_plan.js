// pages/day/day.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabNav:['今日待办','周计划','月计划'],
    delBtnWidth: 180, //删除按钮宽度单位（rpx）;
    //日计划数据
    day_text:'',
    TabCur:'',
    list: [
      {
        txtStyle: "",
        txt: "物理作业"
      },
      {
        txtStyle: "",
        txt: "化学作业"
      },
      {
        txtStyle: "",
        txt: "生物作业"
      },
    ],
    //月计划数据
    isclick:false,
    year: 0,
    month: 0,
    mydate: ['日', '一', '二', '三', '四', '五', '六'],
    date: "2020-05-01",
    adddate:'',
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    showDialog: false,
    text: '',
    usertext: "还没有添加内容",
    editTrue: false,
    info: [
      {
        id: 2020526,
        text: "英语考试"
      },
      {
        id: 2020531,
        text: "小红花"
      }
    ]
  },
  checkboxChange: function (e) {
    var temp1 = e.detail.value
    var temp2 = ''
    console.log(temp1)
    if (temp1.length != 0) {
      for (var i = 0, len = temp1.length; i < len; i++) {
        temp2 = temp2 + temp1[i] + ','
      }
      /*this.setData({
       text:'您选择了：'+temp2
      })*/
    } else {
      /*this.setData({
       text:''
      })*/
    }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  backText: function (e) {
    var that = this;
    var add_text = e.detail.value.add_text;
    console.log(add_text);
    if (add_text != '') {
      var add_list = {
        txtStyle: "",
        txt: add_text
      }
      that.data.list.push(add_list)
      console.log(that.data.list)
      that.setData({
        list: that.data.list,
        day_text:''
      });
    }
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {
        txtStyle = "left:0px";
      } else if (disX > 0) {
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  },

  touchE: function (e) {
    if (e.changedTouches.length == 3) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      console.log(index);
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件
  delItem: function (e) {
    //获取列表中要删除项的下标
    var index = e.target.dataset.index;
    var list = this.data.list;
    //移除列表中下标为index的项
    list.splice(index, 1);
    //更新列表的状态
    this.setData({
      list: list
    });
  },
  //测试临时数据
  checkboxChange: function (e) {
    var temp1 = e.detail.value;
    var temp2 = ''
    console.log(temp1)
    if (temp1.length != 0) {
      for (var i = 0, len = temp1.length; i < len; i++) {
        temp2 = temp2 + temp1[i] + ','
      }
      /*this.setData({
       text:'您选择了：'+temp2
      })*/
    } else {
      /*this.setData({
       text:''
      })*/
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.initEleWidth();
    
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
  tabSelect(e) {
    var pagenum=e.currentTarget.dataset.id
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
    if(pagenum==2)
    wx.navigateTo({
      url: '../calendar/calendar',
    })
  }
})