
'use strict';

const { RPCClient } = require('@alicloud/pop-core');

function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

class Client extends RPCClient {
  constructor(config) {
    config.apiVersion = '2017-05-25';
    super(config);
  }

  /**
   * @param {String} AccessKeyId - appKey. optional.
   * @param {String} Action - apiName. optional.
   * @param {Long} OwnerId - ownerId. optional.
   * @param {String} ResourceOwnerAccount - resourceOwnerAccount. optional.
   * @param {Long} ResourceOwnerId - resourceOwnerId. optional.
   * @param {String} CountryName - countryName. optional.
   */
  queryInterSmsIsoInfo(params = {}, options = {}) {
    return this.request('QueryInterSmsIsoInfo', params, options);
  }

  /**
   * @param {String} AccessKeyId - appKey. optional.
   * @param {String} Action - apiName. optional.
   * @param {Long} OwnerId - ownerId. optional.
   * @param {String} ResourceOwnerAccount - resourceOwnerAccount. optional.
   * @param {Long} ResourceOwnerId - resourceOwnerId. optional.
   * @param {String} PhoneNumber - phoneNumber. required.
   * @param {String} BizId - bizId. optional.
   * @param {String} SendDate - sendDate. required.
   * @param {Long} PageSize - pageSize. required.
   * @param {Long} CurrentPage - currentPage. required.
   */
  querySendDetails(params = {}, options = {}) {
    if (!hasOwnProperty(params, 'PhoneNumber')) {
      throw new TypeError('parameter "PhoneNumber" is required');
    }

    if (!hasOwnProperty(params, 'SendDate')) {
      throw new TypeError('parameter "SendDate" is required');
    }

    if (!hasOwnProperty(params, 'PageSize')) {
      throw new TypeError('parameter "PageSize" is required');
    }

    if (!hasOwnProperty(params, 'CurrentPage')) {
      throw new TypeError('parameter "CurrentPage" is required');
    }

    return this.request('QuerySendDetails', params, options);
  }

  /**
   * @param {String} AccessKeyId - appKey. optional.
   * @param {String} Action - apiName. optional.
   * @param {Long} OwnerId - ownerId. optional.
   * @param {String} ResourceOwnerAccount - resourceOwnerAccount. optional.
   * @param {Long} ResourceOwnerId - resourceOwnerId. optional.
   * @param {String} PhoneNumberJson - phoneNumberJson. required.
   * @param {String} SignNameJson - signNameJson. required.
   * @param {String} TemplateCode - templateCode. required.
   * @param {String} templateParamJson - templateParamJson. optional.
   * @param {String} TemplateParamJson - templateParamJsonNew. optional.
   * @param {String} SmsUpExtendCodeJson - smsUpExtendCodeJson. optional.
   */
  sendBatchSms(params = {}, options = {}) {
    if (!hasOwnProperty(params, 'PhoneNumberJson')) {
      throw new TypeError('parameter "PhoneNumberJson" is required');
    }

    if (!hasOwnProperty(params, 'SignNameJson')) {
      throw new TypeError('parameter "SignNameJson" is required');
    }

    if (!hasOwnProperty(params, 'TemplateCode')) {
      throw new TypeError('parameter "TemplateCode" is required');
    }

    return this.request('SendBatchSms', params, options);
  }

  /**
   * @param {String} AccessKeyId - appKey. optional.
   * @param {String} Action - apiName. optional.
   * @param {Long} OwnerId - ownerId. optional.
   * @param {String} ResourceOwnerAccount - resourceOwnerAccount. optional.
   * @param {Long} ResourceOwnerId - resourceOwnerId. optional.
   * @param {String} CountryCode - countryCode. required.
   * @param {String} PhoneNumbers - phoneNumbers. required.
   * @param {String} SignName - signName. required.
   * @param {String} TemplateCode - templateCode. required.
   * @param {String} TemplateParam - templateParam. optional.
   * @param {String} OutId - outId. optional.
   */
  sendInterSms(params = {}, options = {}) {
    if (!hasOwnProperty(params, 'CountryCode')) {
      throw new TypeError('parameter "CountryCode" is required');
    }

    if (!hasOwnProperty(params, 'PhoneNumbers')) {
      throw new TypeError('parameter "PhoneNumbers" is required');
    }

    if (!hasOwnProperty(params, 'SignName')) {
      throw new TypeError('parameter "SignName" is required');
    }

    if (!hasOwnProperty(params, 'TemplateCode')) {
      throw new TypeError('parameter "TemplateCode" is required');
    }

    return this.request('SendInterSms', params, options);
  }

  /**
   * @param {String} AccessKeyId - appKey. optional.
   * @param {String} Action - apiName. optional.
   * @param {Long} OwnerId - ownerId. optional.
   * @param {String} ResourceOwnerAccount - resourceOwnerAccount. optional.
   * @param {Long} ResourceOwnerId - resourceOwnerId. optional.
   * @param {String} PhoneNumberJson - phoneNumberJson. required.
   * @param {String} SignNameJson - signNameJson. required.
   * @param {String} TemplateCode - templateCode. required.
   * @param {String} templateParamJson - templateParamJson. optional.
   * @param {String} SmsUpExtendCodeJson - smsUpExtendCodeJson. optional.
   */
  sendPersonalSms(params = {}, options = {}) {
    if (!hasOwnProperty(params, 'PhoneNumberJson')) {
      throw new TypeError('parameter "PhoneNumberJson" is required');
    }

    if (!hasOwnProperty(params, 'SignNameJson')) {
      throw new TypeError('parameter "SignNameJson" is required');
    }

    if (!hasOwnProperty(params, 'TemplateCode')) {
      throw new TypeError('parameter "TemplateCode" is required');
    }

    return this.request('SendPersonalSms', params, options);
  }

  /**
   * @param {String} AccessKeyId - appKey. optional.
   * @param {String} Action - apiName. optional.
   * @param {Long} OwnerId - ownerId. optional.
   * @param {String} ResourceOwnerAccount - resourceOwnerAccount. optional.
   * @param {Long} ResourceOwnerId - resourceOwnerId. optional.
   * @param {String} PhoneNumbers - phoneNumbers. required.
   * @param {String} SignName - signName. required.
   * @param {String} TemplateCode - templateCode. required.
   * @param {String} TemplateParam - templateParam. optional.
   * @param {String} SmsUpExtendCode - smsUpExtendCode. optional.
   * @param {String} OutId - outId. optional.
   */
  sendSms(params = {}, options = {}) {
    if (!hasOwnProperty(params, 'PhoneNumbers')) {
      throw new TypeError('parameter "PhoneNumbers" is required');
    }

    if (!hasOwnProperty(params, 'SignName')) {
      throw new TypeError('parameter "SignName" is required');
    }

    if (!hasOwnProperty(params, 'TemplateCode')) {
      throw new TypeError('parameter "TemplateCode" is required');
    }

    return this.request('SendSms', params, options);
  }

}

module.exports = Client;
