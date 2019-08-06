var crypto = require('crypto');
var CryptoJS = require('crypto-js');

var key = CryptoJS.enc.Utf8.parse("0880076B18D7EE81"); // 加密秘钥
var iv = CryptoJS.enc.Utf8.parse("CB3EC842D7C69578");  //  矢量

//aes 加密
exports.enCode = function(message){
    var encrypt = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(key), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7  // 后台用的是pad.Pkcs5,前台对应为Pkcs
    });
    return CryptoJS.enc.Base64.stringify(encrypt.ciphertext);
}

//aes 解密
exports.decCode = function(message){
    var decrypt = CryptoJS.AES.decrypt(message, CryptoJS.enc.Utf8.parse(key), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var uncrypted=decrypt.toString(CryptoJS.enc.Utf8);
//    var uncryptedNum = parseInt(uncrypted);
//    if(uncryptedNum==0 || uncryptedNum){
//        uncrypted = uncryptedNum;
//    }
    return uncrypted;

}


//// 非对称 加密方法
exports.encrypt = function(data, key) {
    // 注意，第二个参数是Buffer类型
    return crypto.publicEncrypt(key, Buffer.from(data));
};

// 非对称 解密方法
exports.decrypt = function(encrypted, key){
    // 注意，encrypted是Buffer类型
    return crypto.privateDecrypt(key, encrypted);
};

exports.md5 = function (content) {
	var md5 = crypto.createHash('md5');
	md5.update(content);
	return md5.digest('hex');
}

exports.toBase64 = function(content){
	return new Buffer(content).toString('base64');
}

exports.fromBase64 = function(content){
	return new Buffer(content, 'base64').toString();
}


