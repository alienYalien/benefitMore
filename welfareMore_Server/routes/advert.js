var express = require('express');
var router = express.Router();
var url=require('url');
var qs=require('querystring');//解析参数的库
var db = require('../utils/db');
var utils = require('../utils/utils');
var logger = require('../utils/logs').logger;

/** 分页查询广告 */
router.get('/advertInfo', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'advert')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （advert）"});
    }
    /** bootstrap table  分页*/
    var arg1=url.parse(req.url,true).query;
    //打印键值对中的值
    var limit = +arg1.limit;
    var start = +arg1.offset;
    var title = arg1.departmentname;
    var content = arg1.type;
    var search = arg1.search;
    db.getAdvert(limit, start, title, content, search, function (data, total){
        if(data == null){
            data = {};
        }
        return res.send({
            rows: data, total : total});
//            res.render('user', { title: 'benefitMore' ,path :"managerInfo",data:data, user:user});
        }
    );
});

/** 增加或编辑广告 */
router.post('/addEditAdvert', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'advert')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （advert）"});
    }
    var advertInfo = JSON.parse(req.body.advertInfo);
    var DEPARTMENT_ID = advertInfo.DEPARTMENT_ID; //1 添加 2 更新
    var index = +advertInfo.id;
    var title = advertInfo.title;
    var content = advertInfo.content;
    var cssid = advertInfo.cssid;
    var iconurl = advertInfo.iconurl;
    var backimgurl = advertInfo.backimgurl;
    var pagename = advertInfo.pagename;
    db.addEditAdvert(DEPARTMENT_ID, index, title, content, cssid, iconurl, backimgurl, pagename, function (data){
            if(data == null){
                return res.send({
                    errorCode: 1});
            }
            return res.send({
                errorCode: 0});
        }
    );
});

/** 删除管理员 */
router.post('/deleteAdvert', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'advert')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （advert）"});
    }
    var advertInfo = JSON.parse(req.body.advertInfo);
    var delAdvert = [];
    var delAdvertStr = '';
    for(var i in advertInfo){
        var Advert = advertInfo[i];
        delAdvertStr += "?,";
        delAdvert.push(Advert.id);
    }
    delAdvertStr = delAdvertStr.substr(0, delAdvertStr.length-1);
    db.delAdvert(delAdvert, delAdvertStr, function (data){
            if(data == null){
                return res.send({
                    errorCode: 1});
            }
            return res.send({
                errorCode: 0});
        }
    );
});


module.exports = router;
