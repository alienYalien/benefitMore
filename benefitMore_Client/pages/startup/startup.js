// pages/startup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowheight:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inWeChatId:'',
  },
 
  onLoad: function (options) {
    // console.log('options', options)
    // console.log('options.id', options.id)
    var that = this;
    wx.hideShareMenu();
    //标识点击分享进入的小程序
    if(undefined != options.id) {
      getApp().globalData.userinfo.inWeChatId = options.id;
    }
    else {
      getApp().globalData.userinfo.inWeChatId = '0';
      //console.log(' getApp().globalData.userinfo.inWeChatId', getApp().globalData.userinfo.inWeChatId)
    }

    that.data.inWeChatId = getApp().globalData.userinfo.inWeChatId;

    getApp().globalData.httpimg = getApp().globalData.httpaddr + 'loan/';
    getApp().globalData.httpqrcode = getApp().globalData.httpaddr + 'qrcode/';
    wx.getSystemInfo({
      success: function (res) {
        getApp().globalData.windowheight = res.windowHeight;
        getApp().globalData.windowwidth = res.windowWidth;
        
        that.setData({
          windowheight: getApp().globalData.windowheight,
          inWeChatId: that.data.inWeChatId,
        });
      }
    });
  },
  
  bindGetUserInfo(e) {
    //
    var that = this;
    // if (getApp().globalData.userinfo.weChatId != '') {
      
    //   wx.navigateTo({
    //     url: '../loan/loan'
    //   })
    // }
    // else
     {
      wx.showLoading({
        title: 'loading...',
    })

      getApp().globalDatabcinfos = [];
      //最新公益活动
      getApp().globalDataarrNewPro = [];
      //成功案例
      getApp().globalDataarrSucPro = [];

    wx.login({
     
      success: res_login => {
        //console.log('res_login', res_login.code)
        wx.request({
          url: getApp().globalData.httpaddr + 'getAppInfo/' + res_login.code,
            header: {
            'content-type': 'application/json'
          },
          success: function (res_getappinfo) {
            //console.log('res_getappinfo', res_getappinfo);
            wx.getSetting({
              success (res_getsetting){
                //console.log(res_getsetting);
                if (res_getsetting.authSetting['scope.userInfo']) {
                  getApp().globalData.isauth = true;
                  getApp().globalData.userinfo = e.detail.userInfo;
                  //console.log('e.detail.userInfo', e.detail.userInfo)
                  getApp().globalData.userinfo.weChatId = res_getappinfo.data;
                  getApp().globalData.userinfo.inWeChatId = that.data.inWeChatId;
                  //console.log('userinfo', getApp().globalData.userinfo);
                  getApp().refreshLoanInfo(that);
                }
                else {
                  wx.hideLoading();
                  return;
                }
              },
              fail (){
                //console.log('fail to wx.getsetting');
                wx.hideLoading()
                return
             }
            })
            return;
          },
          fail(e){
           // console.log(e);
            wx.hideLoading()
            return;
          }

        });
      },
      fail(e){
        //console.log(e);
        wx.hideLoading()
        return;
      } 
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    //console.log(res);
    return {
      title: '自定义转发标题',
      path: '/pages/startup/startup',   //此处所写路径与 ① 处相同，若页面需传参数，记得把参数带上
      success: function (res) {
        // 转发成功
     //   console.log ('success');
        var shareTickets = res.shareTickets;
      },
      fail: function (res) {
        // 转发失败
       // console.log('');
      }
    }
  }
})



// //获取token
    // wx.request({
    //   // 获取token
    //   url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
    //   data: {
    //     appid: 'wxd873292885d005ed',
    //     secret: 'e784d06f59a212f872bf97acd9734472'
    //   },
    //   success(res) {
    //     console.log(res.data.access_token);
    //     wx.request({
    //       // 调用接口C
    //       url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + res.data.access_token,
    //       method: 'POST',
    //       data: {
    //         "path": "pages/startup/startup",
    //         "width": 430
    //       },
    //       success(res) {
    //         console.log('success');
    //         console.log(res);
    //         // res是二进制流，后台获取后，直接保存为图片，然后将图片返回给前台
    //         // 后台二进制怎么转图片？我也不会后台，学会了再贴代码
    //       },
    //       fail: function (res) {
    //         // 转发失败
    //         console.log('fail');
    //         console.log(res);
    //       }
    //     })
    //   }
    // })

// const scene = decodeURIComponent(options.scene)
// if (scene == '111') {
//   // wx.showToast
//   //   ({
//   //     title: '成功',  //标题
//   //     icon: 'loading',  //图标，支持"success"、"loading"      
//   //     image: '../../image/icon_home.png',  //自定义图标的本地路径，image 的优先级高于 icon      
//   //     duration: 2000000, //提示的延迟时间，单位毫秒，默认：1500      
//   //     mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false      
//   //     success: function () { }, //接口调用成功的回调函数      
//   //     fail: function () { },  //接口调用失败的回调函数      
//   //     complete: function () { } //接口调用结束的回调函数   
//   //   })
// }


    // // 查看是否授权
    // wx.getSetting
    // ({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           //console.log(res.userInfo)
    //           console.log(res);
    //           getApp().globalData.userinfo.name = res.userInfo.nickName;


    //         }
    //       })
    //     }
    //     //还没有授权
    //     else {
    //         console.log ('current user has not authorized.')
    //     }
    //   }
    // })


    // //表示自己登陆进来.
    // if (options.id == undefined) {
    //   getApp().globalData.userinfo.inWeChatId = '0';
    //   console.log('login self');
    //   // wx.showToast
    //   //   ({
    //   //     title: '直接进入小程序<非分享>',  //标题
    //   //     icon: 'loading',  //图标，支持"success"、"loading"      
    //   //     image: '../../image/icon_home.png',  //自定义图标的本地路径，image 的优先级高于 icon      
    //   //     duration: 2000, //提示的延迟时间，单位毫秒，默认：1500      
    //   //     mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false      
    //   //     success: function () { }, //接口调用成功的回调函数      
    //   //     fail: function () { },  //接口调用失败的回调函数      
    //   //     complete: function () { } //接口调用结束的回调函数   
    //   //   })
    // }
    // //标识通过点击转发方式登陆进来.
    // else {
    //   console.log ('login with share, id: '+ options.id);
    //   getApp().globalData.userinfo.inWeChatId = options.id;
    //   // wx.showToast
    //   //   ({
    //   //     title: '分享:' + options.id,  //标题
    //   //     icon: 'loading',  //图标，支持"success"、"loading"      
    //   //     image: '../../image/icon_home.png',  //自定义图标的本地路径，image 的优先级高于 icon      
    //   //     duration: 2000, //提示的延迟时间，单位毫秒，默认：1500      
    //   //     mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false      
    //   //     success: function () { }, //接口调用成功的回调函数      
    //   //     fail: function () { },  //接口调用失败的回调函数      
    //   //     complete: function () { } //接口调用结束的回调函数   
    //   //   })
    // }

    // wx.showShareMenu({
    // // 要求小程序返回分享目标信息
    //   withShareTicket: true
    // }); 



    // });
    // //console.log(that.data.screenheight);

     // getApp().globalData.userinfo.name = res_getsetting.userInfo.nickName;
                                // getApp().globalData.userinfo.avatarurl = res_getsetting.userInfo.avatarUrl;
                                // getApp().globalData.userinfo.city = res_getsetting.userInfo.city;
                                // getApp().globalData.userinfo.country = res_getsetting.userInfo.country;
                                // getApp().globalData.userinfo.gender = res_getsetting.userInfo.gender;
                                // getApp().globalData.userinfo.province = res_getsetting.userInfo.province;
                                // getApp().globalData.userinfo.language = res_getsetting.userInfo.language;


// wx.request({
//   url: getApp().globalData.httpaddr + 'login/' +
//     getApp().globalData.userinfo.weChatId + '/' +
//     getApp().globalData.userinfo.inWeChatId + '/' +
//     '0/0/0'
//   ,
//   header: {
//     'content-type': 'application/json'
//   },
//   success: function (res_loginserver) {
//     console.log(res_loginserver);

//     //保存广告位信息
//     getApp().globalData.bcinfos = res_loginserver.data.data.advert;
//     for (var i = 0; i < res_loginserver.data.data.advert.length; i++) {
//       getApp().globalData.bcinfos[i].backimgurl = getApp().globalData.httpimg + res_loginserver.data.data.advert[i].backimgurl;
//     }
//     //console.log(getApp().globalData.bcinfos);
//     //保存最新项目
//     getApp().globalData.arrNewPro = res_loginserver.data.data.newProject;
//     for (var i = 0; i < res_loginserver.data.data.newProject.length; i++) {
//       getApp().globalData.arrNewPro[i].itemImg = getApp().globalData.httpimg + that.data.backimgs[i];
//     }
//     //console.log(getApp().globalData.arrNewPro);

//     //保存成功案例
//     getApp().globalData.arrSucPro = res_loginserver.data.data.successProject;
//     wx.hideLoading();
//     wx.redirectTo({
//       url: '../loan/loan'
//     })
//     return;
//   },
//   fail() {
//     console.log('fail to wx.getsetting');
//     wx.hideLoading()
//     return
//   }
// });
