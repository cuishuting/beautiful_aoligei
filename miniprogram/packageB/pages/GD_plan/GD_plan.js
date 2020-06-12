// pages/day/day.js
const db = wx.cloud.database();
Page({
  data: {
    tabNav: ['今日待办', '周计划', '月计划'],
    delBtnWidth: 180, //删除按钮宽度单位（rpx）;
    //日计划数据
    day_text: "",
    TabCur: '',
    day_todo_list: [],
    day_edittext:"",
    day_index:0,
    //月计划数据
    cal_addtext:'',
    cal_index: 0,
    isclick: false,
    year: 0,
    month: 0,
    mydate: ['日', '一', '二', '三', '四', '五', '六'],
    date: "2020-05-01",
    adddate: '',
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    showDialog: false,
    text: '',
    usertext: "还没有添加内容",
    editTrue: false,
    info: [],
    clickdate: '',
    week_starttime: '12:00',
    week_todo: [],
    repeat_index: 0,
    week_repeat_picker: ['每天', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    week_current_index: '',
    week_current_repeat: '',
    week_current_start_time: ''
  },
  /*监听*/
  onLoad: function () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.inquire_day_todo();
    this.inquire_month_todo();
    this.inquire_week_todo();
    if (month >= 10) {
      this.setData({
        year: year,
        month: month,
        isToday: '' + year + month + now.getDate(),
      })
    }
    else {
      this.setData({
        year: year,
        month: month,
        isToday: '' + year + '0' + month + now.getDate(),
      })
    }

  },

  inquire_day_todo: function () {
    let day_todo = [];
    db.collection('Day_todo').where({
      _openid: getApp().globalData.openid
    })
      .get({
        success: res => {
          for (var i = 0; i < res.data.length; i++) {
            day_todo.push({
              txt: res.data[i].context,
              is_finished: res.data[i].is_finished,
              id: res.data[i]._id,
              txtStyle: ''
            })
          }
          this.setData({
            day_todo_list: day_todo
          })
        }
      });
  },
  inquire_month_todo: function () {
    let month_todo = [];
    db.collection('Month_todo').where({
      _openid: getApp().globalData.openid
    })
      .get({
        success: res => {
          for (var i = 0; i < res.data.length; i++) {
            month_todo.push({
              text: res.data[i].context,
              id: res.data[i]._id,
              date_id: res.data[i].date_id,
              month: res.data[i].month
            })
          }
          this.setData({
            info: month_todo
          })
          this.dateInit();
        }
      });
  },
  day_checkboxChange: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.day_todo_list;
    var id = list[index].id
    var is = !(list[index].is_finished)
    list[index].is_finished = is
    db.collection('Day_todo').doc(id).update({
      data: {
        is_finished: is
      }
    });
    this.setData({
      day_todo_list: list
    });
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
    let context = e.detail.value.add_text
    if (context != '') {
      db.collection('Day_todo').add({
        data: {
          context: context,
          is_finished: false,
        },
        success: res => {
          that.data.day_todo_list.push({
            txt: context,
            is_finished: false,
            id: res._id,
            txtStyle: ''
          });
          this.setData({
            day_text: '',
            day_todo_list: that.data.day_todo_list
          });
        }
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
      var list = this.data.day_todo_list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        day_todo_list: list
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
      var list = this.data.day_todo_list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        day_todo_list: list
      });
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
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
    var list = this.data.day_todo_list;
    var id = list[index].id
    db.collection('Day_todo').doc(id).remove();
    list.splice(index, 1);
    this.setData({
      day_todo_list: list
    });
  },

  editItem: function (e) {
    //获取列表中要删除项的下标
    var that=this;
    var index = e.target.dataset.index;
    that.setData({
      day_index:index,
      day_edittext:that.data.day_todo_list[index].txt
    })
    that.showModal(e);
  },

  day_backText:function(e){
    var that = this
    let context = e.detail.value.day_edit_text
    var arr = that.data.day_todo_list;
    var i = that.data.day_index
          var id = arr[i].id
          var playStatus = "day_todo_list[" + i + "].txt";
          that.setData({
            [playStatus]: context,
            day_edittext: context
          })
          console.log(that.data.day_todo_list[i].txt)
      db.collection('Day_todo').doc(id).update({
        data: {
          context: context
        }
      });
  },

  tabSelect(e) {
    var pagenum = e.currentTarget.dataset.id
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  //月计划函数
  To_dateid: function (mydate) {
    var mydate1 = mydate.replace(/-/g, '');
    mydate = mydate1
    if (mydate1.charAt(6) == '0') {
      mydate = mydate1.slice(0, 6) + mydate1.slice(-1)
    }
    return mydate
  },
  cal_add: function (newtext, mydate1) {
    var that = this
    db.collection('Month_todo').add({
      data: {
        context: newtext,
        date_id: mydate1,
        month: mydate1.slice(4, 6)
      },
      success: res => {
        that.data.info.push({
          id: res._id,
          text: newtext,
          date_id: mydate1,
          month: mydate1.slice(4, 6)
        });
        this.setData({
          info: that.data.info
        });
      }
    });
    if (that.data.isclick==true) {
      var playStatus = "dateArr[" + that.data.cal_index + "].ishas";
      var playtext = "dateArr[" + that.data.cal_index + "].caltext";
      that.setData({
        cal_addtext: '',
        usertext: newtext,
        [playStatus]: true,
        [playtext]: newtext
      });
    }
    else if(mydate1.slice(4, 6)==that.data.month){
      that.cal_samemonth(mydate1,newtext)
    }
  },
  cal_samemonth:function(mydate1,newtext){
    var that=this
    var index=that.To_dateid(that.data.clickdate).slice(6)-that.data.cal_index
      index=mydate1.slice(6)-index
      console.log(index)
      var playStatus = "dateArr[" + index + "].ishas";
      var playtext = "dateArr[" + index + "].caltext";
      that.setData({
        cal_addtext: '',
        usertext: newtext,
        [playStatus]: true,
        [playtext]: newtext
      });
  },
  gettext: function (e) {
    var that = this
    var mydate = that.data.date
    var mydate1 = that.To_dateid(mydate)
    console.log(mydate1)
    var arr = that.data.info
    var i=0
    var ifhave=false
    var id
    for(i=0;i<arr.length;i++)
    {
      if(arr[i].date_id==mydate1)
      {
        that.setData({
          text:arr[i].text
        })
        ifhave=true
        id=arr[i].id
        break;
      }
    }
    var newtext = e.detail.value.newtext;
    if(ifhave==true){
      var playStatus = "info[" + i + "].text";
      that.setData({
        [playStatus]: newtext,
        cal_addtext: ''
      })
      db.collection('Month_todo').doc(id).update({
        data: {
          context: newtext
        }
      });
      if(mydate1.slice(4,6)==that.data.month)
      {
        that.cal_samemonth(mydate1,newtext)
      }
      if(that.data.isclick==true)
      that.setData({
        usertext:newtext
      })
    }
    else
    this.cal_add(newtext, mydate1)
  },

  //选择框函数
  DateChange(e) {
    var that = this
    var arr=that.data.info
    var now=e.detail.value
    that.setData({
      date: now
    })
    var i
    for(i=0;i<arr.length;i++)
    {
      if(arr[i].date_id==that.To_dateid(now))
      {
        console.log(arr[i].date_id)
        that.setData({
          cal_addtext:arr[i].text
        })
        break;
      }
    }
    if(i==arr.length)
    that.setData({
      cal_addtext:""
    })
    console.log(that.data.cal_addtext)
    //console.log(arr[i].text)
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
    var that = this
    var arr = that.data.info;
    var len = arr.length
    var ifhas = false
    var Today
    var num_list = []//存储info列表中和当前相同月份的索引值
    var cal_text = "还没有添加内容哦"
    for (var j = 0; j < len; j++) {
      if (arr[j].month == '' + (month + 1) || arr[j].month == '0' + (month + 1)) {
        num_list.push(j)
      }
    }
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        if (month >= 9)
          Today = '' + year + (month + 1) + (num)
        else
          Today = '' + year + '0' + (month + 1) + (num)
        for (var m = 0; m < num_list.length; m++) {
          if (arr[num_list[m]].date_id == Today) {
            ifhas = true
            cal_text = arr[num_list[m]].text
            break
          }
        }
        if (m == num_list.length) {
          ifhas = false
          cal_text = "还没有添加内容哦"
        }
        obj = {
          isToday: Today,
          dateNum: num,
          weight: 5,
          ishas: ifhas,
          caltext: cal_text
        }
      }
      else {
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
    var myindex = e.currentTarget.dataset.cal_index
    var that = this
    that.setData({
      clickdate: mydate,
      cal_index: myindex
    })
    that.setData({
      usertext: that.data.dateArr[that.data.cal_index].caltext,
      isclick: mydate,
    })
    console.log(myindex)
    console.log(that.data.info)
    //if(that.data.usertext=="还没有添加内容哦")
    that.setData({
      editTrue: true,
    })
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
      week_starttime: e.detail.value
    })
  },
  cal_edit: function (e) {
    var that = this
    var edittext = e.detail.value.edittext;
    var editdate = that.data.clickdate
    var arr = that.data.info;
    var i = 0
    var len = arr.length
    var temp = that.data.usertext
    if (temp == "还没有添加内容哦") {
      that.cal_add(edittext, editdate)
      console.log(that.data.info)
    }
    else {
      for (i = 0; i < len; i++) {
        if (arr[i].date_id == editdate) {
          var id = arr[i].id
          var playStatus = "info[" + i + "].text";
          that.setData({
            [playStatus]: edittext,
            cal_addtext: ''
          })
          break
        }
      }
      db.collection('Month_todo').doc(id).update({
        data: {
          context: edittext
        }
      });
    }
    var playtext = "dateArr[" + that.data.cal_index + "].caltext";
    that.setData({
      [playtext]: edittext,
      usertext: edittext
    });
  },
  cal_delete: function () {
    var that = this
    var arr = that.data.info;
    var i = 0
    var len = arr.length
    var list = that.data.info
    for (i = 0; i < len; i++) {
      if (arr[i].date_id == that.data.clickdate) {
        var id = arr[i].id
        db.collection('Month_todo').doc(id).remove();
        list.splice(i, 1);
        this.setData({
          info: list
        });
        break
      }
    }
    var playStatus = "dateArr[" + that.data.cal_index + "].ishas";
    var playtext = "dateArr[" + that.data.cal_index + "].caltext";
    that.setData({
      [playStatus]: false,
      [playtext]: "还没有添加内容哦",
      usertext: "还没有添加内容哦"
    });
    that.hideModal()
  },
  //周计划函数
  repeat_PickerChange(e) {
    this.setData({
      repeat_index: e.detail.value
    })
  },
  week_submit_todo(e) {
    var repeat = parseInt(this.data.repeat_index);
    var start_time = this.data.week_starttime;
    var time_length = e.detail.value.week_time_length;
    var newtext = e.detail.value.week_newtext;
    var start_list = start_time.split(':');
    var start = parseFloat(start_list[0]) + parseFloat(start_list[1]) / 60;
    var length = parseFloat(time_length);
    var week_todo = this.data.week_todo;
    db.collection('Week_todo').add({
      data: {
        day: repeat,
        start_time: start,
        time_length: length,
        context: newtext
      },
      success: res => {
        if (repeat != 0) {
          week_todo.push({
            id: res._id,
            day: repeat,
            start_time: start,
            length: length,
            context: newtext
          });
        }
        else {
          for (var j = 1; j <= 7; j++) {
            week_todo.push({
              id: res._id,
              day: j,
              start_time: start,
              length: length,
              context: newtext
            });
          }
        }
        this.setData({
          week_todo: week_todo,
          week_starttime: '12:00',
          repeat_index: 0,
          text: ''
        })
      }
    });
  },
  inquire_week_todo: function () {
    let week_todo = [];
    db.collection('Week_todo').where({
      _openid: getApp().globalData.openid
    })
      .get({
        success: res => {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].day != 0) {
              week_todo.push({
                id: res.data[i]._id,
                day: res.data[i].day,
                start_time: res.data[i].start_time,
                length: res.data[i].time_length,
                context: res.data[i].context
              })
            }
            else {
              for (var j = 1; j <= 7; j++) {
                week_todo.push({
                  id: res.data[i]._id,
                  day: j,
                  start_time: res.data[i].start_time,
                  length: res.data[i].time_length,
                  context: res.data[i].context
                })
              }
            }
          }
          this.setData({
            week_todo: week_todo
          })
        }
      });
  },
  week_set_current_id: function (e) {
    var index = e.currentTarget.dataset.index;
    var week_todo = this.data.week_todo;
    var id = week_todo[index].id;
    var start = week_todo[index].start_time;
    var hour = parseInt(start);
    if ((hour + '').length == 1) hour = '0' + hour;
    var minite = parseInt((start - parseInt(start)) * 60);
    if ((minite + '').length == 1) minite = '0' + minite;
    start = hour + ':' + minite;
    var count = 0;
    var day = '';
    for (var i = 0; i < week_todo.length; i++) {
      if (week_todo[i].id == id) {
        switch (week_todo[i].day) {
          case 1:
            day = '周一';
            break;
          case 2:
            day = '周二';
            break;
          case 3:
            day = '周三';
            break;
          case 4:
            day = '周四';
            break;
          case 5:
            day = '周五';
            break;
          case 6:
            day = '周六';
            break;
          case 7:
            day = '周日';
            break;
        }
        count += 1;
      }
    }
    if (count == 7) day = '每天';
    this.setData({
      week_current_index: index,
      week_current_repeat: day,
      week_current_start_time: start
    })
    this.showModal(e);
  },
  week_edit: function (e) {
    var week_todo = this.data.week_todo;
    var repeat = week_todo[this.data.week_current_index].day;
    var start = this.data.week_current_start_time;
    var id = week_todo[this.data.week_current_index].id;
    var count = 0;
    for (var i = 0; i < week_todo.length; i++) {
      if (week_todo[i].id == id) {
        count += 1;
      }
    }
    if (count == 7) repeat = 0;
    this.setData({
      repeat_index: repeat,
      week_starttime: start
    });
    this.showModal(e);
  },
  week_submit_edit: function (e) {
    var repeat = parseInt(this.data.repeat_index);
    var start_time = this.data.week_starttime;
    var time_length = e.detail.value.week_time_length;
    var newtext = e.detail.value.week_newtext;
    var start_list = start_time.split(':');
    var start = parseFloat(start_list[0]) + parseFloat(start_list[1]) / 60;
    var length = parseFloat(time_length);
    var week_todo = this.data.week_todo;
    db.collection('Week_todo').doc(this.data.week_todo[this.data.week_current_index].id).update({
      data: {
        day: repeat,
        start_time: start,
        time_length: length,
        context: newtext
      },
      success: res => {
        this.inquire_week_todo();
        this.setData({
          week_starttime: '12:00',
          repeat_index: 0,
          text: ''
        })
      }
    });
  },
  week_delete: function (e) {
    var week_todo = this.data.week_todo;
    var id = week_todo[this.data.week_current_index].id;
    db.collection('Week_todo').doc(id).remove();
    for (var i = 0; i < week_todo.length; i++) {
      if (week_todo[i].id == id) {
        week_todo.splice(i, 1);
        i--;
      }
    }
    this.setData({
      week_todo: week_todo,
      week_starttime: '12:00',
      repeat_index: 0,
      text: ''
    })
    this.hideModal();
  }
})