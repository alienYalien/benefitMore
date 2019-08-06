var express = require('express');
var router = express.Router();
var db = require('../utils/db');
var utils = require('../utils/utils');
var logger = require('../utils/logs').logger;
var configs = require('../configs');
var fs = require('fs');


/** 获取首页类型列表 */
router.get('/', function(req, res, next) {
    var user = req.session.user;
    if(!user){
        return res.render('login', { title: 'benefitMore' });
    }
    return res.render('home', { title: 'benefitMore' ,path :"index", user:user});
});

/** 跳转到用户管理页面 */
router.get('/user', function(req, res, next) {
    var user = req.session.user;
    if(!user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'user')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （user）"});
    }
    return res.render('user', { title: 'benefitMore' ,path :"user", user:user});
});


/** 跳转到已审核活动页面 */
router.get('/checkPro', function(req, res, next) {
    var user = req.session.user;
    if(!user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'project')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （project）"});
    }
    return res.render('checkPro', { title: 'benefitMore' ,path :"user", user:user});
});

/** 跳转到广告管理页面 */
router.get('/advert', function(req, res, next) {
    var user = req.session.user;
    if(!user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'advert')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （advert）"});
    }
    return res.render('advert', { title: 'benefitMore' ,path :"advert", user:user});
});

/** 跳转到权限页面 */
router.get('/power', function(req, res, next) {
    var user = req.session.user;
    if(!user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'power')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （power）"});
    }
    return res.render('power', { title: 'benefitMore' ,path :"power", user:user});
});

/** 跳转到创建活动页面 */
router.get('/project', function(req, res, next) {
    var user = req.session.user;
    if(!user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'project')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （project）"});
    }
    return res.render('createPro', { title: 'benefitMore' ,path :"project", user:user});
});

/** 跳转到发起人管理页面 */
router.get('/salesman', function(req, res, next) {
    var user = req.session.user;
    if(!user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'project')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （salesman）"});
    }
    return res.render('salesman', { title: 'benefitMore' ,path :"salesman", user:user});
});

/** 跳转到广告管理页面 */
router.get('/advert', function(req, res, next) {
    var user = req.session.user;
    if(!user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'project')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （advert）"});
    }
    return res.render('advert', { title: 'benefitMore' ,path :"advert", user:user});
});

/** 跳转到申请发起人页面 */
router.get('/applySales', function(req, res, next) {
    var user = req.session.user;
    if(!user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'salesman')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （salesman）"});
    }
    return res.render('createSalesman', { title: 'benefitMore' ,path :"applySales", user:user});
});




/** 修改自定义规则页面 */
router.get('/editMyRulesView/:id', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    var id = +utils.trim(req.params.id);
    db.getMyRulesById(id, function (data){
            if(data.endTime != '0000-00-00 00:00:00'){
                data.endTime = utils.fermitTime(data.endTime);
            }
            if(data.startTime != '0000-00-00 00:00:00'){
                data.startTime = utils.fermitTime(data.startTime);
            }
            res.render('editMyRules', { title: 'benefitMore' ,data:data, user:user});
        }
    );
});


/**
 * 修改自定义规则配置
 * */
router.route('/editMyRules').post(function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    var oldId = +req.body.oldId;
    var id = +req.body.id;
    var name = req.body.name;
    var type = req.body.type;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var companyName = req.body.companyName;
    var areaId = req.body.areaId;
    db.upMyRules(oldId, id, name, type, startTime, endTime, companyName, areaId, function (data){
            res.redirect('/getMyRules/0');
        }
    );
});

/** 添加自定义规则 */
router.route('/addMyRules').post(function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    var id = +req.body.id;
    var name = req.body.name;
    var type = req.body.type;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var companyName = req.body.companyName;
    var areaId = req.body.areaId;
    db.addMyRules(id, name, type, startTime, endTime, companyName, areaId, function (data){
           res.redirect('/getMyRules/0');
        }
    );
});

/** 添加自定义规则 */
router.route('/addMyRules').post(function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    var id = +req.body.id;
    var name = req.body.name;
    var type = req.body.type;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var companyName = req.body.companyName;
    var areaId = req.body.areaId;
    db.addMyRules(id, name, type, startTime, endTime, companyName, areaId, function (data){
            res.redirect('/getMyRules/0');
        }
    );
});

module.exports = router;
