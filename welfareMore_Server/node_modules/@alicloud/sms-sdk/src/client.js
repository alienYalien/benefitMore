/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     sms-sdk
 * @authors:  qiankun <chuck.ql@alibaba-inc.com> (https://work.alibaba-inc.com/work/u/85053)
 * @date      18/1/31
 */

'use strict';
const DysmsapiClient = require('@alicloud/dysmsapi-2017-05-25')
const DybaseapiClient = require('@alicloud/dybaseapi')
const MNSClient = require('@alicloud/mns')
// 短信回执报告：SmsReport，短信上行：SmsUp
const msgTypeList = ["SmsReport", "SmsUp"]
const DYSMSAPI_ENDPOINT = 'http://dysmsapi.aliyuncs.com'
const DYBASEAPI_ENDPOINT = 'http://dybaseapi.aliyuncs.com'

function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

class SMSClient {
  constructor(options) {
    let { accessKeyId, secretAccessKey } = options
    if (!accessKeyId) {
      throw new TypeError('parameter "accessKeyId" is required')
    }
    if (!secretAccessKey) {
      throw new TypeError('parameter "secretAccessKey" is required')
    }
    this.dysmsapiClient = new DysmsapiClient({ accessKeyId, secretAccessKey, endpoint: DYSMSAPI_ENDPOINT })
    this.dybaseClient = new DybaseapiClient({ accessKeyId, secretAccessKey, endpoint: DYBASEAPI_ENDPOINT })
    this.expire = []
    this.mnsClient = []
  }

  //群发短信
  sendBatchSMS(params) {
    return this.dysmsapiClient.sendBatchSms(params, { formatParams: false })
  }

  //发送短信
  sendSMS(params) {
    return this.dysmsapiClient.sendSms(params)
  }

  //查询详情
  queryDetail(params) {
    return this.dysmsapiClient.querySendDetails(params)
  }

  //失效时间与当前系统时间比较，提前2分钟刷新token
  _refresh(type) {
    return this.expire[type] - new Date().getTime() > 2 * 60 * 1000
  }

  //获取token
  _getToken(type) {
    let msgType = msgTypeList[type]
    return this.dybaseClient.queryTokenForMnsQueue({ MessageType: msgType })
  }

  //根据类型获取mnsclient实例
  async _getMNSClient(type) {
    if (this.mnsClient && (this.mnsClient[type] instanceof MNSClient) && this._refresh(type)) {
      return this.mnsClient[type]
    }
    let {
      MessageTokenDTO: {
        SecurityToken,
        AccessKeyId,
        AccessKeySecret
      }
    } = await this._getToken(type)
    if (!(AccessKeyId && AccessKeySecret && SecurityToken)) {
      throw new TypeError('get token fail')
    }
    let mnsClient = new MNSClient('1943695596114318', {
      securityToken: SecurityToken,
      region: 'cn-hangzhou',
      accessKeyId: AccessKeyId,
      accessKeySecret: AccessKeySecret,
      // optional & default
      secure: false, // use https or http
      internal: false, // use internal endpoint
      vpc: false // use vpc endpoint
    })
    this.mnsClient[type] = mnsClient
    this.expire[type] = (new Date().getTime() + 10 * 60 * 1000)
    return mnsClient
  }

  //typeIndex :0 为回执,1为上行
  async receiveMsg(typeIndex = 0, preQueueName, waitSeconds = 10, isDel = false) {
    const queueName = preQueueName + msgTypeList[typeIndex]
    let mnsClient = await this._getMNSClient(typeIndex)
    const res = await mnsClient.receiveMessage(queueName, waitSeconds)
    const { code, body: { ReceiptHandle } } = res;
    if (isDel && code === 200 && ReceiptHandle) {
      await mnsClient.deleteMessage(queueName, ReceiptHandle)
    }
    return res;
  }
}

module.exports = SMSClient




