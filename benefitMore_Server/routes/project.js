var express = require('express');
var router = express.Router();
var db = require('../utils/db');
var utils = require('../utils/utils');
var logger = require('../utils/logs').logger;
var configs = require('../configs');
var errorCodes = require('../utils/errorCodes');
var url=require('url');
var fs=require('fs');
var path = require('path');


/** 创建活动  */
router.route('/createPro').post(function(req, res, next) {
    var user = req.session.user;
//    if(typeof user == "undefined" || null == user){
//        return res.render('login', { title: 'benefitMore' });
//    }
    db.createPro(req.body, function (data){
 
            if(!data){
                if(typeof user == "undefined" || null == user){
                     return res.send({errorCode: 0});
                }
                return res.render('home', { title: 'benefitMore' ,path :"home", user:user});
            }else{
                return res.send({
                    errorCode: data});
            }
        }
    );
});

/**
 * 前台获取自己的活动
 * */
router.get('/getMyPro', function(req, res, next) {
    var arg1=url.parse(req.url,true).query;
    var limit = +arg1.limit;
    var start = +arg1.offset;
    var salesId = +arg1.salesId;
    db.getMyProject(salesId, limit, start, function (data, total){
            if(data == null){
                data = {};
                return res.send({errorCode:errorCodes.FindProError, rows: data, total : total});
            }else{
                return res.send({
                    errorCode:errorCodes.OK, rows: data, total : total});
            }

//            res.render('user', { title: 'benefitMore' ,path :"managerInfo",data:data, user:user});
        }
    );
});

/**
 * 首页 获取活动信息
 * 接口名 getPro
 * check 1 审核活动 0 未审核活动
 * offset 开始下标
 * limit  数据条数
 * */
router.get('/getPro', function(req, res, next) {
//    var user = req.session.user;
//    if(typeof user == "undefined" || null == user){
//        return res.render('login', { title: 'benefitMore' });
//    }
//    if(!utils.checkPower(user.power, 'project')){
//        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （user）"});
//    }
    /** bootstrap table  分页*/
    var arg1=url.parse(req.url,true).query;
    var limit = +arg1.limit;
    var start = +arg1.offset;
    var cmpName = arg1.cmpname;
    var legalManName = arg1.name;
    var type = arg1.type;
    var stage = arg1.stage;
    var search = arg1.search;
    var check = arg1.check;
    var state = +arg1.state; //前台使用， 1 完成融资  2 审核通过
    db.getProject(limit, start, cmpName, legalManName, type, stage, search, check, state, function (data, total){
            if(data == null){
                data = {};
                return res.send({errorCode:errorCodes.FindProError, rows: data, total : total});
            }else{
                return res.send({
                    errorCode:errorCodes.OK, rows: data, total : total});
            }

//            res.render('user', { title: 'benefitMore' ,path :"managerInfo",data:data, user:user});
        }
    );
});


/** 编辑活动 */
router.post('/addEditProject', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'project')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （project）"});
    }
    var projectInfo = JSON.parse(req.body.projectInfo);

    db.addEditProject(projectInfo, function (data){
            if(data == null){
                return res.send({
                    errorCode: 1});
            }
            return res.send({
                errorCode: 0});
        }
    );
});

/** 审核通过活动 */
router.post('/passProject', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'project')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （project）"});
    }
    var advertInfo = JSON.parse(req.body.projectInfo);
    console.log(advertInfo)
    var delAdvert = [];
    var delAdvertStr = '';
    for(var i in advertInfo){
        var Advert = advertInfo[i];
        delAdvertStr += "?,";
        delAdvert.push(Advert.proId);
    }
    delAdvertStr = delAdvertStr.substr(0, delAdvertStr.length-1);
    console.log(delAdvertStr)
    db.passProject(delAdvert, delAdvertStr, function (data){
            if(data == null){
                return res.send({
                    errorCode: 1});
            }
            return res.send({
                errorCode: 0});
        }
    );
});

/** 删除活动 */
router.post('/deleteProject', function(req, res, next) {
    var user = req.session.user;
    if(typeof user == "undefined" || null == user){
        return res.render('login', { title: 'benefitMore' });
    }
    if(!utils.checkPower(user.power, 'project')){
        return res.render('home', { title: 'benefitMore' ,path :"index", user:user, error: "权限不足 （project）"});
    }
    var advertInfo = JSON.parse(req.body.projectInfo);
    var delAdvert = [];
    var delAdvertStr = '';
    for(var i in advertInfo){
        var Advert = advertInfo[i];
        delAdvertStr += "?,";
        delAdvert.push(Advert.proId);
    }
    delAdvertStr = delAdvertStr.substr(0, delAdvertStr.length-1);
    /** 先查询出来 删掉活动图片 */
    db.getProImg(delAdvert, delAdvertStr, function(data){
        for(var p in data){
            var pro = data[p];
            if(pro.itemImg != "" && null != pro.itemImg){
                var exists = fs.existsSync(path.join(__dirname,"../")+'public'+pro.itemImg);
                if(exists){
                    fs.unlinkSync(path.join(__dirname,"../")+'public'+pro.itemImg);
                }
            }
            for(var i=2 ;i<7;i++){
                var imgName = "itemImg"+i;
                var imgPath = pro[imgName];
                if(imgPath != "" && null != imgPath){
                    var exists = fs.existsSync(path.join(__dirname,"../")+'public'+imgPath);
                    if(exists){
                        fs.unlinkSync(path.join(__dirname,"../")+'public'+imgPath);
                    }
                }
            }
        }
        db.delProject(delAdvert, delAdvertStr, function (data){
                if(data == null){
                    return res.send({
                        errorCode: 1});
                }

                return res.send({
                    errorCode: 0});
            }
        );
    });

});


module.exports = router;
