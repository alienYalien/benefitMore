// pages/salesList/salesList.js
const requestNum = 5;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicContent: '',
    lists: [
    ],
    itemIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.data.topicContent = 'All Sales';
      that.setData ({
        lists: [],
        itemIndex: 0,
        topicContent: that.data.topicContent,
      })
    this.getServerItemInfos(that.data.itemIndex);
    
  },

  getServerItemInfos: function (index) {
    var that = this;
    var salesId = getApp().globalData.userinfo.salesId;
    //console.log ('salesId', salesId);
    var test = app.globalData.httpaddr + 'getMySales?' + 'limit=' + requestNum + '&offset=' + index + '&salesId=' + salesId;

    app.httpClient(test, (error, data) => {
      //console.log(data);
      if (data.errorCode == 0) {
        // console.log(data);
        for (var i = 0; i < data.rows.length; i++) {
          that.data.lists.push(data.rows[i]);
          that.data.lists[that.data.lists.length - 1].state = 1;
        }

        if(0 == that.data.lists.length) {
          wx.showToast({
            title: '没有业务员',
            duration:1500,
          })
        }
        that.data.itemIndex += data.rows.length;
        this.setData({
          lists: that.data.lists,
          itemIndex: that.data.itemIndex,
        })
        //console.log ('lists', that.data.lists);
      } else {
      }

      wx.hideLoading();

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