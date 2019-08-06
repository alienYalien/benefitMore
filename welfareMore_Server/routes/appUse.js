var express = require('express');
var router = express.Router();
var db = require('../utils/db');
var utils = require('../utils/utils');
var logger = require('../utils/logs').logger;
var configs = require('../configs');
var request = require('request');
var errorCode =  require('../utils/errorCodes');
var sms =  require('../utils/sms');
var configs = require('../configs');


/**
 * 微信登录所需参数
 * */
router.get('/getAppInfo/:jscode', function(req, res) {
//    var weChatId = req.body.weChatId;
    var appId = configs.config.app.APPID;
    var appSecret = configs.config.app.APPSECRET;
    var jscode = req.params.jscode;
    var parm =  'appid=' + appId + '&' +
        'secret=' +appSecret + '&' +
        'js_code=' + jscode + '&' +
        'grant_type=authorization_code';
    request('https://api.weixin.qq.com/sns/jscode2session?'+parm, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return res.send(JSON.parse(body).openid);
        }else{
            logger.error("getAppInfo error :%j, statusCode:%j" , error, response.statusCode);
        }
    })
});

/**
 * 发送验证码
 * */
router.get('/sendSMS/:phone', function(req, res) {
    var phone = req.params.phone;
    var code = Math.floor(Math.random() * 100000);
    sms.sendSMS(phone, code, new Date().getTime(), function(data){
        console.log(data);
        return res.send(""+data);
    })

});

/**
 * 验证验证码
 * */
router.get('/checkCode/:phone/:code', function(req, res) {
    var phone = req.params.phone;
    var code = req.params.code;
    var data = sms.codeCheck(phone, code);
    return res.send(""+data);
});


module.exports = router;
