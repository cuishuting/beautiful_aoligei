Page({
  data: {
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

  //模拟框函数
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

  //修改便签函数
  edit:function(e){

  }
})