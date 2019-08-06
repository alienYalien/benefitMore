// pages/me/me.js

var config = require('../../utils/config_createitem.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iteminfos: config.meInfo().list,
    upsideid:'0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
      //读取当前业务员的上级， 如果没有 显示 无上级。
    var that = this;
//    console.log(getApp().globalData.userinfo);
    var str = '我的好友：' + getApp().globalData.userinfo.inWeChatId;
    if ('0' == getApp().globalData.userinfo.inWeChatId) {
      str = '我的好友：没有好友';
    }
    this.data.iteminfos[0].name = str;
      this.setData({
        upsideid: getApp().globalData.userinfo.inWeChatId,
        iteminfos: that.data.iteminfos,
      })
    // var salesId = '4';
    // var test = app.globalData.httpaddr + 'getMyPro?salesId=' + salesId;
    // console.log (test);
    // app.httpClient(test, (error, data) => {
    //   console.log(data);
    //   // if (data.errorCode == 0) {
    //   //   console.log(data);
       
    //   //   //console.log ('lists', that.data.lists);
    //   // } else {
    //   //   console.log("服务器异常", data);
    //   // }
    // });

    // var salesId = '4';
    // var test = app.globalData.httpaddr + 'getMySales?salesId=' + salesId;
    // console.log(test);
    // app.httpClient(test, (error, data) => {
    //   console.log(data);
    //   // if (data.errorCode == 0) {
    //   //   console.log(data);

    //   //   //console.log ('lists', that.data.lists);
    //   // } else {
    //   //   console.log("服务器异常", data);
    //   // }
    // });
  },

  tapMy: function (e) {
//    console.log ('tapMyPro', e);
    var id = e.currentTarget.id;
    // wx.showToast({
    //   title: '暂无数据',
    //   duration:1000
    // })
    if(id == 1) {//my pro
      wx.navigateTo({
        url: '../itemList/itemList?state=' + 3,//我的项目
      })
    }
    else if(id == 2) {// my sales
      wx.navigateTo({
        url: '../salesList/salesList?state=' + 4,//我的业务员
      })
    }
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