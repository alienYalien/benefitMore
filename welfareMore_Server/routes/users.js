var express = require('express');
var router = express.Router();
var url=require('url');
var qs=require('querystring');//解析参数的库
var db = require('../utils/db');
var utils = require('../utils/utils');
var logger = require('../utils/logs').logger;

/** 分页查询管理员 */
router.get('/userInfo', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'user')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （user）"});
    }
    /** bootstrap table  分页*/
    var arg1=url.parse(req.url,true).query;
    //打印键值对中的值
    var limit = +arg1.limit;
    var start = +arg1.offset;
    var userName = arg1.departmentname;
    var type = arg1.type;
    var search = arg1.search;
    db.getManager(limit, start, userName, type, search, function (data, total){
        if(data == null){
            data = {};
        }
        return res.send({
            rows: data, total : total});
//            res.render('user', { title: 'benefitMore' ,path :"managerInfo",data:data, user:user});
        }
    );
});

/** 增加或编辑管理员 */
router.post('/addEditUser', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'user')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （user）"});
    }
    var userInfo = JSON.parse(req.body.userInfo);
    var DEPARTMENT_ID = userInfo.DEPARTMENT_ID; //1 添加 2 更新
    var username = userInfo.username;
    var password = userInfo.password;
    var type = userInfo.type;
    db.addEditUser(DEPARTMENT_ID, username, password, type, function (data){
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
router.post('/deleteUser', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'user')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （user）"});
    }
    var userInfo = JSON.parse(req.body.userInfo);
    var delUser = [];
    var delUserStr = '';
    for(var i in userInfo){
        var user = userInfo[i];
        delUserStr += "?,";
        delUser.push(user.username);
    }
    delUserStr = delUserStr.substr(0, delUserStr.length-1);
    db.delUser(delUser, delUserStr, function (data){
            if(data == null){
                return res.send({
                    errorCode: 1});
            }
            return res.send({
                errorCode: 0});
        }
    );
});

/** 查询权限信息 */
router.get('/powerInfo', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'power')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （power）"});
    }
    db.getPower(function (data){
            if(data == null){
                data = {};
            }
            return res.send({
                rows: data
            });
        }
    );
});

/** 查询权限类型 */
router.get('/powerTypeInfo', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'power')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （power）"});
    }
    db.getPowerType(function (data){
            if(data == null){
                data = {};
            }
            return res.send(data);
        }
    );
});

/** 增加或编辑权限 */
router.post('/addEditPower', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'user')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （user）"});
    }
    var powerInfo = JSON.parse(req.body.powerInfo);
    var DEPARTMENT_ID = powerInfo.DEPARTMENT_ID; //1 添加 2 更新
    var type = powerInfo.type;
    var name = powerInfo.name;
    var power = powerInfo.power;
    var des = powerInfo.des;
    db.addEditPower(DEPARTMENT_ID, type, name, power, des , function (data){
            if(data == null){
                return res.send({
                    errorCode: 1});
            }
            return res.send({
                errorCode: 0});
        }
    );
});

/** 删除权限 */
router.post('/deletePower', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'user')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （user）"});
    }
    var powerInfo = JSON.parse(req.body.powerInfo);
    var delPower = [];
    var delPowerStr = '';
    for(var i in powerInfo){
        var power = powerInfo[i];
        delPowerStr += "?,";
        delPower.push(power.type);
    }
    delPowerStr = delPowerStr.substr(0, delPowerStr.length-1);
    db.delPower(delPower, delPowerStr, function (data){
            if(data == null){
                return res.send({
                    errorCode: 1});
            }
            return res.send({
                errorCode: 0});
        }
    );
});

/** 查询个人信息 */
router.get('/myInfo', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    db.getMyInfo(user.username, function (data){
            if(data == null){
                data = {};
            }
            return res.send(data);
//            res.render('user', { title: 'benefitMore' ,path :"managerInfo",data:data, user:user});
        }
    );
});

module.exports = router;
