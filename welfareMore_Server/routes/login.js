var express = require('express');
var router = express.Router();
var db = require('../utils/db');
var utils = require('../utils/utils');
var logger = require('../utils/logs').logger;
var configs = require('../configs');
var request = require('request');
var errorCode =  require('../utils/errorCodes');
var yzm = require('../utils/yzm');

var WXBizDataCrypt = require('../utils/WXBizDataCrypt');
var configs = require('../configs');

/** 登陆页面 */
router.get('/loginView', function(req, res, next) {
    res.render('login', { title: 'benefitMore',name:null});
});

/**
 * 登出
 * */
router.get('/logout', function(req, res) {
    if(!!req.session.user){
        //清理session
        req.session.user = null;
    }
    res.redirect('/');
});

/**
 * 验证码
 * */
router.route('/yzm/:time').get(function(req, res, next) {
    //生成验证码
    yzm.randomcodePngController(req, res, next);
});

/** 前台登陆
 * 注册和登录一体
 * 没有注册过就注册一下  有则 登录
 * */
router.get('/loginTest', function(req, res) {
    db.loginTest( function (data) {
            res.send(data);
        }
    );
});
/** 前台登陆
 * 注册和登录一体
 * 没有注册过就注册一下  有则 登录
 * */
router.get('/login/:weChatId/:inWeChatId/:encryptedData/:iv/:sessionKey', function(req, res) {
//    var weChatId = req.body.weChatId;
//    var inWeChatId = req.body.inWeChatId;
    var weChatId = req.params.weChatId;
    var inWeChatId = req.params.inWeChatId;
    if(weChatId == '0'){
        var encryptedData = req.params.encryptedData;
        var iv = req.params.iv;
        var sessionKey = req.params.sessionKey;
        var appId = configs.config.app.APPID;

        var pc = new WXBizDataCrypt(appId, sessionKey)

        var weData = pc.decryptData(encryptedData , iv)

        console.log('解密后 data: ', weData);
        weChatId = weData.openId;
    }
    var user = {
        username:weChatId,
        power:"",
        type:0//判断权限用
    }
    req.session.user = user;
    db.login(weChatId, inWeChatId, function (data){
            if(null == data){
                return res.send(JSON.stringify({errorCode: errorCode.NoRole}));
            }
            else{
                data.weData = weData;
                return res.send(JSON.stringify({errorCode: errorCode.OK, data:data}));
            }
        }
    );
});

/** 后台登陆 */
router.post('/backLogin', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var yzm = req.body.yzm;
    if(yzm != req.session[req.session.id]){
        req.session.ERROR = '验证码错误！';
        return res.render('login', { title: 'benefitMore', error: '验证码错误'});
    }
    db.backLogin(username, function (data){
            if(null == data){
                return res.render('login', { title: 'benefitMore', error: '用户名不存在'});
            }
            else if(data.password != password){
                return res.render('login', { title: 'benefitMore', error: '密码错误'});
            }
            else{
                var user = {
                    username:username,
                    power:data.power.split("#"),
                    type:data.type//判断权限用
                }
                req.session.user = user;
//                res.redirect('/');
                return res.render('home', { title: 'benefitMore' ,path :"index", user:user});
            }
        }
    );
});

module.exports = router;
