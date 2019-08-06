// pages/itemInfo.js
var config = require('../../utils/config_createitem.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight:0,
    scrollHeight:0,
    toView: 'red',
    scrollTop: 200,
    iteminfo:{},//当前选中项目信息
    isTest:false,
    testItemInfo : {
      name:'张三',//发起人姓名
      phone:'135xxxx0000',//手机号
      cmpName: '唐山学院公益组织',//发起组织名称
      itemName:'走走走公益',//公益活动名称
      itemStage:1,//活动审核阶段
      itemType:0,//活动类型
      itemMoney:1,//活动形式
      itemArea:2,//活动领域
      itemImgUrl:"img/proImg/hBjpy1Y2sswqB7XHYtUtbrSs.png",
      itemImgUrl2:"img/proImg/2ErK4YYO-hMUToCTYVvZOzwU.png",
      itemImgUrl3:"img/proImg/8XFiA14PGfm_JU7aCPe5zko0.png",
      itemImgUrl4:"img/proImg/WtJQN8Dia7LNm6Q8iqML0grt.png",
      itemImgUrl5:"img/proImg/or6QzKKUXFzABtvGJ0G4V1v3.png",
      itemImgUrl6:"img/proImg/_ex8aF-CaljFcL1TDVXRuuQE.png",
      itemDesc:'公告：尊敬的阿里云用户，近期有不法分子冒用阿里云客服名义发布不实系统升级信息，为保障您的合法权益，避免造成不必要的损失，我们在此提醒您：阿里云系统信息会通过官方客服95187或阿里云官网进行公告。任何个人号码发布系统升级或服务承诺变更等信息，均系违法行为。如发现上述可疑情况，请及时反馈阿里云客服，我们将会同公安机关依法予以严厉打击，并保留进一步追究其法律责任的权力。',
    },
    swiperArray:[
    ],
    cmpInfoArray:[],
    itemInfoArray:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
   
    tabs: ["组织信息", "活动信息"],
    activeIndex:0,
  },

  upper: function (e) {

  },
  lower: function (e) {

  },

  scroll : function (e) {

  },

  tabClick : function (e) {
      var that = this;
//      console.log (e);
      this.setData({
        activeIndex: e.currentTarget.id
      })
  },

  previewImage: function(e) {
    var that = this;
    var current = e.currentTarget.id;
  //  console.log(e);
    wx.previewImage({
      current: that.data.swiperArray[current],
      urls: that.data.swiperArray
    });
  },

  swipeImg : function () {

  },

  swiperChange:function(e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    wx.showLoading({
      title: 'loading...',
    })
    var that = this;
    var data = this.data;
    if(data.isTest == true) {
        data.iteminfo = data.testItemInfo;
    }
    else {
      // console.log("接收到的参数是iteminfo=" + options.iteminfo);
      data.iteminfo = JSON.parse(options.iteminfo);
     // console.log(data.iteminfo);
    }

    that.setData({
      iteminfo: data.iteminfo,
    });


    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          swiperHeight: res.windowWidth * 600 / 800,
        });
        that.data.scrollHeight = res.windowHeight - that.data.swiperHeight - 100/2.34;
        that.setData({
          scrollHeight: that.data.scrollHeight,
        });
      },
    })

    //保存图片信息
    if (undefined != data.iteminfo.itemImg && '' != data.iteminfo.itemImg){
      data.swiperArray.push(getApp().globalData.httpaddr + data.iteminfo.itemImg);
    }

    if (undefined != data.iteminfo.itemImg2 && '' != data.iteminfo.itemImg2) {
      data.swiperArray.push(getApp().globalData.httpaddr + data.iteminfo.itemImg2);
    }

    if (undefined != data.iteminfo.itemImg3 && '' != data.iteminfo.itemImg3) {
      data.swiperArray.push(getApp().globalData.httpaddr + data.iteminfo.itemImg3);
    }

    if (undefined != data.iteminfo.itemImg4 && '' != data.iteminfo.itemImg4) {
      data.swiperArray.push(getApp().globalData.httpaddr + data.iteminfo.itemImg4);
    }

    if (undefined != data.iteminfo.itemImg5 && '' != data.iteminfo.itemImg5) {
      data.swiperArray.push(getApp().globalData.httpaddr + data.iteminfo.itemImg5);
    }

    if (undefined != data.iteminfo.itemImg6 && '' != data.iteminfo.itemImg6) {
      data.swiperArray.push(getApp().globalData.httpaddr + data.iteminfo.itemImg6);
    }


    //保存发起人信息.
    var t = new Object ();
    t.name = '发起人姓名:';
    t.content = data.iteminfo.legalManName;
    that.data.cmpInfoArray[0] = t;

    //保存发起组织信息
    t = new Object();
    t.name = '发起组织名称:';
    t.content = data.iteminfo.cmpName;
    that.data.cmpInfoArray[1] = t;
    
    //保存联系人信息
    t = new Object();
    t.name = '联系人电话:';
    t.content = data.iteminfo.legalManPhone;
    that.data.cmpInfoArray[2] = t;
  

    var config_itemdata = config.itemdata();
    //保存公益活动信息
    t = new Object ();
    t.name = '活动名称:';
    t.content = data.iteminfo.itemName;
    that.data.itemInfoArray[0] = t;

    //保存活动类型
    t = new Object();
    t.name = '活动类型:';
    t.content = data.iteminfo.itemType;//config_itemdata.list[0].array[data.iteminfo.itemType];
    that.data.itemInfoArray[1] = t;

    //保存活动审核阶段
    t = new Object();
    t.name = '活动形式:';
    t.content = data.iteminfo.itemMoney;//config_itemdata.list[1].array[data.iteminfo.itemMoney];
    that.data.itemInfoArray[2] = t;

    //保存活动领域
    t = new Object();
    t.name = '活动领域:';
    t.content = data.iteminfo.itemArea;//config_itemdata.list[2].array[data.iteminfo.itemArea];
    that.data.itemInfoArray[3] = t;


    that.setData({
      iteminfo: data.iteminfo,
      swiperArray: data.swiperArray,
      cmpInfoArray: data.cmpInfoArray,
      itemInfoArray: data.itemInfoArray,
    });

    
    if (data.swiperArray.length < 1) {
      data.swiperArray.push(getApp().globalData.httpaddr + 'loan/defaultfront.png');
    }
    this.setData ({
      swiperArray: data.swiperArray,
    })
//    console.log('iteminfo', data);  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.hideLoading();
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