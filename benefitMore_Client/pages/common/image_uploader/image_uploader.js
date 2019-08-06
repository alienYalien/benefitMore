'use strict';
const Promise = require('../../../utils/bluebird.js');
const wechat = require('../../../utils/wechat.js');
const util = require('../../../utils/util.js');

const defaultData = {
    _chooseImage: 'chooseImage',
    _previewImage: 'previewImage',
   // _uploadImages:'uploadImages',
    _deleteImage :'deleteImage',
    // 这个方法可以用来设置选择好图片后的回调，但不成熟，先注释掉
    // setChooseImageCallback: 'setChooseImageCallback',
    imageUploadTitle: '上传图片',
    sourceType: ['camera', 'album'],
    sizeType: ['compressed'],
    maxCount: 1,
    uploadedImagesPaths: [],
    serverBackImagePaths:[],
    uploadParams: {
        url: '',
        name: 'file',
        formData: {}
    },
    defaultimg:'../../../images/default.png',
    defaultimgsv1:[
      {
        img: '../../images/default.png',
        state:false,
      },
      {
        img: '../../images/default.png',
        state: false,
      },
      {
        img: '../../images/default.png',
        state: false,
      },
      {
        img: '../../images/default.png',
        state: false,
      },
      {
        img: '../../images/default.png',
        state: false,
      },
      {
        img: '../../images/default.png',
        state: false,
        
      },
    ],
    tipcontent: {
      title: '',
      bshow: false,
      content: '',
      index: 0,
    },
};

class ImageUploader {
    // 请确保 key 是唯一的，否则同一个页面内多个实例的数据和方法会互相覆盖
    constructor(pageContext, key = ''){
        let that = this;
        this.key = key;
        this.page = pageContext;
        this.data = this.page.data[key];
        //console.log(key);
//      console.log(this.data);
        this.data._chooseImage = this.data._chooseImage + key;
        this.data._previewImage = this.data._previewImage + key;
        // this.data.setChooseImageCallback = this.data.setChooseImageCallback + key;
      //  console.log(this.data);
        let uploadedImagesPaths = `${key}.uploadedImagesPaths`;
        let serverBackImagePaths = `${key}.serverBackImagePaths`;
        this.page.setData({
            [key]: this.data,
            [uploadedImagesPaths]: [], // 为了在有默认图片时，点击 previewImage 生效
            [serverBackImagePaths]: []
        });

        // 为了在有默认图片时，点击 previewImage 生效
        this.page.setData({
            [uploadedImagesPaths]: this.data.uploadedImagesPaths,
            [serverBackImagePaths]: this.data.serverBackImagePaths
        });


        this.page[this.data._chooseImage] = this.chooseImage.bind(this);
        this.page[this.data._previewImage] = this.previewImage.bind(this);
        //this.page[this.data._uploadImages] = this.uploadImages.bind(this);
        this.page[this.data._deleteImage] = this.deleteImage.bind(this);

        // this.page[this.data.setChooseImageCallback] = this.setChooseImageCallback.bind(this);
        
    }
  
    deleteImage (e) {

      var that = this;
      var index = e.currentTarget.id;
     
      if (that.data.defaultimgsv1[index].state == true) {
        wx.showLoading({
          title: 'deleting...',
        })
        // console.log('deleteimage', e)
        // console.log('server img', that.data.serverBackImagePaths[index]);
        // console.log('default img', that.data.defaultimgsv1[index].img);
        //截取要删除图片的名字
        var str = that.data.defaultimgsv1[index].img;
        var s = str.lastIndexOf('/');
        str = str.slice(s + 1);
//        console.log ('str', str);

        var pathstr = that.data.defaultimgsv1[index].img;
        var s = that.data.defaultimgsv1[index].img.indexOf('.cn/');
        pathstr = pathstr.slice(s + 3);
        //发送给服务器
        wx.request({
          url: getApp().globalData.httpaddr + 'deleteFile/' + str,
          header: {
            'content-type': 'application/json'
          },
          success: function (e) {
           // console.log (e);
            //接收删除结果
            // var finalurl = getApp().globalData.httpaddrv1 + jsonObj.url;
            wx.hideLoading();
            var myindex = 0;
            for (var i = 0; i < that.data.serverBackImagePaths.length; i++) {
              if (that.data.serverBackImagePaths[i] == pathstr) {
                myindex = i;
                break;
              }
            }
            that.data.serverBackImagePaths.splice(myindex, 1);
            that.data.defaultimgsv1[index].img = '../../images/default.png';
            that.data.defaultimgsv1[index].state = false;
            that.page.setData({
              serverBackImagePaths: that.data.serverBackImagePaths,
              defaultimgsv1: that.data.defaultimgsv1,
              [that.key]: that.data
            });
            
          },
          fail:function(e) {
          }
        });
      }
    }

    chooseImage(e) {
      
//      console.log(e)
      var index = e.currentTarget.id;
      let data = this.data;
      var that = this;
      //如果已经有图片，那么触发preview
      if (data.defaultimgsv1[index].state == true) {
        this.previewImage(e);
      }
      //如果没有图片，那么加载图片
      else {
        if (data.uploadedImagesPaths.length < 6) {
        
          wechat.chooseImage(data.sourceType, data.sizeType, data.maxCount).then(res => {
            this._chooseImageCb(res);
         
            //进行图片上传
            wx.showLoading({
              title: 'uploading...',
            })

            wx.uploadFile({
              url: getApp().globalData.httpaddr + 'upload',      //此处换上你的接口地址
              filePath: res.tempFilePaths[0],
              name: 'uploadFile',
              header: {
                "Content-Type": "multipart/form-data",
                'accept': 'application/json',
                //'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
              },
              success: function (res) {
                //var data = res.data;
                wx.hideLoading();
                var jsonObj = JSON.parse(res.data)
                if (jsonObj.errorCode == 0) {
                  var finalurl = getApp().globalData.httpaddrv1 + jsonObj.url;
                  that.data.serverBackImagePaths.push(jsonObj.url);
                  that.data.defaultimgsv1[index].img = finalurl;
                  that.data.defaultimgsv1[index].state = true;
                  that.page.setData({
                    serverBackImagePaths: that.data.serverBackImagePaths,
                    defaultimgsv1: that.data.defaultimgsv1,
                    [that.key]: that.data
                  });
                  // console.log('serverBackImagePaths', that.data.serverBackImagePaths);
                  // console.log('defaultimgsv1', that.data.defaultimgsv1);
                 
                }
                else {
                 
                }
              },
              fail: function (res) {
              //  console.log('fail');
               
              },
            });

            //上传完毕 ；  
            
          }, e => {
            wx.hideLoading();
          });
        }
        else {
        
          wx.showToast({
            title: '图片上传超限',
            icon: 'none',
            duration: 1000
          })
        }
      }
    }

    previewImage(e) {
        let current = e.target.dataset.src;
      
        wx.previewImage({
            current: current,
            urls: this.data.uploadedImagesPaths
        });
    }

    _chooseImageCb(res){
        let filePath = res.tempFilePaths[0];
        this._uploadImage(res).then(res => {
            this._addToUploadedPaths(res, filePath);
        }, e => {
         //   console.log(e);
        });
    }

    _uploadImage(res){
        let data = this.data;
        let filePath = res.tempFilePaths[0];
        let uploadParams = data.uploadParams;
        let formData = Object.assign({}, uploadParams['formData'], {});

       // console.info('为了演示效果，直接 resolve true ，真实使用时，请删除 return Promise.resolve(true);'); 
        return Promise.resolve(true);

        return wechat.uploadFile(uploadParams['url'],filePath,uploadParams['name'], formData);
    }

    _addToUploadedPaths(resp, filePath){
        if (this._isUploadSuccess(resp)) {
            this.data.uploadedImagesPaths.push(filePath);
//            console.log(filePath);
            this.page.setData({
                [this.key]: this.data
            });
        }
        else {
            
        }
    }
    _isUploadSuccess(resp){
      //  console.info('为了演示效果，直接 return true ，真实使用时，请写自己的判断逻辑'); 
        return true;
    }

}

ImageUploader.mergeData = function(data){
    return util.mergeDeep({}, defaultData, data);
};

module.exports = ImageUploader;

