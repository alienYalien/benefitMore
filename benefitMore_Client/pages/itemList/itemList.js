
const requestNum = 5;
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topicContent:'',
    state:2,//2 最新项目， 1 成功案例
    itemIndex : 0,//保存计算得下标
    toView: 'red',
    scrollTop: 200,
    isTest:false,
    addurl: '../../images/plus.png',
    minusurl: '../../images/minus.png',
    clockurl: '../../images/clock.png',
    collecturl: '../../images/collect.png',
    shareurl: '../../images/share.png',
    talkurl: '../../images/talk.png',
    itemInfo : {
        name:'',
        createTime:'',
        state:1,
        time:'2018.10.29-12AM',
        operaurl: '../../images/plus.png',
    },
    lists:[
      
    ],
  },

  tapname : function (e) {
    // console.log (e);
    var that = this;
    wx.navigateTo({
      url: '../itemInfo/itemInfo?iteminfo=' + JSON.stringify(that.data.lists[e.currentTarget.id]),
    })
  },
  //分享
  share : function (e) {
      wx.showToast({
        title: '功能暂未开放',
        icon:'none',
        duration: 1000,
      })
  },
  //聊天
  wechat: function (e) {
    wx.showToast({
      title: '功能暂未开放',
      icon: 'none',
      duration: 1000,
    })
  },

  //收藏
  collect: function (e) {
    wx.showToast({
      title: '功能暂未开放',
      icon: 'none',
      duration: 1000,
    })
  },

  scroll : function (e) {
    //console.log('scroll', e);
  },
  upper : function (e) {
  
    this.refresh();
  },
  lower : function (e) {
    var that = this;
    this.loadMore();
  },
  tapItem : function(e) {
//      console.log (e);
      var that = this;
      var index = e.currentTarget.id;
    if (that.data.lists[index].state == 1) {
      that.data.lists[index].state = 0;
      }
      else {
      that.data.lists[index].state = 1;
      }

      that.setData({
        lists: that.data.lists,
      });
  },

  refresh: function () {
    var that = this;
    that.setData({
      lists: [],
      itemIndex: 0,
    });
    //向服务器发送数据申请
    that.getServerItemInfos(that.data.itemIndex);
  },

  loadMore : function () {
    var that = this;
    //向服务器发送数据申请
    that.getServerItemInfos(that.data.itemIndex);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
//      console.log(options);
      var that = this;
      if(that.data.isTest) {
        for (var i = 0; i < 10; i++) {
          var t = new Object();
          t.name = '学校电商';
          t.createTime = '2018.10.26-12AM';
          t.state = 1;
          that.data.lists.push (t);
          that.setData({
            itemIndex: 0,
            lists : that.data.lists,
          });
        }
      }
      else {
        that.data.state = options.state;
        that.setData ({
          state: that.data.state,
        })
        // topicContent: '',
        // state: 2,//
        if(that.data.state == 2) {
          that.data.topicContent = 'Latest Projects';
        }
        else if(that.data.state == 1) {
          that.data.topicContent = 'Success Projects'
        }
        else if(that.data.state == 3) {
          that.data.topicContent = 'My Items'
        }
        that.setData({
          lists:[],
          itemIndex: 0,
          topicContent: that.data.topicContent,

        });
        //向服务器发送数据申请
        that.getServerItemInfos (that.data.itemIndex);
      }
  },

  getServerItemInfos : function (index){
    
    wx.showLoading({
      title: 'loading...',
    })

    var that = this;
    var salesId = getApp().globalData.userinfo.salesId;
    //发送http申请，要数据.
    var test = app.globalData.httpaddr + 'getPro?' + 'state=' + that.data.state + '&offset=' + index + '&limit=' + requestNum;
    //我的业务员: 3
    //var test = app.globalData.httpaddr + 'getMySales?salesId=' + salesId;
    
    //我的项目: 4
    //var test = app.globalData.httpaddr + 'getMyPro?salesId=' + salesId;
    if(that.data.state == 3) {
      test = app.globalData.httpaddr + 'getMyPro?' + 'limit=' + requestNum + '&offset=' + index + '&salesId=' + salesId;
    }
    
    app.httpClient(test, (error, data) => {
      //console.log(data);
      if (data.errorCode == 0) {
       // console.log(data);
        for(var i = 0; i< data.rows.length; i++) {
          that.data.lists.push (data.rows[i]);
          that.data.lists[that.data.lists.length - 1].state = 1;
        }
        that.data.itemIndex += data.rows.length;
        this.setData({ 
          lists: that.data.lists,
          itemIndex:that.data.itemIndex,
        })
        //console.log ('lists', that.data.lists);
      } else {
      }
      
      wx.hideLoading();

    })
    //返回得数据加载到lists中
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