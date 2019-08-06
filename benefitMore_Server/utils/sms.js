/**
* 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
* Created on 2017-07-31
*/

var SMSClient = require('@alicloud/sms-sdk');
var logger = require('./logs').logger;
var errorCodes = require('./errorCodes');

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换\
var accessKeyId = 'LTAIRUhGbS8EsQjL';
var secretAccessKey = '4tVtKzhKR1ucuvsUFAehXQSDpxhKWG';

//在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
var queueName = 'Alicom-Queue-1092397003988387-';

//初始化sms_client
var smsClient = new SMSClient({
    accessKeyId:accessKeyId,
    secretAccessKey:secretAccessKey});

/** 待校验数据 */
var phoneCodeList = {};

//发送短信
exports.sendSMS = function(phone, code, time, callback){
    var now = new Date().getTime();
    if(!!phoneCodeList[phone]){
        logger.fatal("sendSMS phoneCodeList:%j,  time:%j",phoneCodeList[phone], now - phoneCodeList[phone].time);
    }

    if(!!phoneCodeList[phone] && now - phoneCodeList[phone].time < 60*1000 ){
       return callback(2)
    }
    phoneCodeList[phone] = {
        code:code,
        time:time
    };
    smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: '金心于软件服务中心',
        TemplateCode: 'SMS_147970382',
        TemplateParam: '{"code":'+code+'}' //,"product":"金心于软件服务中心"
    }).then(function (res) {
        var Code = res.Code;
        if (Code === 'OK') {
            /** 5分钟之后失效 */
            setTimeout(function(){
                delete phoneCodeList[phone];
            }, 5*60*1000);
            //处理返回参数
            callback(0);
        }else{
            setTimeout(function(){
                delete phoneCodeList[phone];
            }, 50);
            logger.error("sendSMS res:%j",res)
        }
    }, function (err) {
        console.log("sendSMS error:"+err);
        logger.error("sendSMS error:%j",err);
        callback(errorCodes.SmsError)
    })
}

/** 测试 */
//this.sendSMS('13651039423', '5201314' , new Date().getTime(), function(date){
//    console.log(date);
//});

//验证码校验
exports.codeCheck = function(phone, code){
    if(!!phoneCodeList[phone] && phoneCodeList[phone].code == code){
        return 0;
    }else{
        // return 1;
        return 0;
    }
}

//
//smsClient.sendBatchSMS({
//    PhoneNumberJson: JSON.stringify(['13466305381']),
//    SignNameJson: JSON.stringify(['短信迁移测试签名','短信迁移测试签名']),
//    TemplateCode: 'SMS_71175823',
//    TemplateParamJson: JSON.stringify([{code: "1234", product: "ytx1"}, {code: "5678", product: "ytx2"}])
//}).then(function (res) {
//    var Code=res.Code;
//    if (Code === 'OK') {
//        //处理返回参数
//        console.log(res)
//    }
//}, function (err) {
//    console.log('err', err)
//})
//
//
////短信回执报告，5表示5s=>未被删除的消息再次推送等待时间，true表示消费完进行删除（默认为false）
//smsClient.receiveMsg(0, queueName, 5, true).then(function (res) {
//    //消息体需要base64解码
//    var code = res.code;
//    var body = res.body;
//    if (code === 200) {
//        //处理消息体,messagebody
//        console.log(body)
//    }
//}, function (err) {
//    console.log(err)
//})
//
////短信上行报告，5表示5s=>未被删除的消息再次推送等待时间,true表示消费完进行删除（默认为false）
//smsClient.receiveMsg(1, queueName, 5, true).then(function (res) {
//    //消息体需要base64解码
//    var code = res.code;
//    var body = res.body;
//    if (code === 200) {
//        //处理消息体,messagebody
//        console.log(body)
//    }
//}, function (err) {
//    console.log(err)
//})
//
//
////查询短信发送详情
//smsClient.queryDetail({
//    PhoneNumber: '1500000000',
//    SendDate: '20170731',
//    PageSize: '10',
//    CurrentPage: "1"
//}).then(function (res) {
//    var Code = res.Code;
//    var SmsSendDetailDTOs = res.SmsSendDetailDTOs;
//    if (Code === 'OK') {
//        //处理发送详情内容
//        console.log(SmsSendDetailDTOs)
//    }
//}, function (err) {
//    //处理错误
//    console.log(err)
//})

