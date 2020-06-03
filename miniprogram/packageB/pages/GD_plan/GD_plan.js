// pages/day/day.js
Page({
  data: {
    tabNav:['今日待办','周计划','月计划'],
    delBtnWidth: 180, //删除按钮宽度单位（rpx）;
    //日计划数据
    day_text:"",
    TabCur:'',
    day_todo_list: [],
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
    ],
    time: '12:01',
    week_todo:[
      {
        day: 1,
        start_time: 0,
        context: "睡觉",
        length:6,
      },
      {
        day:3,
        start_time: 10,
        context: "机器学习",
        length:1.67,
      },
      {
        day:1,
        start_time: 14,
        context:"软件工程",
        length:1.67,
      }
    ]
  },
   /*监听*/
   onLoad: function () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    })
    this.inquire_day_todo();
  },

  inquire_day_todo:function(){
    let day_todo=[];
    const db = wx.cloud.database();
    db.collection('Day_todo').where({
      _openid : getApp().globalData.openid
    })
    .get({
      success: res=> {
        for(var i=0;i<res.data.length;i++)
        {
          day_todo.push({
            txt: res.data[i].context,
            is_finited: res.data[i].is_finished
          })
        }
        this.setData({
          day_todo_list: day_todo
        })
      }
    });
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
    var that = this
    const db = wx.cloud.database()
    let context = e.detail.value.add_text
    if(context!=''){
      db.collection('Day_todo').add({
        data:{
          context: context,
          is_finished: false,
        },
        success: function(res) {
          console.log(res._id)
        }
      });
      that.data.day_todo_list.push({
        txt: context,
        is_finished: false,
      })
      this.setData({
        day_text:'',
        day_todo_list: that.data.day_todo_list
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
    } else {
    }
  },
  
  tabSelect(e) {
    var pagenum=e.currentTarget.dataset.id
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },

  gettext: function (e) {
    var that = this
    var newtext = e.detail.value.newtext;
    console.log(newtext)
    var mydate=that.data.date
    var mydate1 = mydate.replace(/-/g, '');
    console.log(mydate1)
    mydate=mydate1
    if(mydate1.charAt(6)=='0')
    {
      mydate=mydate1.slice(0,6)+mydate1.slice(-1)
      console.log(mydate)
    }
    if(mydate1.charAt(4)=='0')
    {
      mydate1=mydate.slice(0,4)+mydate.slice(5)
      console.log(mydate1)
    }
    var addtext={
      id:mydate1,
      text:newtext
    }
    that.data.info.push(addtext)
    console.log(addtext)
    that.setData({
      text: '',
      info:that.data.info
    });
  },

//选择框函数
DateChange(e) {
  this.setData({
    date: e.detail.value
  })
  console.log(this.data.date)
},

  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];                        //需要遍历的日历数组数据
    let arrLen = 0;                            //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                    //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();                            //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();                //获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },

  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },

  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },

  //触摸函数
  mytap: function (e) {
    var mydate = e.currentTarget.dataset.date
    var that = this
    var arr = that.data.info;
    var i = 0
    var len=arr.length
    for (i=0; i < len; i++) {
      if (arr[i].id == mydate)
      {
        that.setData({
          usertext: arr[i].text,
          isclick:mydate
        })
        break
      }
    }
    if (i==len)
    that.setData({
      usertext: "还没有添加内容",
      editTrue: true,
      isclick:mydate
    })
    console.log()
  },

  hidebut: function () {
    var that = this;
    if (that.data.editTrue == true) {
      that.setData({
        editTrue: false,
      })
    }
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
})