var express = require('express');
var fs = require("fs") ;
var path = require('path');
var app = express();
var multiparty = require('multiparty');
var logger = require('../utils/logs').logger;
var configs = require('../configs');
var errorCodes = require('../utils/errorCodes');

var router = express.Router();

var dbconn = null; //获取数据库连接
router.getDbConnection = function(db){
    dbconn = db; //获取数据库连接
};

router.photoNum = 0;
router.init = function(){
    this.getPhotoNum(1);

};

//文件上传
router.post('/upload', function(req, res, next) {
    var self = router;
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: path.join(__dirname,"../")+'public/img/proImg/'});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
            logger.info('parse error: ' + err);
            return res.send({
                errorCode: 1,errMsg:'上传失败'});
        } else {
            //console.log('parse files: ' + filesTmp);
            var inputFile = files.uploadFile[0];
            /** 图片链接  configs.command.path */
            var resPath = inputFile.path.split('public')[1];
            var uploadedPath = inputFile.path;
            if(inputFile.size >  1024 * 1024){
                fs.unlinkSync(uploadedPath);
                return res.send({
                    errorCode: errorCodes.FileSizeError});
            }else{
                if (path.extname(inputFile.originalFilename).toLowerCase() == '.jpg' || path.extname(inputFile.originalFilename).toLowerCase() == '.png'){
                    return res.send({errorCode: errorCodes.OK, url:resPath});
                }else{
                    fs.unlinkSync(uploadedPath);
                    return res.send({
                        errorCode: errorCodes.FileTypeError});
                }
            }
        }
    });
});


//文件上传错了  及时删除
router.get('/deleteFile/:path', function(req, res, next) {
    var name = req.params.path;
    var exists = fs.existsSync(path.join(__dirname,"../")+'public/img/proImg/'+name);
    if(exists){
        fs.unlinkSync(path.join(__dirname,"../")+'public/img/proImg/'+name);
    }else{
        logger.info('deleteFile not find path: ' + path.join(__dirname,"../")+'public/img/proImg/'+name);
    }
    return res.send({errorCode: errorCodes.OK});
});


//执行上传
router.post('/advertUpload', function(req, res, next) {
    var self = router;
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: path.join(__dirname,"../")+'public/img/advertImg/'});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            logger.info('parse error: ' + err);
            return res.send({
                errorCode: 1,errMsg:'上传失败'});
        } else {
            //console.log('parse files: ' + filesTmp);
            var inputFile = files.uploadFile[0];
            /** 图片链接  configs.command.path */
            var resPath = inputFile.path.split('public')[1];
            var uploadedPath = inputFile.path;
            if(inputFile.size >  1024 * 1024){
                fs.unlinkSync(uploadedPath);
                return res.send({
                    errorCode: 1,errMsg:'文件太大'});
            }else{
                if (path.extname(inputFile.originalFilename).toLowerCase() == '.jpg' || path.extname(inputFile.originalFilename).toLowerCase() == '.png'){
                    return res.send({errorCode: 0, url:resPath});
                }else{
                    fs.unlinkSync(uploadedPath);
                    return res.send({
                        errorCode: 1,errMsg:'文件格式只能是 jpg 后缀'});
                }
            }
        }
    });
});

//router.getPhotoNum = function(){
//    return this.photoNum;
//};


router.getPhotoNum = function(isInit){
    //console.log("#####  getPhotoNum for mongodb !");
    var self = this;
    dbconn.connColl("eTest","ePhoto", function(err,collection) {
        collection.find({photo:"photoNum"}).toArray(function(err,docs){
            if(!!err){
                dbconn.closeDB();
            }

            if(!!docs[0]){
                self.photoNum = docs[0].photoNum;
                console.log("#### photoNum:"+self.photoNum);
                logger.info("#### photoNum:"+self.photoNum);
                dbconn.closeDB();
                if(isInit==1){
                    //self.downPhoto(); //用自己的服务器 启动不用重新加载七牛的照片了
                }
            }else{
                dbconn.closeDB();
            }
        });
    });
};

module.exports = router;
