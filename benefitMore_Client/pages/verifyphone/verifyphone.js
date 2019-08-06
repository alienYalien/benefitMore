Page ({
  data:{
    defaultcontent:'请输入手机号码',
    verifycontentv1: '申请验证码',
    verifystate: 0,//0:可以验证， 1倒计时状态
    totaltime: 60,
    btndisabled: false,
    verifycode: '',
    phonenumber: '',
    tipcontent: {
      title: '',
      bshow: false,
      content: '',
    },
    verifycontent:{
      title:'',
      content:'',
      jumpto:'',
    }
  },
  onLoad: function (options) {
    wx.hideShareMenu();
      //传递一个index就可以
      if(options.index != undefined) {
        if(options.index == '0') {
          this.data.verifycontent.title = 'Create Welfare';
          this.data.verifycontent.content = '活动负责人手机号:';
          this.data.verifycontent.jumpto = '../createitem/createitem?phone=';
          this.setData({
            verifycontent:this.data.verifycontent
          })
        }
        else if(options.index == '1'){
          this.data.verifycontent.title = 'Login';
          this.data.verifycontent.content = '请输入手机号:';
          this.data.verifycontent.jumpto = '../personinfo/personinfo?phone=';
          this.setData({
            verifycontent: this.data.verifycontent
          })
        }
      }
      //个人信息手机号，还是创建项目
      //title_index : title不同 : Create Item, Individual Info
      //content_index : 默认内容不同，项目负责人手机号， 请输入手机号
      //jump_index : 跳转终点页面不同 createitem， invidivualinfo
     // console.log(options);
  },
    //申请验证码
    btn_verify: function () {
      var that = this;

      if (this.data.phonenumber.length != 11) {
        that.data.tipcontent.title = 'Warning';
        that.data.tipcontent.content = '手机号码非法';
        that.data.tipcontent.bshow = true;
        that.setData({
          tipcontent: that.data.tipcontent
        });
        return;
      }
      else {
        //如果当前手机验证状态为0，标识可以验证
        if (this.data.verifystate == 0) {
          this.data.verifystate = 1;

          //向服务器发送验证码申请

          wx.request({
            url: getApp().globalData.httpaddr + 'sendSMS/' + that.data.phonenumber
            ,
            header: {
              'content-type': 'application/json'
            },
            success: function (phone_number) {
            //  console.log(phone_number);
             
            },
            fail(e) {
           //   console.log(phone_number);
            }
          });

          this.setData({
            verifycontentv1: '剩余' + this.data.totaltime + '秒',
            verifystate: 1,
            btndisabled: true,
          });

          var t1 = setInterval(() => {
            this.data.totaltime = this.data.totaltime - 1;
            if (this.data.totaltime <= 0) {
              clearInterval(t1);
              //设置按钮生效
              //改变背景颜色
              this.setData({
                verifycontentv1: '申请验证码',
                totaltime: 60,
                verifystate: 0,
                btndisabled: false,
              });
              return;
            }

            this.setData({
              verifycontentv1: '剩余' + this.data.totaltime + '秒',
              totaltime: this.data.totaltime
            });

          }, 1000);
        }
      }


    },

    //输入手机号
    onPhoneInput: function (e) {
      this.setData({
        phonenumber: e.detail.value
      });

    },
    //输入验证码
    onVerifyCodeInput: function (e) {
      this.setData({
        verifycode: e.detail.value
      });
    },

  //todo
  // btn_confirmcmpinfo: function () {
  //   var that = this;
  //   wx.reLaunch({
  //     url: that.data.verifycontent.jumpto + '03153101120',
  //   })
  // },

    //提交
    btn_confirmcmpinfo: function () {
      var that = this;
      if (this.data.verifycode.length < 3 || this.data.phonenumber.length != 11) {
        that.data.tipcontent.title = 'Warning';
        that.data.tipcontent.content = '验证码或者手机号码非法';
        that.data.tipcontent.bshow = true;
        that.setData({
          tipcontent: that.data.tipcontent
        });
        return;
      }
      else {
        //发送手机号和验证码给服务器进行验证, 验证成功，进入下一个页面，验证失败弹出提示框
        wx.request({
          url: getApp().globalData.httpaddr + 'checkCode/' + that.data.phonenumber + '/' + that.data.verifycode
          ,
          header: {
            'content-type': 'application/json'
          },
          success: function (phone_number) {
          //  console.log('verify phone success', phone_number);
            if(phone_number.data == 0) {
              wx.navigateTo({
                url: that.data.verifycontent.jumpto + that.data.phonenumber,
              })
            }
            else {
              wx.showToast({
                title: '系统错误',  //标题
                icon: 'fail',  //图标，支持"success"、"loading"
                duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
                complete: function () {
                  setTimeout(function () {
                    //申请最新信息
                    wx.navigateBack({})
                  }, 1000) 
                   
                } //接口调用结束的回调函数
              });
            }
          },
          fail(e) {
         //   console.log('fail to verify phone');
            that.data.tipcontent.title = 'Warning';
            that.data.tipcontent.content = '验证码错误';
            that.data.tipcontent.bshow = true;
            that.setData({
              tipcontent: that.data.tipcontent
            });
          }
        });
      }
    },

    onInputCancel: function () {
     // console.log('用户点击取消')
      var that = this;
      that.data.tipcontent.content = '';
      that.data.tipcontent.bshow = false;
      this.setData({
        tipcontent: that.data.tipcontent
      })
    },

    onInputConfirm: function (e) {
     // console.log('用户点击确认')
      var that = this;
      that.data.tipcontent.content = '';
      that.data.tipcontent.bshow = false;
      this.setData({
        tipcontent: that.data.tipcontent
      })
    },
  
})