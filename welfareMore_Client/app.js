//app.js
var config = require('./utils/config_createitem.js');
App({

  onLaunch: function () {
      
  },

  httpClient(url, callback) {
    wx.request({
      url,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        callback(null, res.data)
      }
      , fail: function (error) {
        callback(error)
      }
    })
  },
  
  globalData: {
    httpaddr: "http://192.168.1.117:3001/",
    httpaddrv1: "http://192.168.1.117:3001/",
    httpbcimg: 'http://192.168.1.117:3001/loan/',
    httpbcaddr: 'http://192.168.1.117:3001/',
    // httpaddr: "http://10.1.50.84:3001/",
    // httpaddrv1: "http://10.1.50.84:3001/",
    // httpbcimg:'http://10.1.50.84:3001/loan/',
    // httpbcaddr: 'http://10.1.50.84:3001/',
    httpimg: "//192.168.1.117:3001/loan/",
    httpqrcode:'',
    windowheight:0,
    windowwidth:0,
    //分享者可能是一级发起人，也可能是二级发起人
    //inWeChatId: '0',//分享者身份
    userinfo:{
      weChatId: '',//用户微信id
      inWeChatId: '',//一级发起人id
      salesId:'',
      avatarurl:'',
      city: '',//城市
      country: '',//国家
      gender: 0,//0:未知，1:男，2:女.
      language: '',
      name: '',//姓名
      province: '',//省份
      phone: '',//项目负责人手机号
      cmpName: '',//发起组织名称
      email: '',//邮箱地址
      major: '',//专业
    },

    //广告位信息
    bcinfos:[

    ],
    //最新公益活动
    arrNewPro:[

    ],
    //成功案例
    arrSucPro:[
    ]
  },

  refreshLoanInfo: function (that, page = 'loan', address = '../loan/loan') {
    getApp().globalData.arrNewPro = [];
    getApp().globalData.bcinfos = [];
    getApp().globalData.arrSucPro = [];

    wx.request({
      url: getApp().globalData.httpaddr + 'login/' +
        getApp().globalData.userinfo.weChatId + '/' +
        getApp().globalData.userinfo.inWeChatId + '/' +
        '0/0/0'
      ,
      header: {
        'content-type': 'application/json'
      },
      success: function (res_loginserver) {
        console.log('res_loginserver', res_loginserver);
       
        //自己的发起人id
        getApp().globalData.userinfo.salesId = res_loginserver.data.data.myInfo.salesId;

        //todo(123应该用服务器返回的数据)保存一级发起人id
        getApp().globalData.userinfo.inWeChatId = res_loginserver.data.data.myInfo.inWeChatId;

        //保存广告位信息
        getApp().globalData.bcinfos = res_loginserver.data.data.advert;
        for (var i = 0; i < res_loginserver.data.data.advert.length; i++) {
          getApp().globalData.bcinfos[i].backimgurl = getApp().globalData.httpimg + res_loginserver.data.data.advert[i].backimgurl;
        }
       
        //保存置顶项目
        var topLength = res_loginserver.data.data.topProject.length;
        for (var i = 0; i < topLength; i++) {
          getApp().globalData.arrNewPro.push(res_loginserver.data.data.topProject[i]);

          //最新项目icon url
          getApp().globalData.arrNewPro[i].iconitemImg = getApp().globalData.httpimg + 'itemArea/' + getApp().globalData.arrNewPro[i].itemArea + '.png';

          //活动类型
          getApp().globalData.arrNewPro[i].itemType = config.itemdata().list[0].array[res_loginserver.data.data.topProject[i].itemType];
          //活动形式
          getApp().globalData.arrNewPro[i].itemMoney = config.itemdata().list[1].array[res_loginserver.data.data.topProject[i].itemMoney];
          //活动领域
          getApp().globalData.arrNewPro[i].itemArea = config.itemdata().list[2].array[res_loginserver.data.data.topProject[i].itemArea];  
        }
        
        var num = 6 - res_loginserver.data.data.topProject.length;
        if (num > res_loginserver.data.data.newProject.length) {
          console.error ('逻辑错误，服务器发送的数据数量有错误');
          // return ;
        }

        //保存最新项目
        // getApp().globalData.arrNewPro = res_loginserver.data.data.newProject;
        for (var i=0, j=topLength; i < num, j < 6; i++, j++) {
          getApp().globalData.arrNewPro.push(res_loginserver.data.data.newProject[i]);
          if (23 <= getApp().globalData.arrNewPro[j].itemArea) {
            getApp().globalData.arrNewPro[j].itemArea = 23;
          }
          //最新公益活动icon url
          getApp().globalData.arrNewPro[j].iconitemImg = getApp().globalData.httpimg + 'itemArea/' + getApp().globalData.arrNewPro[j].itemArea + '.png';
          
          //活动类型
          getApp().globalData.arrNewPro[j].itemType = config.itemdata().list[0].array[res_loginserver.data.data.newProject[i].itemType];
          //活动形式
          getApp().globalData.arrNewPro[j].itemMoney = config.itemdata().list[1].array[res_loginserver.data.data.newProject[i].itemMoney]; 
          //活动领域
          getApp().globalData.arrNewPro[j].itemArea = config.itemdata().list[2].array[res_loginserver.data.data.newProject[i].itemArea];  

        }

        //保存成功案例
        getApp().globalData.arrSucPro = res_loginserver.data.data.successProject;
        for (var i = 0; i < res_loginserver.data.data.successProject.length; i++) {
          //活动类型
          getApp().globalData.arrSucPro[i].itemType = config.itemdata().list[0].array[res_loginserver.data.data.successProject[i].itemType];
          //活动形式
          getApp().globalData.arrSucPro[i].itemMoney = 
                                          config.itemdata().list[1].array[res_loginserver.data.data.successProject[i].itemMoney];
          //活动领域
          getApp().globalData.arrSucPro[i].itemArea = config.itemdata().list[2].array[res_loginserver.data.data.successProject[i].itemArea]; 
        }



        if (page == 'loan') {
          wx.hideLoading();
        }
        wx.navigateTo({
          url: address
        })
        return;
      },
      fail() {
        if (page == 'loan')
          wx.hideLoading()
        return
      }
    });
  }
})
