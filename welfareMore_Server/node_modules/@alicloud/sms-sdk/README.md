### 安装

``` javascript
 $ npm install @alicloud/sms-sdk --save
```

### 使用方法
1. 安装@alicloud/sms-sdk,请需要根据官方文档做一些配置
2. 产品文档: https://dysms.console.aliyun.com/dysms.htm
3. Node.js版本 >= v7.6.0

### DEMO

``` javascript
/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */

const SMSClient = require('@alicloud/sms-sdk')

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'yourAccessKeyId'
const secretAccessKey = 'yourAccessKeySecret'

//在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
const queueName = 'Alicom-Queue-1092397003988387-'

//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

smsClient.sendBatchSMS({
    PhoneNumberJson: JSON.stringify(['18040580000', '15088650000']),
    SignNameJson: JSON.stringify(['短信迁移测试签名','短信迁移测试签名']),
    TemplateCode: 'SMS_71175823',
    TemplateParamJson: JSON.stringify([{code: "1234", product: "ytx1"}, {code: "5678", product: "ytx2"}]),
}).then(function (res) {
    let {Code}=res
    if (Code === 'OK') {
       //处理返回参数
       console.log(res)
    }
}, function (err) {
    console.log('err', err)
})


//短信回执报告，5表示5s=>未被删除的消息再次推送等待时间，true表示消费完进行删除（默认为false）
smsClient.receiveMsg(0, queueName, 5, true).then(function (res) {
    //消息体需要base64解码
    let {code, body}=res
    if (code === 200) {
        //处理消息体,messagebody
        console.log(body)
    }
}, function (err) {
    console.log(err)
})

//短信上行报告，5表示5s=>未被删除的消息再次推送等待时间,true表示消费完进行删除（默认为false）
smsClient.receiveMsg(1, queueName, 5, true).then(function (res) {
    //消息体需要base64解码
    let {code, body}=res
    if (code === 200) {
        //处理消息体,messagebody
        console.log(body)
    }
}, function (err) {
    console.log(err)
})


//查询短信发送详情
smsClient.queryDetail({
    PhoneNumber: '1500000000',
    SendDate: '20170731',
    PageSize: '10',
    CurrentPage: "1"
}).then(function (res) {
    let {Code, SmsSendDetailDTOs}=res
    if (Code === 'OK') {
        //处理发送详情内容
        console.log(SmsSendDetailDTOs)
    }
}, function (err) {
    //处理错误
    console.log(err)
})

//发送短信
smsClient.sendSMS({
    PhoneNumbers: '1500000000',
    SignName: '云通信产品',
    TemplateCode: 'SMS_000000',
    TemplateParam: '{"code":"12345","product":"云通信"}'
}).then(function (res) {
    let {Code}=res
    if (Code === 'OK') {
        //处理返回参数
        console.log(res)
    }
}, function (err) {
    console.log(err)
})
```
