Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgurl: '',
    windowheight: 0,
    windowwidth:0,
    showrende: false,
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    var that = this;
    //console.log(getApp().globalData.httpimg + 'bc_bg1.png');
    //仁德广告
    if(undefined != options.name) {
      var image = options.name;
      that.data.bgurl = getApp().globalData.httpimg + image;
      that.setData({
        bgurl: that.data.bgurl,
      });
    }
    //哆米广告位
    else {
      that.data.showrende = true;
      that.setData({
        showrende: that.data.showrende
      });
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