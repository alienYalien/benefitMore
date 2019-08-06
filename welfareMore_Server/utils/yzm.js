/**
 * Created by bl on 2016/8/2.
 */
/**
 * 图片验证码
 * @param req
 * @param res
 * @param next
 */
var captchapng = require('captchapng');
var yzm = module.exports = {};

yzm.randomcodePngController = function(req , res , next){
    var code = '0123456789';
    var length = 4;
    var randomcode = '';
    for (var i = 0; i < length; i++) {
        randomcode += code[parseInt(Math.random() * 1000) % code.length];
        if(i==0 && randomcode==0){
            randomcode="1";
        }
    }
    // 保存到session
    if (null == req.session[req.session.id]) {
        req.session[req.session.id] = {};
    }
    req.session[req.session.id] = randomcode;
    // 输出图片
    var p = captchapng(80,30,randomcode); // width,height,numeric captcha
    p.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
};

