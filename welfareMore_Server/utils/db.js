var mysql=require("mysql");
var crypto = require('./crypto');
var util = require('util');
var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var logger = require('../utils/logs').logger;
var pool = null;


exports.createprov1 = function (body, callback) {

    var self = this;
    var createtime = utils.dateString();
    var backinfo=JSON.parse(body.backinfo);
    switch (backinfo.type) {
        case 0:{//融资
            self.createrongzi (body, createtime, callback);
            break;
        }
        case 1:{//承接不良
            self.createchengjiebuliang(body, createtime, callback);
            break;
        }
        case 2:{//短拆
            self.createduanchai(body,createtime,callback);
            break;
        }
        case 3:{//倒贷
            self.createdaodai(body,createtime,callback)
            break;
        }
    }
};
// 融资
exports.createrongzi = function(body,createtime, callback) {
    console.log(createtime, '')
    // var state = body.state;//活动状态
    // var type = body.type;//活动类型
    // var major = body.major;//活动行业
    // var phone = body.phone;//电话
    // var num = body.num;//需求金额
    // var collateralvalue = body.collateralvalue;//抵押物评估价值
    // var remarks = body.remarks;//备注
    // var collateralimgarray = body.collateralimgarray;//抵押物证件图片，最多三张
    // var licenseimg = body.licenseimg;//营业执照图片，最多一张
    // var creditreportimgarray = body.creditreportimgarray;//征信报告图片，最多三张
    // 基础信息 basicinfo
    var basicinfo=JSON.parse(body.basicinfo);
    var major=basicinfo.major;
    var b_major=basicinfo.b_major;
    var phone=basicinfo.phone;
    var b_phone=basicinfo.b_phone;
    var remarks=basicinfo.remarks;
    var b_remarks=basicinfo.b_remarks;
    var salesman2=basicinfo.salesman2;
    var b_salesman2=basicinfo.b_salesman2;
    var companyname=basicinfo.companyname;
    var b_companyname=basicinfo.b_companyname;

    //征信信息
    var competenceinfo=JSON.parse(body.competenceinfo);
    var collateralimgarray=competenceinfo.collateralimgarray;
    var licenseimg=competenceinfo.licenseimg;
    var creditreportimgarray=competenceinfo.creditreportimgarray;
    var b_collateralimg1=competenceinfo.b_collateralimg1;
    var b_collateralimg2=competenceinfo.b_collateralimg1;
    var b_collateralimg3=competenceinfo.b_collateralimg3;
    var b_licenseimg=competenceinfo.b_licenseimg;
    var b_creditimg1=competenceinfo.b_creditimg1;
    var b_creditimg2=competenceinfo.b_creditimg2;
    var b_creditimg3=competenceinfo.b_creditimg3;
    //后台信息
    var backinfo=JSON.parse(body.backinfo);
    var state=backinfo.state;
    var type=backinfo.type;
    var isselfconduct=backinfo.isselfconduct;
    var salesman=backinfo.salesman;
    var b_salesman=backinfo.b_salesman;
    var salesman1=backinfo.salesman1;
    var b_salesman1=backinfo.b_salesman1;
    // 活动信息
    var proinfo=JSON.parse(body.proinfo);
    var num=proinfo.num;
    var b_num=proinfo.b_num;
    var collateralvalue=proinfo.collateralvalue;
    var b_collateralvalue=proinfo.b_collateralvalue;
    console.log(b_collateralvalue, '!!')
    
    if(state <=0 ||
        type < 0  ||
        major < 0 ||
        phone.length < 7 ||
        num <= 0 ||
        collateralvalue <= 0
    ) {
        return callback(-1);
    }

    callback = callback == null? nop:callback;
    var sql = 'INSERT INTO rongzipro (state, type,createtime,companyname,b_companyname, major,b_major, phone,b_phone, num,b_num, remarks,b_remarks, collateralvalue, b_collateralvalue,collateralimg1,b_collateralimg1, collateralimg2,b_collateralimg2, collateralimg3,b_collateralimg3, licenseimg,b_licenseimg, creditimg1,b_creditimg1, creditimg2,b_creditimg2, creditimg3,b_creditimg3, isselfconduct,salesman,b_salesman,salesman1,b_salesman1,salesman2,b_salesman2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var parm =  [state, type,createtime, companyname,b_companyname,major,b_major, phone,b_phone, num,b_num, remarks, b_remarks,  collateralvalue,b_collateralvalue, collateralimgarray[0],b_collateralimg1, collateralimgarray[1],b_collateralimg2, collateralimgarray[2],b_collateralimg3, licenseimg, b_licenseimg, creditreportimgarray[0],b_creditimg1, creditreportimgarray[1],b_creditimg2, creditreportimgarray[2],b_creditimg3, isselfconduct,salesman,b_salesman,salesman1,b_salesman1,salesman2,b_salesman2 ];
    //var parm =  [state, type, major, phone, num, remarks, collateralvalue];
    sql = mysql.format(sql,parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            logger.error("createPro err: %j", utils.getErrorMessage(err));
            callback(2);
        }
        else{
            callback(0);
        }
    });
};
// 承接不良
exports.createchengjiebuliang = function (body, createtime, callback) {
    var basicinfo=JSON.parse(body.basicinfo);
    var major=basicinfo.major;
    var b_major=basicinfo.b_major;
    var phone=basicinfo.phone;
    var b_phone=basicinfo.b_phone;
    var remarks=basicinfo.remarks;
    var b_remarks=basicinfo.b_remarks;
    var salesman2=basicinfo.salesman2;
    var b_salesman2=basicinfo.b_salesman2;
    var companyname=basicinfo.companyname;
    var b_companyname=basicinfo.b_companyname;

    //征信信息
    var competenceinfo=JSON.parse(body.competenceinfo);
    var collateralimgarray=competenceinfo.collateralimgarray;
    var licenseimg=competenceinfo.licenseimg;
    var creditreportimgarray=competenceinfo.creditreportimgarray;
    var b_collateralimg1=competenceinfo.b_collateralimg1;
    var b_collateralimg2=competenceinfo.b_collateralimg1;
    var b_collateralimg3=competenceinfo.b_collateralimg3;
    var b_licenseimg=competenceinfo.b_licenseimg;
    var b_creditimg1=competenceinfo.b_creditimg1;
    var b_creditimg2=competenceinfo.b_creditimg2;
    var b_creditimg3=competenceinfo.b_creditimg3;
    //后台信息
    var backinfo=JSON.parse(body.backinfo);
    var state=backinfo.state;
    var type=backinfo.type;
    var isselfconduct=backinfo.isselfconduct;
    var salesman=backinfo.salesman;
    var b_salesman=backinfo.b_salesman;
    var salesman1=backinfo.salesman1;
    var b_salesman1=backinfo.b_salesman1;
    // 活动信息
    var proinfo=JSON.parse(body.proinfo);
    var loannum=proinfo.loannum;
    var b_loannum=proinfo.b_loannum;
    var guaranteemode=proinfo.guaranteemode;
    var b_guaranteemode=proinfo.b_guaranteemode;
    var interesttime=proinfo.interesttime;
    var b_interesttime=proinfo.b_interesttime;
    var interestnum=proinfo.interestnum;
    var b_interestnum=proinfo.b_interestnum;
    
    if(state <=0 ||
        type < 0  ||
        major < 0 ||
        phone.length < 7 
    ) {
        return callback(-1);
    }

    callback = callback == null? nop:callback;
    var sql = 'INSERT INTO chengjiebuliangpro (state, type,createtime,companyname,b_companyname, major,b_major, phone,b_phone,  remarks,b_remarks, collateralimg1,b_collateralimg1, collateralimg2,b_collateralimg2, collateralimg3,b_collateralimg3, licenseimg,b_licenseimg, creditimg1,b_creditimg1, creditimg2,b_creditimg2, creditimg3,b_creditimg3, isselfconduct,salesman,b_salesman,salesman1,b_salesman1,salesman2,b_salesman2,loannum,b_loannum,guaranteemode,b_guaranteemode,interesttime,b_interesttime,interestnum,b_interestnum ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var parm =  [state, type,createtime, companyname,b_companyname,major,b_major, phone,b_phone,  remarks, b_remarks,   collateralimgarray[0],b_collateralimg1, collateralimgarray[1],b_collateralimg2, collateralimgarray[2],b_collateralimg3, licenseimg, b_licenseimg, creditreportimgarray[0],b_creditimg1, creditreportimgarray[1],b_creditimg2, creditreportimgarray[2],b_creditimg3, isselfconduct,salesman,b_salesman,salesman1,b_salesman1,salesman2,b_salesman2,loannum,b_loannum,guaranteemode,b_guaranteemode,interesttime,b_interesttime,interestnum,b_interestnum ];
    //var parm =  [state, type, major, phone, num, remarks, collateralvalue]sl;
    sql = mysql.format(sql,parm);
    console.log(sql)
    query(sql, function(err, rows, fields) {
        if (err) {
            logger.error("createPro err: %j", utils.getErrorMessage(err));
            callback(2);
        }
        else{
            callback(0);
        }
    });
};
// 短拆
exports.createduanchai = function (body, createtime, callback) {
    var basicinfo=JSON.parse(body.basicinfo);
    var major=basicinfo.major;
    var b_major=basicinfo.b_major;
    var phone=basicinfo.phone;
    var b_phone=basicinfo.b_phone;
    var remarks=basicinfo.remarks;
    var b_remarks=basicinfo.b_remarks;
    var salesman2=basicinfo.salesman2;
    var b_salesman2=basicinfo.b_salesman2;
    var companyname=basicinfo.companyname;
    var b_companyname=basicinfo.b_companyname;

    //征信信息
    var competenceinfo=JSON.parse(body.competenceinfo);
    var collateralimgarray=competenceinfo.collateralimgarray;
    var licenseimg=competenceinfo.licenseimg;
    var creditreportimgarray=competenceinfo.creditreportimgarray;
    var b_collateralimg1=competenceinfo.b_collateralimg1;
    var b_collateralimg2=competenceinfo.b_collateralimg1;
    var b_collateralimg3=competenceinfo.b_collateralimg3;
    var b_licenseimg=competenceinfo.b_licenseimg;
    var b_creditimg1=competenceinfo.b_creditimg1;
    var b_creditimg2=competenceinfo.b_creditimg2;
    var b_creditimg3=competenceinfo.b_creditimg3;
    //后台信息
    var backinfo=JSON.parse(body.backinfo);
    var state=backinfo.state;
    var type=backinfo.type;
    var isselfconduct=backinfo.isselfconduct;
    var salesman=backinfo.salesman;
    var b_salesman=backinfo.b_salesman;
    var salesman1=backinfo.salesman1;
    var b_salesman1=backinfo.b_salesman1;
    // 活动信息
    var proinfo=JSON.parse(body.proinfo);
    var num=proinfo.num;
    var b_num=proinfo.b_num;
    var loantime=proinfo.loantime;
    var b_loantime=proinfo.b_loantime;
    var collateralvalue=proinfo.collateralvalue;
    var b_collateralvalue=proinfo.b_collateralvalue;
    
    if(state <=0 ||
        type < 0  ||
        major < 0 ||
        phone.length < 7 
    ) {
        return callback(-1);
    }

    callback = callback == null? nop:callback;
    var sql = 'INSERT INTO duanchaipro (state, type,createtime,companyname,b_companyname, major,b_major, phone,b_phone,  remarks,b_remarks, collateralimg1,b_collateralimg1, collateralimg2,b_collateralimg2, collateralimg3,b_collateralimg3, licenseimg,b_licenseimg, creditimg1,b_creditimg1, creditimg2,b_creditimg2, creditimg3,b_creditimg3, isselfconduct,salesman,b_salesman,salesman1,b_salesman1,salesman2,b_salesman2,loantime,b_loantime,num,b_num,collateralvalue,b_collateralvalue) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var parm =  [state, type,createtime, companyname,b_companyname,major,b_major, phone,b_phone,  remarks, b_remarks,   collateralimgarray[0],b_collateralimg1, collateralimgarray[1],b_collateralimg2, collateralimgarray[2],b_collateralimg3, licenseimg, b_licenseimg, creditreportimgarray[0],b_creditimg1, creditreportimgarray[1],b_creditimg2, creditreportimgarray[2],b_creditimg3, isselfconduct,salesman,b_salesman,salesman1,b_salesman1,salesman2,b_salesman2,loantime,b_loantime,num,b_num,collateralvalue,b_collateralvalue ];
    //var parm =  [state, type, major, phone, num, remarks, collateralvalue]sl;
    sql = mysql.format(sql,parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            logger.error("createPro err: %j", utils.getErrorMessage(err));
            callback(2);
        }
        else{
            callback(0);
        }
    });
};
// 倒贷
exports.createdaodai = function (body, createtime, callback) {
    var basicinfo=JSON.parse(body.basicinfo);
    var major=basicinfo.major;
    var b_major=basicinfo.b_major;
    var phone=basicinfo.phone;
    var b_phone=basicinfo.b_phone;
    var remarks=basicinfo.remarks;
    var b_remarks=basicinfo.b_remarks;
    var salesman2=basicinfo.salesman2;
    var b_salesman2=basicinfo.b_salesman2;
    var companyname=basicinfo.companyname;
    var b_companyname=basicinfo.b_companyname;

    //征信信息
    var competenceinfo=JSON.parse(body.competenceinfo);
    var collateralimgarray=competenceinfo.collateralimgarray;
    var licenseimg=competenceinfo.licenseimg;
    var creditreportimgarray=competenceinfo.creditreportimgarray;
    var b_collateralimg1=competenceinfo.b_collateralimg1;
    var b_collateralimg2=competenceinfo.b_collateralimg1;
    var b_collateralimg3=competenceinfo.b_collateralimg3;
    var b_licenseimg=competenceinfo.b_licenseimg;
    var b_creditimg1=competenceinfo.b_creditimg1;
    var b_creditimg2=competenceinfo.b_creditimg2;
    var b_creditimg3=competenceinfo.b_creditimg3;
    //后台信息
    var backinfo=JSON.parse(body.backinfo);
    var state=backinfo.state;
    var type=backinfo.type;
    var isselfconduct=backinfo.isselfconduct;
    var salesman=backinfo.salesman;
    var b_salesman=backinfo.b_salesman;
    var salesman1=backinfo.salesman1;
    var b_salesman1=backinfo.b_salesman1;
    // 活动信息
    var proinfo=JSON.parse(body.proinfo);
    var num=proinfo.num;
    var b_num=proinfo.b_num;
    var collateralvalue=proinfo.collateralvalue;
    var b_collateralvalue=proinfo.b_collateralvalue;
    var reversedate=proinfo.reversedate;
    var b_reversedate=proinfo.b_reversedate;
    var loanbank=proinfo.loanbank;
    var b_loanbank=proinfo.b_loanbank
    
    if(state <=0 ||
        type < 0  ||
        major < 0 ||
        phone.length < 7 
    ) {
        return callback(-1);
    }

    callback = callback == null? nop:callback;
    var sql = 'INSERT INTO daodaipro (state, type,createtime,companyname,b_companyname, major,b_major, phone,b_phone,  remarks,b_remarks, collateralimg1,b_collateralimg1, collateralimg2,b_collateralimg2, collateralimg3,b_collateralimg3, licenseimg,b_licenseimg, creditimg1,b_creditimg1, creditimg2,b_creditimg2, creditimg3,b_creditimg3, isselfconduct,salesman,b_salesman,salesman1,b_salesman1,salesman2,b_salesman2,num,b_num,collateralvalue,b_collateralvalue,reversedate,b_reversedate,loanbank,b_loanbank) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var parm =  [state, type,createtime, companyname,b_companyname,major,b_major, phone,b_phone,  remarks, b_remarks,   collateralimgarray[0],b_collateralimg1, collateralimgarray[1],b_collateralimg2, collateralimgarray[2],b_collateralimg3, licenseimg, b_licenseimg, creditreportimgarray[0],b_creditimg1, creditreportimgarray[1],b_creditimg2, creditreportimgarray[2],b_creditimg3, isselfconduct,salesman,b_salesman,salesman1,b_salesman1,salesman2,b_salesman2,num,b_num,collateralvalue,b_collateralvalue,reversedate,b_reversedate,loanbank,b_loanbank ];
    //var parm =  [state, type, major, phone, num, remarks, collateralvalue]sl;
    sql = mysql.format(sql,parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            logger.error("createPro err: %j", utils.getErrorMessage(err));
            callback(2);
        }
        else{
            callback(0);
        }
    });
};

/**
 * 
 * 查询活动
 */
exports.getprojectv1 = function (state, type, callback) {
    console.log(state, type);
    if(type==0)
    {
        var sql = 'SELECT * FROM rongzipro where state=? AND type=?'
    }
    else if(type==1)
    {
        var sql = 'SELECT * FROM chengjiebuliangpro where state=? AND type=?'
    }
    else if(type==2)
    {
        var sql = 'SELECT * FROM duanchaipro where state=? AND type=?'
    }
    else if(type==3)
    {
        var sql = 'SELECT * FROM daodaipro where state=? AND type=?'
    }
    
    var param = [state, type];
    sql = mysql.format(sql, param);
    query(sql, function(err, rows, fields) {
        if (err) {
            logger.error("createSalesman err: %j", utils.getErrorMessage(err));
            callback(2);
        }
        else{
            callback(
                {
                    data:rows,
                }
            );
        }
    });

};


exports.editprov1 = function (body,proids,proidStr, callback) {

    var self = this;
    var createtime = utils.dateString();
    switch (body.type) {
        case 0:{//融资
            self.editrongzi (body,proids,proidStr, callback);
            break;
        }
        case 1:{//承接不良
            self.editchengjiebuliang(body,proids,proidStr, callback);
            break;
        }
        case 2:{//短拆
            self.editduanchai(body,proids,proidStr, callback);
            break;
        }
        case 3:{//倒贷
            self.editdaodai(body,proids,proidStr, callback);
            break;
        }
    }
};

// 修改活动状态，，  待审核1，审核通过3，审核未通过2，正在作业中4，完成5
exports.editrongzi=function(body,proids,proidStr,callback)
{
    var proid=body.proid;
    var state=body.state
    var sql = 'update rongzipro set state = ('+state+') where  proId in ('+proidStr+')';
    // var parm =  [state]
    sql=mysql.format(sql,proids);
    console.log(sql)
    query(sql, function(err, rows, fields) {
        if (err) {
            // logger.error("createPro err: %j", utils.getErrorMessage(err));
            callback(2);
        }
        else{
            callback(0);
        }
    });
};
exports.editchengjiebuliang=function(body,proids,proidStr,callback)
{
    var proid=body.proid;
    var state=body.state
    var sql = 'update chengjiebuliangpro set state = ('+state+') where  proId in ('+proidStr+')';
    // var parm =  [state]
    sql=mysql.format(sql,proids);
    console.log(sql)
    query(sql, function(err, rows, fields) {
        if (err) {
            // logger.error("createPro err: %j", utils.getErrorMessage(err));
            callback(2);
        }
        else{
            callback(0);
        }
    });
};
exports.editduanchai=function(body,proids,proidStr,callback)
{
    var proid=body.proid;
    var state=body.state
    var sql = 'update duanchaipro set state = ('+state+') where  proId in ('+proidStr+')';
    // var parm =  [state]
    sql=mysql.format(sql,proids);
    console.log(sql)
    query(sql, function(err, rows, fields) {
        if (err) {
            // logger.error("createPro err: %j", utils.getErrorMessage(err));
            callback(2);
        }
        else{
            callback(0);
        }
    });
};
exports.editdaodai=function(body,proids,proidStr,callback)
{
    var proid=body.proid;
    var state=body.state
    var sql = 'update daodaipro set state = ('+state+') where  proId in ('+proidStr+')';
    // var parm =  [state]
    sql=mysql.format(sql,proids);
    console.log(sql)
    query(sql, function(err, rows, fields) {
        if (err) {
            // logger.error("createPro err: %j", utils.getErrorMessage(err));
            callback(2);
        }
        else{
            callback(0);
        }
    });
};

// exports.editrongzi = function(body, createtime, callback) {
//     var state = body.state;//活动状态
//     var type = body.type;//活动类型
//     var major = body.major;//活动行业
//     var phone = body.phone;//电话
//     var num = body.num;//需求金额
//     var collateralvalue = body.collateralvalue;//抵押物评估价值
//     var remarks = body.remarks;//备注
//     var collateralimgarray = body.collateralimgarray;//抵押物证件图片，最多三张
//     var licenseimg = body.licenseimg;//营业执照图片，最多一张
//     var creditreportimgarray = body.creditreportimgarray;//征信报告图片，最多三张
//     var proId = body.proId;
//     if(state <=0 ||
//         type < 0  ||
//         major < 0 ||
//         phone.length < 7 ||
//         num <= 0 ||
//         collateralvalue <= 0
//     ) {
//         return callback(-1);
//     }

//     callback = callback == null? nop:callback;
//     //collateralvalue, collateralimg1, collateralimg2, collateralimg3, licenseimg, creditimg1, creditimg2, creditimg3, createtime
//     var sql = 'update rongzipro set state=?, type=?,major=?,phone=?,num=?,remarks=?,collateralvalue=?,collateralimg1=?,' +
//                   'collateralimg2=?,collateralimg3=?,licenseimg=?,creditimg1=?,creditimg1=?,creditimg3=?,createtime=?' + 
//                   'where proId=?';
//     var parm =  [state, type, major, phone, num, remarks,  collateralvalue, collateralimgarray[0], collateralimgarray[1],collateralimgarray[2],licenseimg, 
//                         creditreportimgarray[0], creditreportimgarray[1], creditreportimgarray[2], createtime, proId];
//     sql = mysql.format(sql,parm);
//     query(sql, function(err, rows, fields) {
//         if (err) {
//             logger.error("createPro err: %j", utils.getErrorMessage(err));
//             callback(2);
//         }
//         else{
//             callback(0);
//         }
//     });
// };


/*
 * 删除活动
 */
 exports.deleteprov1=function (state, type, proId, callback) {
    var self = this;
    switch (type) {
        case 0:{//融资
            self.delrongzi (state, proId, callback);
            break;
        }
        case 1:{//承接不良
            // self.editchengjiebuliang(body, createtime, callback);
            break;
        }
        case 2:{//短拆
            break;
        }
        case 3:{//倒贷
            break;
        }
    }

};

exports.delrongzi=function (state, proId, callback) {

    var self = this;
    callback = callback == null? nop:callback;
    var sql = 'delete from rongzipro where proId =? AND state =?';
    var param = [proId, state];
    sql = mysql.format(sql,param);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            callback(0);
        }
    });

}































function nop(a,b,c,d,e,f,g){

}
  
function query(sql,callback){  
    pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,function(qerr,vals,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,vals,fields);  
            });  
        }  
    });  
};

//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */

function geFileList(path) {
    var filesList = [];
    readFile(path, filesList);
    return filesList;
}

//遍历读取文件
function readFile(path, filesList) {
    var files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(walk);
    function walk(file) {
        var states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesList);
        }
        else {
            //创建一个对象保存信息
//            var obj = new Object();
//            obj.size = states.size;//文件大小，以字节为单位
//            obj.name = file;//文件名
//            obj.path = path + '/' + file; //文件绝对路径
            filesList.push(file);
        }
    }
}


var filesList = geFileList(path.join(__dirname,"../")+'public/img/advertImg/');



exports.init = function(config){
    var self = this;

    /** 启动服务器时候 加载好 基础数据  */
    self.newProject = []; //最新活动
    self.successProject = []; //完成状态活动（成功案例）
    self.topProject = []; //置顶活动
    self.advert = [];

    pool = mysql.createPool({
//        connectionLimit : 2000,
        connectTimeout  : 60 * 1000,
        aquireTimeout   : 60 * 1000,
        timeout         : 60 * 1000,
        host: config.HOST,
        user: config.USER,
        password: config.PSWD,
        database: config.DB,
        port: config.PORT
    });

    /** 最新活动 前6条 */
    self.getNewProject(self);

    /** 成功案例 前3条 */
    self.getSuccessProject(self);

    /** 置顶 前3条 */
    var sql = 'SELECT * FROM project where isTop = 1  GROUP BY createTime DESC LIMIT 0,3';
    query(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        }
        else{
            if(rows.length > 0){
                self.topProject = rows;
            }
        }
    });

    /** 广告推广 前3条 */
    sql =  'SELECT * FROM advert GROUP BY id DESC';
    query(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        }
        else{
            if(rows.length > 0){
                self.advert = rows;
            }

            /** 清理已经删除的广告图片 */
            for (var i = 0; i < filesList.length; i++) {
                var item = filesList[i];
                var isDel = true;
                for(var a in rows){
                    var advert = rows[a];
                    if((!!advert['iconurl'] && advert['iconurl'].indexOf(item))>-1 || (!!advert['backimgurl'] &&advert['backimgurl'].indexOf(item)>-1)){
                        isDel = false;
                        break
                    }
                }
                if(isDel){
                    var curPath = '../public/img/advertImg/'+item;
                    var exists = fs.existsSync(curPath);
                    if(exists){
                        fs.unlinkSync(curPath);
                    }

                }
            }
        }
    });




};

/** 创建活动 */
exports.createPro = function(proInfo , callback){
    var self = this;
    var name = proInfo.legalManName;
    var phone = proInfo.legalManPhone;
    var cmpName = proInfo.cmpName;
    var itemDesc = proInfo.itemDesc;
    var itemImg = proInfo.itemImg;
    var itemImg2 = proInfo.itemImg2;
    var itemImg3 = proInfo.itemImg3;
    var itemImg4 = proInfo.itemImg4;
    var itemImg5 = proInfo.itemImg5;
    var itemImg6 = proInfo.itemImg6;
    var itemName = proInfo.itemName;
    var itemArea = proInfo.itemArea;
    var itemAreaShow = proInfo.itemAreaShow;
    var itemMoney = proInfo.itemMoney;
    var itemMoneyShow = proInfo.itemMoneyShow;
    var itemPlace = proInfo.itemPlace;
    var itemPlaceShow = proInfo.itemPlaceShow;
    var businessv1 = proInfo.businessv1;
    var businessv1Show = proInfo.businessv1Show;
    var businessv2 = proInfo.businessv2;
    var businessv2Show = proInfo.businessv2Show;
    var itemType = proInfo.itemType;
    var itemTypeShow = proInfo.itemTypeShow;
    var createTime = utils.dateString();
    if(null == name || null == phone || null == cmpName|| null == itemDesc || null == itemImg || null == itemImg2 || null == itemImg3 || null == itemImg4 || null == itemImg5
        || null == itemName|| null == itemArea || null == itemAreaShow || null == itemMoney || null == itemMoneyShow || null == itemPlace ||
        null == itemPlaceShow || null == businessv1 || null == businessv1Show || null == businessv2 || null == businessv2Show || null ==itemType || null ==itemTypeShow){
        return callback(1);
    }
    if("" == name || "" == phone || "" == cmpName|| "" == itemName||"" == itemDesc||  "" == itemArea || "" == itemAreaShow || "" == itemMoney || "" == itemMoneyShow || "" == itemPlace
        || "" == itemPlaceShow || "" == businessv1 || "" == businessv1Show || "" == businessv2 || "" == businessv2Show || "" ==itemType || "" ==itemTypeShow){
        return callback(1);
    }
    callback = callback == null? nop:callback;
    var sql = 'INSERT INTO project (legalManName, legalManPhone, cmpName, itemDesc, itemImg, itemImg2, itemImg3, itemImg4, itemImg5, itemImg6, itemName, itemArea, itemAreaShow, itemMoney,' +
        ' itemMoneyShow, itemPlace, itemPlaceShow,  businessv1, businessv1Show, businessv2, businessv2Show ,itemType, itemTypeShow, createTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var parm =  [name, phone, cmpName, itemDesc, itemImg, itemImg2, itemImg3, itemImg4, itemImg5, itemImg6, itemName, +itemArea, +itemAreaShow, +itemMoney,
        +itemMoneyShow, +itemPlace, +itemPlaceShow, businessv1, +businessv1Show, businessv2, +businessv2Show, itemType, itemTypeShow, createTime];
    sql = mysql.format(sql,parm);
//    logger.fatal("createSalesman sql: %j", sql);
    query(sql, function(err, rows, fields) {
        if (err) {
            logger.error("createPro err: %j", utils.getErrorMessage(err));
            callback(2);
        }
        else{
            callback(0);
        }
    });
}

/** 申请发起人
 *
 * busiman_name string 发起人姓名
 busiman_id string 发起人id
 busiman_age int<枚举类型> 下拉框的形式<客户端有策划表，记
 录同级年龄段就可以>
 busiman_phone string 手机号
 busnman_email string 邮箱地址
 busiman_wechat string 微信号
 busiman_major int <枚举类型> <客户端有策划表>,服务器保存id
 busiman_lv1id<introitem:介绍活动> string
 1级发起人 ： 业务介绍员<只负责介 绍活动，不负责跟进活动>
 2级发起人 ： 活动跟进员。<负责跟 进活动>
 busiman_lv2id<folitem:跟进活动 > string
 busiman_items array<ITEMStruct>
 * */
exports.createSalesman = function(proInfo , callback){
    var name = proInfo.name;
    var age = proInfo.age;
    var phone = proInfo.phone;
    var email = proInfo.email;
    var wechat = proInfo.wechat;
    var major = proInfo.major;
    var lv1id = proInfo.lv1id;

    if(null == name || null == phone || null == age|| null == email|| null == major|| null == wechat|| null == lv1id||
        "" == name || "" == phone || "" == age|| "" == email|| "" == major|| "" == wechat|| "" == lv1id){
        return callback(1);
    }
    callback = callback == null? nop:callback;
    var sql = 'INSERT INTO salesman (name, age, phone, email, weChatId, major, inWeChatId ) VALUES (?,?,?,?,?,?,?)';
    var parm =  [name, +age, phone,  email, wechat, major, +lv1id];
    sql = mysql.format(sql,parm);
//    logger.fatal("createSalesman sql: %j", sql);
    query(sql, function(err, rows, fields) {
        if (err) {
            logger.error("createSalesman err: %j", utils.getErrorMessage(err));
            callback(2);
        }
        else{
            callback(0);
        }
    });

}

/** 根据资源来兴 查出该资源的自定义规则数据 */
exports.getMyRulesByType = function(type, callback){
    callback = callback == null? nop:callback;
    var sql = "";
    if(type == 0){
        sql = 'SELECT * FROM myrules';
    }else{
        sql = 'SELECT * FROM myrules where type = ? ';
        sql = mysql.format(sql, type);
    }
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            if(rows.length > 0){
                callback(rows);
            }
            else{
                callback(null);
            }
        }
    });
};

/** 前台注册登录 */
exports.loginTest = function(callback){
    var self = this;
    callback({
        newProject:self.newProject,
        successProject:self.successProject,
        topProject:self.topProject,
        advert:self.advert
    });
}

/** 前台注册登录 */
exports.login = function(weChatId, inWeChatId, callback){
    var self = this;
    callback = callback == null? nop:callback;
    var sql = 'SELECT * from salesman where weChatId = ?';
    sql = mysql.format(sql, weChatId);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            var myInfo = {
                weChatId:weChatId,
                inWeChatId:inWeChatId
            };
            if(rows.length > 0){
                /** 已经注册过了 直接登录吧 */
                myInfo = rows[0];
            }
            else{
                var sql = 'INSERT INTO salesman (weChatId, inWeChatId) VALUES(?,?)';
                var parm =  [weChatId, inWeChatId];
                sql = mysql.format(sql, parm);
                query(sql, utils.done);
            }
            callback({
                myInfo:myInfo,
                newProject:self.newProject,
                topProject:self.topProject,
                successProject:self.successProject,
                advert:self.advert
            });
        }
    });
};

/** 后台登录 */
exports.backLogin = function(username,callback){
    callback = callback == null? nop:callback;
    var sql = 'SELECT `user`.*,power.power FROM user,power where username = ? and `user`.type = power.type';
    sql = mysql.format(sql, username);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            if(rows.length > 0){
                callback(rows[0]);
            }
            else{
                callback(null);
            }
        }
    });
};

exports.getMyInfo = function(username,callback){
    callback = callback == null? nop:callback;
    var sql = 'SELECT * FROM user,power where username = ? and `user`.type = power.type';
    sql = mysql.format(sql, username);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            if(rows.length > 0){
                callback(rows[0]);
            }
            else{
                callback(null);
            }
        }
    });
};



/** 添加自定义规则  */
exports.addMyRules = function(id, name, type, startTime, endTime, companyName, areaId, callback){
    callback = callback == null? nop:callback;
    var sql = 'INSERT INTO myrules VALUES(?,?,?,?,?,?,?)';
    var parm =  [id,name,type,startTime,endTime,companyName,areaId];
    sql = mysql.format(sql,parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            if(rows.length > 0){
                callback(rows[0]);
            }
            else{
                callback(null);
            }
        }
    });
};

/** 添加系统默认规则  */
exports.addSysRules = function(id, name, type, startTime, endTime, companyName, areaId, callback){
    callback = callback == null? nop:callback;
    var sql = 'INSERT INTO sysrules VALUES(?,?,?,?,?,?,?)';
    var parm =  [id,name,type,startTime,endTime,companyName,areaId];
    sql = mysql.format(sql,parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            if(rows.length > 0){
                callback(rows[0]);
            }
            else{
                callback(null);
            }
        }
    });
};

/** 根据id 查出该资源的默认规则数据 */
exports.getMyRulesById = function(id, callback){
    callback = callback == null? nop:callback;
    var sql = 'SELECT * FROM myrules where id = ? ';
    sql = mysql.format(sql, id);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            if(rows.length > 0){
                callback(rows[0]);
            }
            else{
                callback(null);
            }
        }
    });
};

/** 更新自定义规则  */
exports.upMyRules = function(oldId, id, name, type, startTime, endTime, companyName, areaId, callback){
    callback = callback == null? nop:callback;
    var sql = 'update myrules set id = ?, name = ?, type = ?, startTime = ?, endTime = ?, companyName = ?, areaId = ? where id = ?';
    var parm =  [id, name,type,startTime,endTime,companyName,areaId, oldId];
    sql = mysql.format(sql,parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            if(rows.length > 0){
                callback(rows[0]);
            }
            else{
                callback(null);
            }
        }
    });
};
exports.addEditProject = function(proInfo, callback){
    var self = this;
//    var DEPARTMENT_ID = proInfo.DEPARTMENT_ID; //1 添加 2 更新
    var proId = proInfo.proId;
    var name = proInfo.legalManName;
    var phone = proInfo.legalManPhone;
    var cmpName = proInfo.cmpName;
    var itemName = proInfo.itemName;
    var itemDesc = proInfo.itemDesc;
    var itemArea = proInfo.itemArea;
    var itemAreaShow = proInfo.itemAreaShow;
    var itemMoney = proInfo.itemMoney;
    var itemMoneyShow = proInfo.itemMoneyShow;
    var itemPlace = proInfo.itemPlace;
    var itemPlaceShow = proInfo.itemPlaceShow;
    var businessv1 = proInfo.businessv1;
    var businessv1Show = proInfo.businessv1Show;
    var businessv2 = proInfo.businessv2;
    var businessv2Show = proInfo.businessv2Show;
    var itemType = proInfo.itemType;
    var itemTypeShow = proInfo.itemTypeShow;
    var itemStage = proInfo.itemStage;

    var isTop = proInfo.isTop;
    if(null == name || null == phone || null == cmpName|| null == itemDesc ||null == itemName|| null == itemArea || null == itemAreaShow || null == itemMoney || null == itemMoneyShow || null == itemPlace ||
        null == itemPlaceShow || null == businessv1 || null == businessv1Show || null == businessv2 || null == businessv2Show || null ==itemType||null ==itemTypeShow){
        return callback(1);
    }
    if("" == name || "" == phone || "" == cmpName|| "" == itemName||  "" == itemDesc|| "" == itemArea || "" == itemAreaShow || "" == itemMoney || "" == itemMoneyShow || "" == itemPlace
        || "" == itemPlaceShow || "" == businessv1 || "" == businessv1Show || "" == businessv2 || "" == businessv2Show || "" ==itemType||"" ==itemTypeShow){
        return callback(1);
    }
    callback = callback == null? nop:callback;
    var sql = 'update project set  legalManName = ?, legalManPhone = ?, cmpName = ?,  itemName = ?, itemDesc = ?, itemArea = ?, itemAreaShow = ?, itemMoney = ?,' +
        ' itemMoneyShow = ?, itemPlace = ?, itemPlaceShow = ?,  businessv1 = ?, businessv1Show = ?, businessv2 = ?, businessv2Show = ? ,itemType = ? ,itemTypeShow = ? ,itemStage = ? ' +
//        ',' +
//        'isTop = ? ' +
        'where proId = ?';
    var parm =  [name, phone, cmpName, itemName, itemDesc, +itemArea, +itemAreaShow, +itemMoney,
        +itemMoneyShow, +itemPlace, +itemPlaceShow, businessv1, +businessv1Show, businessv2, +businessv2Show, itemType, itemTypeShow, itemStage,
//        isTop,
        proId];
    sql = mysql.format(sql,parm);
    logger.error("addEditProject sql :%j",sql);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
//            throw err;
        }
        else{
            /** 成功案例 前3条 */
            self.getSuccessProject(self);
            self.getNewProject(self);
            callback(1);
        }
    });
}

/** 添加 或 更新 广告信息  */
exports.addEditAdvert = function(DEPARTMENT_ID, index, title, content, cssid, iconurl, backimgurl, pagename, callback){
    callback = callback == null? nop:callback;
    var sql = "";
    var parm = "";
    if(DEPARTMENT_ID == 1){
        sql = 'INSERT INTO advert (title, content, cssid, iconurl, backimgurl, pagename) VALUES(?,?,?,?,?,?)';
        parm =  [title, content, cssid, iconurl, backimgurl, pagename];
    }else{
        sql = 'update advert set title = ?, content = ?, cssid = ? ,iconurl = ?, backimgurl = ?, pagename=? where id = ?';
        parm =  [title, content, cssid, iconurl, backimgurl, pagename, index];
    }

    sql = mysql.format(sql,parm);
    logger.error("addEditAdvert sql :%j",sql);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
//            throw err;
        }
        else{
            callback(1);
        }
    });
};

/** 添加 或 更新 发起人信息  */
exports.addEditSalesman = function(DEPARTMENT_ID,  salesId, weChatId, name, age, phone, email, major, inWeChatId,  callback){
    callback = callback == null? nop:callback;
    var sql = 'update salesman set name = ?, age = ?, phone = ? ,email = ?, major = ?, inWeChatId=? where salesId = ?';
    var parm =  [name, +age, phone, email, major, +inWeChatId, +salesId];
    sql = mysql.format(sql,parm);
    logger.error("addEditSalesman sql :%j",sql);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
//            throw err;
        }
        else{
            callback(1);
        }
    });
};

/** 添加 或 更新 管理员信息  */
exports.addEditUser = function(DEPARTMENT_ID, username, password, type, callback){
    callback = callback == null? nop:callback;
    if(DEPARTMENT_ID == 1){
        var sql = 'INSERT INTO user VALUES(?,?,?)';
    }else{
        var sql = 'update user set username = ?, password = ?, type = ? where username = ?';
    }
    var parm =  [username, password, type, username];
    sql = mysql.format(sql,parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
//            throw err;
        }
        else{
            callback(1);
        }
    });
};

/** 删除角色  */
exports.delSalesman = function(delUser, delUserStr, callback){
    callback = callback == null? nop:callback;
    var sql = 'delete from salesman where salesId in ('+delUserStr+')';
    sql = mysql.format(sql,delUser);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            callback(1);
        }
    });
};


/** 删除角色  */
exports.delUser = function(delUser, delUserStr, callback){
    callback = callback == null? nop:callback;
    var sql = 'delete from user where username in ('+delUserStr+')';
    sql = mysql.format(sql,delUser);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
           callback(1);
        }
    });
};

/** 删除广告 */
exports.delAdvert = function(delUser, delUserStr, callback){
    callback = callback == null? nop:callback;
    var sql = 'delete from advert where id in ('+delUserStr+')';
    sql = mysql.format(sql,delUser);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
//            throw err;
        }
        else{
            callback(1);
        }
    });
};

/** 通过活动 */
exports.passProject = function(delUser, delUserStr, callback){
    var self = this;
    callback = callback == null? nop:callback;
    console.log(delUserStr, delUser)
    var sql = 'update project set itemStage = 1 where itemStage = 0 and proId in ('+delUserStr+')';
    sql = mysql.format(sql,delUser);
    console.log(sql)
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
//            throw err;
        }
        else{
            self.getNewProject(self);
            callback(1);
        }
    });
};

/** 成功案例 前3条 */
exports.getSuccessProject = function(self){
    var sql =  'SELECT * FROM project where  isTop <> 1 and itemStage = 7 GROUP BY createTime DESC LIMIT 0,3';
    query(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        }
        else{
            if(rows.length > 0){
                self.successProject = rows;
            }
        }
    });
}

/** 最新活动 前6条 */
exports.getNewProject = function(self){
    var sql = 'SELECT * FROM project where itemStage > 0 and itemStage < 7  and isTop <> 1 GROUP BY createTime DESC LIMIT 0,6';
    query(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        }
        else{
            if(rows.length > 0){
                self.newProject = rows;
            }
        }
    });
}


/** 获取活动图片*/
exports.getProImg = function(delUser, delUserStr, callback){
    var self = this;
    callback = callback == null? nop:callback;
    var sql = 'select * from project where proId in ('+delUserStr+')';
    sql = mysql.format(sql,delUser);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            callback(rows);
        }
    });
}



/** 删除活动 */
exports.delProject = function(delUser, delUserStr, callback){
    var self = this;
    callback = callback == null? nop:callback;
    var sql = 'delete from project where proId in ('+delUserStr+')';
    sql = mysql.format(sql,delUser);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            self.getNewProject(self);
            callback(1);
        }
    });
};



/** 添加 或 更新 权限信息  */
exports.addEditPower = function(DEPARTMENT_ID, type, name, power, des , callback){
    callback = callback == null? nop:callback;
    if(DEPARTMENT_ID == 1){
        var sql = 'INSERT INTO power VALUES(?,?,?,?)';
    }else{
        var sql = 'update power set type = ?, name = ?, power = ? , des = ? where type = ?';
    }
    var parm =  [type, name, power, des, type];
    sql = mysql.format(sql,parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
//            throw err;
        }
        else{
            callback(1);
        }
    });
};


/** 删除权限  */
exports.delPower = function(delPower, delPowerStr, callback){
    callback = callback == null? nop:callback;
    var sql = 'delete from power where type in ('+delPowerStr+')';
    sql = mysql.format(sql, delPower);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            callback(1);
        }
    });
};


/** 查出活动信息 */
exports.getMyProject = function(salesId, limit, start, callback) {
    callback = callback == null ? nop : callback;
    var parm = [];
    parm.push(salesId,salesId);
    var sql = 'SELECT * FROM project where 1=1 and (businessv1 = ? or  businessv2 = ?)  ';
    if(!!limit && (start==0 || !!start)){
        sql += '  GROUP BY createTime DESC LIMIT ? , ?';
        parm.push(start);
        parm.push(limit);
    }
    sql = mysql.format(sql, parm);
    logger.fatal(sql);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
//            throw err;
        }
        if(rows.length > 0){
            callback(rows);
        }
        else{
            callback({});
        }
    });
}

/** 查出活动信息 */
exports.getProject = function(limit, start, cmpName, legalManName,  type, stage, search, check, state,callback){
    callback = callback == null? nop:callback;
    var parm = [];
    var sql = 'SELECT * FROM project where 1=1  ';
    if(check == 1 && state != 1 && state!=2){
        sql += 'and itemStage > 0  ';
    }else if(state != 1 && state!=2){
        sql += 'and itemStage = 0  ';
    }
    if(state == 2){
        sql += 'and itemStage >0  and  itemStage < 7 ';
    }
    if(state == 1){
        sql += 'and itemStage = 7  ';
    }
    if(!!legalManName && !search){
        sql += 'and legalManName = ? ';
        parm.push(legalManName);
    }
    if(!!cmpName && !search){
        sql += 'and cmpName = ? ';
        parm.push(cmpName);
    }
    if(!!type && type!= -1 && !search){
        sql += 'and itemType = ? ';
        parm.push(type);
    }
    if(!!search && !type && !cmpName){
        sql += ' legalManName LIKE "%?%" ';
        parm.push(search);
    }
    if(!!limit && (start==0 || !!start)){
        sql += '  GROUP BY createTime DESC LIMIT ? , ?';
        parm.push(start);
        parm.push(limit);
    }
    sql = mysql.format(sql, parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
//            throw err;
        }
        else{ /** 查询总数 */
            query("SELECT count(*) as count FROM project ", function(err, countRows, fields) {
                if (err) {
                    callback(null);
    //                throw err;
                }
                else{
                    if(countRows.length > 0){
                        callback(rows, countRows[0]['count']);
                    }
                    else{
                        callback({});
                    }
                }
            });
        }
    });
};


/** 查出我的下级发起人信息 */
exports.getMySales = function(salesId, limit, start, callback){
    callback = callback == null? nop:callback;
    var parm = [];
    var sql = 'SELECT * FROM salesman where 1=1 and inWeChatId = ? ';
    parm.push(salesId);
    if(!!limit && (start==0 || !!start)){
        sql += ' LIMIT ? , ?';
        parm.push(start);
        parm.push(limit);
    }
    sql = mysql.format(sql, parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        if(rows.length > 0){
            callback(rows);
        }
        else{
            callback({});
        }
    });
};

/** 查出发起人信息 */
exports.getSalesman = function(limit, start, name, phone, search, callback){
    callback = callback == null? nop:callback;
    var parm = [];
    var sql = 'SELECT * FROM salesman where 1=1  ';
    if(!!name && !search){
        sql += 'and name = ? ';
        parm.push(name);
    }
    if(!!phone && !search){
        sql += 'and phone = ? ';
        parm.push(phone);
    }
    if(!!search && !name && !phone){
        sql += ' name LIKE "%?%" ';
        parm.push(search);
    }
    if(!!limit && (start==0 || !!start)){
        sql += ' LIMIT ? , ?';
        parm.push(start);
        parm.push(limit);
    }
    sql = mysql.format(sql, parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{ /** 查询总数 */
        query("SELECT count(*) as count FROM salesman ", function(err, countRows, fields) {
            if (err) {
                callback(null);
                throw err;
            }
            else{
                if(countRows.length > 0){
                    callback(rows, countRows[0]['count']);
                }
                else{
                    callback(null);
                }
            }
        });
        }
    });
};

/** 查出广告信息 */
exports.getAdvert = function(limit, start, title, content, search, callback){
    callback = callback == null? nop:callback;
    var parm = [];
    var sql = 'SELECT * FROM advert where 1=1  ';
    if(!!title && !search){
        sql += 'and title = ? ';
        parm.push(title);
    }
    if(!!content && !search){
        sql += 'and content = ? ';
        parm.push(content);
    }
    if(!!search && !title && !content){
        sql += ' content LIKE "%?%" ';
        parm.push(search);
    }
    if(!!limit && (start==0 || !!start)){
        sql += ' LIMIT ? , ?';
        parm.push(start);
        parm.push(limit);
    }
    sql = mysql.format(sql, parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{ /** 查询总数 */
        query("SELECT count(*) as count FROM advert ", function(err, countRows, fields) {
            if (err) {
                callback(null);
                throw err;
            }
            else{
                if(countRows.length > 0){
                    callback(rows, countRows[0]['count']);
                }
                else{
                    callback(null);
                }
            }
        });
        }
    });
};


/** 根查出管理员信息 */
exports.getManager = function(limit, start, userName, type, search, callback){
    callback = callback == null? nop:callback;
    var parm = [];
    var sql = 'SELECT * FROM user where 1=1  ';
    if(!!userName && !search){
        sql += 'and username = ? ';
        parm.push(userName);
    }
    if(!!type && !search){
        sql += 'and type = ? ';
        parm.push(type);
    }
    if(!!search && !type && !userName){
        sql += ' username LIKE "%?%" ';
        parm.push(search);
    }
    if(!!limit && (start==0 || !!start)){
        sql += ' LIMIT ? , ?';
        parm.push(start);
        parm.push(limit);
    }
    sql = mysql.format(sql, parm);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{ /** 查询总数 */
            query("SELECT count(*) as count FROM user ", function(err, countRows, fields) {
                if (err) {
                    callback(null);
                    throw err;
                }
                else{
                    if(countRows.length > 0){
                        callback(rows, countRows[0]['count']);
                    }
                    else{
                        callback(null);
                    }
                }
            });
        }
    });
};


/** 查询权限信息 */
exports.getPower = function(callback){
    query("SELECT *  FROM power ", function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            if(rows.length > 0){
                callback(rows);
            }
            else{
                callback(null);
            }
        }
    });
};

/** 查询权限类型 */
exports.getPowerType = function(callback){
    query("SELECT type FROM power ", function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else{
            if(rows.length > 0){
                var types=[];
                for(var i in rows){
                    types.push(rows[i].type);
                }
                callback(types);
            }
            else{
                callback(null);
            }
        }
    });
};

exports.query = query;