var config = require('../../utils/config_createitem.js')
const isdebug = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex:2,
    swiperHeight:0,//广告位高度
    middleHeight:0,//中间区域高度
    sucareaimgs:[//成功案例point
      "point.png", "point2.png", "point3.png"
    ],
    latestitembg:[//最新公益活动背景颜色
      "#52c7ca", "#6c6fff", "#7a82ac", "#52c7ca", "#6c6fff", "#7a82ac"
    ],
    tabbar: {
      "color": "#999999",
      "selectedColor": "#7788dd",
      "borderStyle": "#dcdcdc",
      "backgroundColor": "#303238",
      "list": [
      {
        "key": "home",
        "iconPath": "/images/icon_home.png",
        "selectedIconPath": "/images/icon_home_active.png",
        "text": "首页"
      },
      {
        "key": "share",
        "iconPath": "/images/icon_tag.png",
        "selectedIconPath": "/images/icon_tag_active.png",
        "text": "分享"
      },
      {
        "key": "createitem",
        "iconPath": "/images/icon_notebook.png",
        "selectedIconPath": "/images/icon_notebook_active.png",
        "text": "创建公益活动"
      },
      {
        "key": "me",
        "iconPath": "/images/icon_me.png",
        "selectedIconPath": "/images/icon_me_active.png",
        "text": "我"
      }
      ]
    },

    
    lists: [
      ],
    suclists:[
    
    ],
    bannerlist: [],
    nzopen:false,
    nzshow:true,
    isfull: false,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    share:[],
   
  },
  
  tapMoreSucPro : function () {
    wx.navigateTo({
      url: '../itemList/itemList?state=' + 1,
    })
  },
  tapMoreNewPro : function () {

    wx.navigateTo({
      url: '../itemList/itemList?state=' + 2,
    })
  },


  pressSuccItem : function (e) {

    var that = this;
    wx.navigateTo({
      url: '../itemInfo/itemInfo?iteminfo=' + JSON.stringify(that.data.suclists[e.currentTarget.id]),
    })
  },

  pressNewProjectItem:function(e) {
    var that = this;
    wx.navigateTo({
      url: '../itemInfo/itemInfo?iteminfo=' + JSON.stringify(that.data.lists[e.currentTarget.id]),
    })
  },
 
  onLoad: function (options) {
    wx.hideShareMenu();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          swiperHeight: res.screenWidth * 600 / 800,
        });
        that.data.middleHeight = getApp().globalData.windowheight - that.data.swiperHeight - (1 / 2.34) * (100 + 95);
        
        that.data.share = config.shareinfo().list;
       
        //最新分享icon
        for (var i = 0; i < that.data.share.length; i++) {
          that.data.share[i].imageurl = getApp().globalData.httpimg + that.data.share[i].imageurl;
        }
    
        //成功案例制造业image
        for (var i = 0; i < that.data.sucareaimgs.length; i++) {
          that.data.sucareaimgs[i] = getApp().globalData.httpimg + that.data.sucareaimgs[i];
        }

        that.setData({
          share : that.data.share,
          bannerlist: getApp().globalData.bcinfos,
          lists: getApp().globalData.arrNewPro,
          suclists: getApp().globalData.arrSucPro,
          sucareaimgs: that.data.sucareaimgs,
          middleHeight: that.data.middleHeight,
        });
      }
    });
  },

  aboutus : function (e) {
      wx.navigateTo({
        url: '../aboutus/aboutus?name=' + 'aboutus.png',
      })
  },

  scroll: function (e) {
  },

  upper: function (e) { 
  },

  lower: function (e) {
  },


  TurnProjectshow (e) {
    switch (e.currentTarget.id) {
        case "1":{
        wx.navigateTo({
          url: '../bc1/bc1?name=' + 'bc_bg1.png',
        })
          break;
        }
        case "2":{
        wx.navigateTo({
          url: '../bc1/bc1?name=' + 'bc_bg2.png',
        })
          break;
        }
        case "3":{
        wx.navigateTo({
          url: '../domitech_bc/domitech_bc' ,
        })
          break;
        }
      case "4": {
        wx.navigateTo({
          url: '../bc1/bc1?name=' + 'bc_bg4.png',
        })
        break;
      }
    }
  },
  //点击灰色mask
  hidebg: function (e) {
    this.setData({
      nzopen: false,
      nzshow: true,
      isfull: false,
    })
  },
  //标签页相应事件
  tabChange: function (e) {
    var key = e.detail.key
    var that = this;
    if(key == 'home' || key == 'createitem' || key == 'me') {
      if (this.data.nzopen) {
        this.setData({
          nzopen: false,
          isfull: false,
        })
        setTimeout(function () {
          that.setData({
            nzshow: true
          })
        }, 400)
      };
    }
    switch(key) {
      case 'home':{
        //console.log(123);
        wx.reLaunch({
          url: '../startup/startup',
        })
        break;
      }
      case 'createitem':{
        wx.navigateTo({
          url: '../verifyphone/verifyphone?index=0',
        })
        break;
      }
      case 'share':{
        if (this.data.nzopen) {
          this.setData({
            nzopen: false,
            isfull: false,
          })
         setTimeout(function () {
           that.setData({
             nzshow:true
          })}, 400)
        } else {
          this.setData({
            nzopen: true,
            nzshow: false,
            isfull: true
          })
        }
        break;
      }
      case 'me':{
        wx.navigateTo({
          url: '../me/me',
        })
        break;
      }
      default:
      {
        break;
      }
    }
  },

  swiperChange: function (e) {
    //console.log(e.detail.current);    
    // this.setData({
    //   currentNavtab: e.detail.current
    // })
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

  onShareAppMessage: function (res) {

    if (res.from === 'button') {
      var index = res.target.id;//判定是创建公益活动，还是推荐好友
      //console.log('id', index);
      var salesId = getApp().globalData.userinfo.salesId;
//      console.log('salesId', salesId);
      return {
        title: '益多多',
        path: '/pages/startup/startup?id=' + salesId, //此处所写路径与 ① 处相同，若页面需传参数，记得把参数带上
        imageUrl: getApp().globalData.httpimg + 'sharecut.png',
        success: function (res) {
          // 转发成功
          var shareTickets = res.shareTickets;
        //  console.log('success：' + shareTickets);
        },
        fail: function (res) {
          // 转发失败
        //  console.log('');
        }
      }
    }
  }
})


