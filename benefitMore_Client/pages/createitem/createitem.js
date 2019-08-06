// pages/createitem/createitem.js
var config = require ('../../utils/config_createitem.js');
const ImageUploader = require('../common/image_uploader/image_uploader.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1: ImageUploader.mergeData({
      imageUploadTitle: '定制标题1',
      isShow:false,
      orig:this,
      sourceType: ['camera', 'album'], //上传图片的来源，相机/相册
      sizeType: ['compressed'],//上传前是否压缩，默认压缩
      maxCount: 1,//一次选择图片的数量
      //以上三个配置项详情请看小程序文档
      uploadedImagesPaths: [],//保存已上传的图片路径，也可以设置初始时就显示的图片
      uploadParams: {
        url: '',//后台接收上传图片的路径
        name: 'file',//后台依靠这个字段拿到文件对象
        formData: {}//这个字段可以设置传到后台的额外的参数
        //以上三个配置项详情请看小程序文档
      }
    }),
    
    cmpinfos: config.conigdata().list,
    iteminfos: config.itemdata().list,
    confirmbtninfos:{
        content:'验证',//验证/编辑
        status:0,//0：验证， 1:编辑
        result:false,//验证是否成功
    },
    tipcontent:{
      title:'',
      bshow:false,
      content:'',
      index:0,
    },
    iteminfo:{
      legalManName: '',//发起人姓名
      legalManPhone: '135xxxx0000',//手机号
      cmpName: '',//发起组织名称
      itemName: '',//活动名称
      itemStage: 0,//活动进程
      itemArea: 0,//活动领域
      itemMoney: 1,//活动形式
      businessv2: 0,//2级发起人id
      itemType:0,
     
      //未在前端提供输入
      businessv1: 0,//1级发起人id
      itemPlace: 0,//活动地点
      itemImg: '',
      itemImg2: '',
      itemImg3: '',
      itemImg4: '',
      itemImg5: '',
      itemImg6: '',
      itemDesc:'活动简介（200字)',

      //1:保密， 0：公开
      itemTypeShow: 0,
      businessv2Show: 0,
      itemAreaShow: 0,
      itemMoneyShow: 0,
      businessv1Show: 0,
      itemPlaceShow: 0,
    },

  },

  inputDesc : function (e) {
      //console.log (e.detail.value);
      var that = this;
      that.data.iteminfo.itemDesc = e.detail.value;
      this.setData ({
        iteminfo : that.data.iteminfo,
      })
  },

  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail)
    var that = this;
    
    switch (e.currentTarget.id) {
      case '0':{//活动进程
        that.data.iteminfos[0].index = that.data.iteminfo.itemType = e.detail.value;
        break;
      }
      case '1':{//活动形式
        that.data.iteminfos[1].index = that.data.iteminfo.itemMoney = e.detail.value;
        break;
      }
      case '2':{//活动领域
        that.data.iteminfos[2].index = that.data.iteminfo.itemArea = e.detail.value;
        break;
      }
    }
    this.setData({
      iteminfos: that.data.iteminfos,
      iteminfo: that.data.iteminfo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // var str = 'https://moneymore365.cn/img/proImg/bj_RpJMhjsWHBCnQ4IG1wn49.png';

    // var s = str.indexOf ('.cn/');
    // str = str.slice(s + 3);
    // console.log(str);
    wx.hideShareMenu();
    new ImageUploader(this, 'img1');
  
    var that = this;
    
    that.data.img1.backAction = 'backAction';
  
    if(options.phone != null) {
      that.data.iteminfo.legalManPhone = options.phone;
      that.data.iteminfo.businessv1 = getApp().globalData.userinfo.inWeChatId;//一级发起人id
      that.data.iteminfo.businessv2 = getApp().globalData.userinfo.salesId;//二级发起人id
      that.data.cmpinfos[1].child[1].placeholder = that.data.cmpinfos[1].child[1].placeholder + ':' + that.data.iteminfo.businessv2
    }
    else {
      
    }
    that.data.cmpinfos[1].child[0].placeholder = that.data.cmpinfos[1].child[0].placeholder + ':' + that.data.iteminfo.legalManPhone;

    that.setData({
      cmpinfos: that.data.cmpinfos,
      iteminfo: that.data.iteminfo,
      img1: that.data.img1,
    })
   
      //初始化组织信息 UI
    // console.log(that.data.cmpinfos);
    // console.log(config.conigdata().list);
  },

  //提交到服务器
  btn_uploaditeminfo:function(e) {
    var that = this;
    var iteminfo = that.data.iteminfo;
//    console.log(that.data.iteminfo.legalManPhone)
    //检测姓名
    if (iteminfo.legalManName.length < config.itemdata().namelength) {
      wx.showToast({
        title: '姓名太短',
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    //发起组织名称
    if (iteminfo.cmpName.length < config.itemdata().cmpnamelength) {
      wx.showToast({
        title: '发起组织名称太短',
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    //活动名称
    if (iteminfo.itemName.length < config.itemdata().itemnamelength) {
      wx.showToast({
        title: '活动名称太短',
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    //手机号检测 phonelength
    if (iteminfo.legalManPhone.length < config.itemdata().phonelength) {
      wx.showToast({
        title: '手机号长度非法',
        icon: 'none',
        duration: 1000,
      })
      return;
    }

    //console.log("创建公益活动");
     console.log(that.data.iteminfo);
    wx.request({
      url: getApp().globalData.httpaddr + 'createPro',
      method: "POST",
      data: that.data.iteminfo,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
//        console.log(res.data);
        if(res.data.errorCode == 0) {
          wx.showToast({
            title: '创建成功！',
            icon: 'success',
            duration: 2000,
            complete: function () {
              setTimeout(function () {
                //申请最新信息
                wx.redirectTo({
                  url: '../loan/loan'
                })
              }, 1000)
            }
          })
        }
        else {
          wx.showToast({
            title: '系统错误',
            duration: 1000
          });
        }
      },
    })
  },

  //返回loan页面
  btn_giviuploaditem:function(e) {
    var that = this;
    that.data.tipcontent.title = 'Warning';
    that.data.tipcontent.content = '确认要放弃创建公益活动？';
    that.data.tipcontent.bshow = true;
    that.data.tipcontent.index = 1;
    that.setData({
      tipcontent: that.data.tipcontent
    });
    
  },

  onInputCancel:function () {
  //  console.log('用户点击取消')
    var that = this;
    that.data.tipcontent.content = '';
    that.data.tipcontent.bshow = false;
    this.setData({
      showSinglelineInputbox: false,
      tipcontent: that.data.tipcontent
    })
  },


  onInputConfirm: function (e) {
  //  console.log('用户点击确认')
    var that = this;
    that.data.tipcontent.content = '';
    that.data.tipcontent.bshow = false;

    if(that.data.tipcontent.index == 1) {
      that.data.tipcontent.index = 0;
      wx.redirectTo({
        url: '../loan/loan',
      })
    }

    this.setData({
      showSinglelineInputbox: false,
      tipcontent: that.data.tipcontent
    })
  },

  onInput:function(e) {
    var that = this;
    //console.log(e);
    //console.log(e.detail.value);

    switch (e.currentTarget.id)
    {
      //发起人姓名
      case '1':{
        that.data.iteminfo.legalManName = that.data.cmpinfos[0].child[0].content = e.detail.value;
        break;
      }
      //发起组织名称
      case '2': {
        that.data.iteminfo.cmpName = that.data.cmpinfos[0].child[1].content = e.detail.value;
        break;
      }
      //活动名称
      case '3': {
          that.data.iteminfo.itemName=e.detail.value;
          break;
      }
    }

    that.setData ({
      cmpinfos: that.data.cmpinfos,
      iteminfo: that.data.iteminfo
    });
  },

  btn_uploadimg:function(e) {
    var that = this; 
    var img = that.data.img1;
    that.data.img1.isShow = true;
    that.setData({
      img1: that.data.img1
    });

    console.log(that.data.img1);
  },
  
  backAction:function () {
    var that = this;
   // console.log('backAction', that.data.img1);
    that.data.img1.isShow = false;
    if(that.data.img1.serverBackImagePaths.length > 0) {
      for (var i = 0; i < that.data.img1.serverBackImagePaths.length; i++) {
        switch (i) {
          case 0:{
            that.data.iteminfo.itemImg = that.data.img1.serverBackImagePaths[0];
            break;
          }
          case 1: {
            that.data.iteminfo.itemImg2 = that.data.img1.serverBackImagePaths[1];
            break;
          }
          case 2: {
            that.data.iteminfo.itemImg3 = that.data.img1.serverBackImagePaths[2];
            break;
          }
          case 3: {
            that.data.iteminfo.itemImg4 = that.data.img1.serverBackImagePaths[3];
            break;
          }
          case 4: {
            that.data.iteminfo.itemImg5 = that.data.img1.serverBackImagePaths[4];
            break;
          }
          case 5: {
            that.data.iteminfo.itemImg6 = that.data.img1.serverBackImagePaths[5];
            break;
          }
        } 
      }
    }
    this.setData({
      iteminfos: that.data.iteminfos,
      iteminfo: that.data.iteminfo,
      img1: that.data.img1,
    })
    
    // console.log(that.data.iteminfo);
  },
  
  //todo : 需要发送短信验证
  btn_confirmcmpinfo: function (e) {
    var that = this;
    var info = that.data.cmpinfos;
    //console.log(info);
    //发送验证请求
    if (that.data.confirmbtninfos.status == 0) {
      //判定输入的公司信息是否合法。
     
      //判断发起人姓名
      if (info[0].child[0].content.length <= info[0].child[0].leastLength) {
        //非法
        //弹出提示框
        //console.log(info[0].child[0].content);
        that.data.tipcontent.title = 'Warning';
        that.data.tipcontent.content = '发起人姓名（' + info[0].child[0].content + '), 长度过短，小于最短长度';
        that.data.tipcontent.bshow = true;
        that.setData({
          tipcontent:that.data.tipcontent
        });
        return;
      }
      
      //判断发起组织名称
      if (info[0].child[1].content.length <= info[0].child[1].leastLength) {
        //非法
        //弹出提示框
        that.data.tipcontent.title = 'Warning';
        that.data.tipcontent.content = '发起组织名称（' + info[0].child[1].content + '), 长度过短，小于最短长度';
        that.data.tipcontent.bshow = true;
        that.setData({
          tipcontent: that.data.tipcontent
        });
        return;
      }

      //判断手机号名称
      if (info[1].child[0].content.length < info[1].child[0].leastLength) {
        //非法
        //弹出提示框
        that.data.tipcontent.title = 'Warning';
        that.data.tipcontent.content = '手机号码（' + info[1].child[0].content + '), 长度过短，小于最短长度';
        that.data.tipcontent.bshow = true;
        that.setData({
          tipcontent: that.data.tipcontent
        });
        return;
      }

      //判断验证码
      if (info[1].child[1].content.length <= info[1].child[1].leastLength) {
        //非法
        //弹出提示框
        that.data.tipcontent.title = 'Warning';
        that.data.tipcontent.content = '验证码（' + info[1].child[1].content + '), 长度过短，小于最短长度';
        that.data.tipcontent.bshow = true;
        that.setData({
          tipcontent: that.data.tipcontent
        });
        return;
      }
      else
       {
        //console.log(123)
        //发送短信验证信息，进行短信验证，如果验证成功，那么改变'验证'-> '编辑', 否则，弹出提示框，提示验证失败。
        that.data.confirmbtninfos.result = true;
        that.data.confirmbtninfos.status = 1;
        that.data.confirmbtninfos.content = '编辑';
        that.setData({
          confirmbtninfos: that.data.confirmbtninfos
        });
      }
      //console.log(info[0].child[0].content)
    }
    //发送编辑请求
    else {
      //console.log(456)
      that.data.confirmbtninfos.result = false;
      that.data.confirmbtninfos.status = 0;
      that.data.confirmbtninfos.content = '验证';
      that.setData({
        confirmbtninfos: that.data.confirmbtninfos
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

