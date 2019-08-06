/**
 * Created by chen on 16-3-12.
 */


var util = require('util');
var path = require('path');
var crypto = require('crypto');
var logger = require('./logs').logger;

//var _ = require('underscore');
//var TimeExpression = require('./expression/timeExpression');
//var Q = require('q');

var utils = module.exports = {};


utils.trim = function(str)
{
    return str.replace(/(^\s*)|(\s*$)/g, "");
}


/** 权限判断是否足够 */
utils.checkPower = function(userPower, power){
    return userPower.indexOf(power) != -1 ? true : false;
}

/** 罗马时间转换成 标准格式 yyyy mm dd*/
utils.fermitTime = function(time){
    var now = new Date(time);
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var date= now.getDate();
    var h =  now.getHours(); //hour
    var m = now.getMinutes(); //minute
    var s = now.getSeconds(); //second
    if(mon<10){
        mon = '0'+mon;
    };
    if(date<10){
        date = '0'+date;
    }
    var postDate = year+'-'+mon+'-'+date+" "+ h+':'+m+':'+s;
    return postDate;
}

//md5加密
utils.md5 = function(text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

utils.key = "Password@01";
utils.vi = "Password@01";
//des加密
utils.cipheriv = function (en, code, data) {
    var buf1 = en.update(data, code), buf2 = en.final();
    var r = new Buffer(buf1.length + buf2.length);
    buf1.copy(r); buf2.copy(r, buf1.length);
    return r;
};
utils.EncryptDES=function (data) {
    return this.cipheriv(crypto.createCipheriv('des', '12345678',  '12345678'), 'utf8', data).toString('base64');
};


//des解密
utils.DecryptDES = function (data) {
    return this.cipheriv(crypto.createDecipheriv('des', '12345678',  '12345678'), 'base64', data) .toString('utf8');
};

utils.Count = function(o){
    var t = typeof o;
    if(t == 'string'){
        return o.length;
    }
    else if(t == 'object'){
        var n = 0;
        for(var i in o){
            n++;
        }
        return n;
    }
    return false;
};

utils.getDayOfYear = function (date) {
    var d = new Date(date.getFullYear(), 0, 0);
    return Math.floor((date - d) / 8.64e+7);
};

utils.getDayOfHistory = function (date) {
    return Math.floor((date - date.getTimezoneOffset() * 60000) / 8.64e+7);
};

utils.getDayOfDiff = function (left, right) {
    return Math.floor((left - left.getTimezoneOffset() * 60000) / 8.64e+7)
        - Math.floor((right - right.getTimezoneOffset() * 60000) / 8.64e+7);
};

utils.getWeekOfYear = function (date) {
    var d = new Date(date.getFullYear(), 0, 0);
    d -= d.getDay() * 8.64e+7;

    return Math.ceil((date - d) / (8.64e+7 * 7));
};

utils.getWeekOfHistory = function (date) {
    var history = new Date(0);
    var d = utils.getDayOfHistory(history) - history.getDay();

    return Math.ceil((utils.getDayOfHistory(date) - d) / 7);
};

utils.getWeekOfDiff = function (left, right) {
    return utils.getWeekOfHistory(left)
        - utils.getWeekOfHistory(right);
};

utils.packWithDay = function (value) {
    return utils.getDayOfYear(new Date()) * 100 + value;
};

utils.unpackWithDay = function (value) {
    return utils.getDayOfYear(new Date()) == Math.floor(value / 100) ? value % 100 : 0;
};

utils.unpackAttackNumWithDay = function (value) {
    return utils.getDayOfYear(new Date()) == Math.floor(value / 100) ? value % 100 : 3;
};

utils.values = function (obj) {
    var values = [];
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            values.push(obj[k]);
        }
    }
    return values;
};

utils.keys = function (obj) {
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keys = [];
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    return keys;
};

utils.getErrorMessage = function (obj) {
    if (!obj) {
        return obj;
    }

    if (typeof obj === 'object' && 'stack' in obj) {
        return obj.stack;
    }

    if (typeof obj === 'object') {
        return util.inspect(obj, {depth: 10});
    }

    return obj;
};

utils.indexOfErrorMessage = function (obj, message) {
    if (typeof obj === 'object' && 'stack' in obj && typeof obj.stack === 'string') {
        return obj.stack.indexOf(message);
    }
    return -1;
};

utils.profiler = function (msg) {
    return new function () {
        var self = this;

        self.message = msg;

        self.begin = process.hrtime();

        self.check = function (threshold, output) {
            var end = process.hrtime(self.begin);
            if (threshold > end[0] + end[1] / 1000000000) {
                return;
            }
            var args = Array.prototype.slice.call(arguments, 1);
            var print = console;
            if (!!output && 'warn' in output && typeof output.warn === 'function') {
                print = output;
                args.shift();
            }

            args[0] = 'running cost: %ss ' + args[0];
            args.splice(1, 0, end[0] + end[1] / 1000000000);

            print.warn.apply(null, args);
        };

        self.elapsed = function () {
            var end = process.hrtime(self.begin);
            return end[0] + end[1] / 1000000000;
        };

        self.extendMessage = function (msg) {
            return _.extend(self.message, msg);
        };
    };
};

utils.done = function (err) {
    if (!!err) {
        logger.error('callback error: %s', utils.getErrorMessage(err));
    }
};

/**
 * Check and invoke callback
 */
utils.invokeCallback = function (cb) {
    if (!!cb && typeof cb === 'function') {
        cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
};

utils.randomAtoB = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
};

utils.DateAddDays = function (sdate, days) {
    var d = new Date(sdate).valueOf() + days * 24 * 60 * 60 * 1000;
    return new Date(d);
};

utils.GetDateNYR = function (dateTime, timeMode) {
    var dateTime = new Date(dateTime);
    var year = dateTime.getFullYear();
    var mouth = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    if(timeMode){
        return util.format("%d-%d-%d 00:00:00", year, mouth, day);
}
    return util.format("%d-%d-%d", year, mouth, day);

};

utils.waitingFor = function (checking, delay, callback) {
    callback = callback || delay;
    delay = _.isFunction(delay) ? 1 : delay;

    if (checking()) {
        return utils.invokeCallback(callback);
    }

    return setTimeout(function () {
        utils.waitingFor(checking, delay, callback);
    }, delay * 1000);
};



/**
 * 获取当月最大天数
 * @return {number}
 * */
utils.curMaxDay = function () {
    return this.maxDay(new Date().getMonth() + 1);
};

/**
 * 获取一个月最大天数
 * @param {number} month 指定月份
 * @return {number}
 * */
utils.maxDay = function (month) {
    var d = new Date();
    return new Date(d.getFullYear(), month, 0).getDate();
};

/**
 * 是否是一个月最后一天
 * @return {boolean}
 * */
utils.isLastDayInMonth = function () {
    var d = new Date().getDate();
    return this.curMaxDay() == (d + 1);
};

/**
 * 获取指定日期的月份 格式(2014-10)
 * @param {Date} date 指定日期
 * @return {string}
 * */
utils.getMonthOfYear = function (date) {
    date = date || new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return year + '-' + month;
};

/**
 * 获取指定日期的月份 格式(201410: year * 100 + month)
 * @param {Date} date 指定日期
 * @return {number}
 * */
utils.getMonthOfYear2 = function (date) {
    date = date || new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return (year * 100) + month;
};

/**
 * @Brief: 获取上个月指定日期的月份 格式(201410: year * 100 + month)
 *
 * @param {Date} date 指定日期
 * @return {number}
 * */
utils.getPreMonthOfYear = function(date) {

    date = date || new Date();
    date.setMonth(date.getMonth() - 1);
    return utils.getMonthOfYear2(date);
};

/**
 * @Brief: 获取上两个月指定日期的月份 格式(201410: year * 100 + month)
 *
 * @param {Date} date 指定日期
 * @return {number}
 * */
utils.getFirstTwoMonthOfYear = function(date) {

    date = date || new Date();
    date.setMonth(date.getMonth() - 2);
    return utils.getMonthOfYear2(date);
};

/**
 * 字符串转时间（yyyy-MM-dd HH:mm:ss）
 * result （分钟）
 */
utils.stringToDate = function(fDate){
    if(!fDate || typeof(fDate)=="undefined" || fDate == 0 || fDate.valueOf(" ") == -1){
        return new Date(0);
    }
    var fullDate = fDate.split(" ")[0].split("-");

    return new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0);
}

utils.dateString = function (time) {
    if (time == null) {
        var dateTime = new Date();
    } else {
        var dateTime = new Date(time);
    }
    return dateFormat(dateTime, "yyyy-MM-dd hh:mm:ss");
};

var dateFormat = function (dateTime, fmt) {
    var o = {
        "M+": dateTime.getMonth() + 1,
        "d+": dateTime.getDate(),
        "h+": dateTime.getHours(),
        "m+": dateTime.getMinutes(),
        "s+": dateTime.getSeconds(),
        "q+": Math.floor((dateTime.getMonth() + 3) / 3),
        "S": dateTime.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
                                         (("00" + o[k]).substr((""
                                             + o[k]).length)));
        }
    }
    return fmt;
};

/**
 * 获取当前时间 单位毫秒
 *
 * @return {Number}
 * */
utils.getCurTime = function () {
    return new Date().getTime();
};

/**
 * 获取当前时间 单位分钟
 *
 * @return {Number}second
 * */
utils.getCurMinute = function () {
    return Math.floor(utils.getCurSecond() / 60);
};

/**
 * 获取当前时间 单位秒
 *
 * @return {Number}
 * */
utils.getCurSecond = function () {
    return Math.floor(utils.getCurTime() / 1000);
};

/**
 * 是否是同一天
 *
 * @param {Number} goalSec 目标时间 （毫秒）
 * @param {Number} originSec 源时间  （毫秒）
 * @return {Boolean}
 * */
utils.isTheSameDay = function (goalSec, originSec) {
    originSec = originSec - 3*60*60*1000;
    var goalData = new Date(goalSec);
    var originData = new Date(originSec);

    /** 如果是12点到3点  会拿今天时间和昨天比较~ 无限领取 */
    if(goalData.getTime() > originData.getTime()){
        return true;
    }
    return goalData.getFullYear() == originData.getFullYear()
               && goalData.getMonth() == originData.getMonth()
        && goalData.getDate() == originData.getDate();
};

/**
 * 是否是同一月
 *
 * @param {Number} goalSec 目标时间 （毫秒）
 * @param {Number} originSec 源时间  （毫秒）
 * @return {Boolean}
 * */
utils.isTheSameMonth = function (goalSec, originSec) {

    var goalData = new Date(goalSec);
    var originData = new Date(originSec);

    return goalData.getFullYear() == originData.getFullYear()
               && goalData.getMonth() == originData.getMonth();
};

/**
 * 将分钟 转换成 毫秒
 *
 * @param {Number}  minute 分钟
 * @return {Number} sec
 * */
utils.minuteToSec = function (minute) {
    return utils.secondToSec(minute) * 60;
};

/**
 * 将分钟 转换成 秒
 *
 * @param {Number}  minute 分钟
 * @return {Number} sec
 * */
utils.minuteToSecond = function (minute) {
    return minute * 60;
};

/**
 * 将秒 转换成 毫秒
 *
 * @param {Number} second 秒
 * @return {Number} sec
 * */
utils.secondToSec = function (second) {
    return second * 1000;
};

/**
 * 获取各个区服大区id
 *
 * @param {Number} serverUID 各区大区UID
 * @return {Number} region 大区id
 * */
utils.getRegionID = function (serverUID) {
    var regionID = Math.floor(serverUID / 1000);
    return regionID;
};

/**
 * 获取各个区服大区name
 *
 * @param {Number} serverUID 各区大区UID
 * @return {String} region 大区id
 * */
utils.getRegionName = function (serverUID) {
    var regionID = Math.floor(serverUID / 1000);

    var id = serverUID % 1000;

    id = +id > 100 ? id - 100 : id;

    var name = null;

    if (regionID == 1) {
        name = 'QQ' + id + '服';
    } else if (regionID == 2) {
        name = 'QQ' + id + '服';
    } else if (regionID == 3) {
        name = '微信' + id + '服';
    } else if (regionID == 4) {
        name = '微信' + id + '服';
    } else {
        name = '测试' + id + '服';
    }

    return name;
};

/**
 * @return {number}
 */
utils.GetVipLvByPoint = function (point) {
    var vipList = [60, 100, 300, 500, 1000, 2000, 3000, 5000, 7000, 10000, 15000, 20000, 40000, 80000, 150000];
    for (var i = 0; i < 15; ++i) {
        if (point < vipList[i]) {
            return i;
        }
    }
    return 15;
};

utils.getFilenameLine = function () {
    var e = new Error();
    // now magic will happen: get line number from callstack

    var line = '';
    if (process.platform.match(/^win/)) {
        line = e.stack.split('\n')[2].split('\\');
        return '(' + line[line.length - 1] + ')';
    }
    else {
        line = e.stack.split('\n')[2].split('/');
        return '(' + line[line.length - 1];
    }
};

utils.getLine = function () {
    var e = new Error();
    // now magic will happen: get line number from callstack

    return e.stack.split('\n')[3].split(':')[process.platform.match(/^win/) ? 2 : 1];
};

/**
 * Check a string whether ends with another string
 */
utils.endsWith = function (str, suffix) {
    if (typeof str !== 'string' || typeof suffix !== 'string' ||
        suffix.length > str.length) {
        return false;
    }
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

/**
 * Check a string whether starts with another string
 */
utils.startsWith = function (str, prefix) {
    if (typeof str !== 'string' || typeof prefix !== 'string' ||
        prefix.length > str.length) {
        return false;
    }

    return str.indexOf(prefix) === 0;
};

/**
 * 2|1002 1000|1002 2000|
 * @param str
 * @param keys
 * @returns {boolean}
 */
utils.strToArray = function (str, keys) {

    if (_.isString(str)) {

        var list = str.split('|');
        list = list.slice(1, list.length - 1);

        return _.map(list, function (item) {
            return _.object(keys, item.split(' '));
        });
    }

    return [];
};


/**
 *  随机获得一个小标， 及对应的数量: [index, num]
 * @param percents
 * @param mins
 * @param maxs
 */
utils.getOne = function (percents, mins, maxs) {
    //获得分布
    var distribution = percents.slice(0); //复制percents
    for (var i = 1; i < distribution.length; i++) {
        distribution[i] += distribution[i - 1];
    }

    //随机
    var index = 0, num = 0;
    var rand = Math.random() * 100;
    for (var i = 0; i < distribution.length; i++) {
        if (distribution[i] >= rand) {
            index = i;
            num = utils.randomAtoB(mins[i], maxs[i]);
            break;
        }
    }

    //默认返回
    return [index, num];
};

/**
 * 返回一个随机数组, 长度和percents一样长
 * @param percents 概率数组
 * @param mins  最小数量数组
 * @param maxs  最大数组
 */
utils.getEach = function (percents, mins, maxs) {
    var nums = [];
    for (var i = 0; i < percents.length; i++) {
        var rand = Math.random() * 100;
        if (rand <= percents[i]) {
            nums[nums.length] = utils.randomAtoB(mins[i], maxs[i]);
        } else {
            nums[nums.length] = 0;
        }
    }
    return nums;
};

/**使得sub继承sup的原型方法， 但是如果sub已经有该方法覆盖掉子类同名方法*/
utils.inheritsAll = function (sub, sup) {
    var supPrototype = sup.prototype;
    for (var id in supPrototype) {
        var att = supPrototype[id];
        sub.prototype[id] = att;
    }
};

/**
 * 检查元素obj是否在数组array里
 * 存在：  返回下标
 * 不存在：返回 -1
 * */
utils.arrayContains = function(array, obj) {
    var i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return i;
        }
    }
    return -1;
};

/**
 * 检查元素obj是否在map里
 * 存在：  返回key值（string）
 * 不存在：返回 null
 * */
utils.mapContains = function(map, obj) {
    for(var i in map) {
        if(map[i] === obj) {
            return i;
        }
    }
    return null;
}

// ===================================================================
// Author: Matt Kruse <matt@mattkruse.com>
// WWW: http://www.mattkruse.com/
//
// NOTICE: You may use this code for any purpose, commercial or
// private, without any further permission from the author. You may
// remove this notice from your final code if you wish, however it is
// appreciated by the author if at least my web site address is kept.
//
// You may *NOT* re-distribute this code in any way except through its
// use. That means, you can include it in your product, or your web
// site, or any other form where the code is actually being used. You
// may not put the plain javascript up on your site for download or
// include it in your javascript libraries for download.
// If you wish to share this code with others, please just point them
// to the URL instead.
// Please DO NOT link directly to my .js files from your site. Copy
// the files to your server and use them there. Thank you.
// ===================================================================

// HISTORY
// ------------------------------------------------------------------
// May 17, 2003: Fixed bug in parseDate() for dates <1970
// March 11, 2003: Added parseDate() function
// March 11, 2003: Added "NNN" formatting option. Doesn't match up
//                 perfectly with SimpleDateFormat formats, but
//                 backwards-compatability was required.

// ------------------------------------------------------------------
// These functions use the same 'format' strings as the
// java.text.SimpleDateFormat class, with minor exceptions.
// The format string consists of the following abbreviations:
//
// Field        | Full Form          | Short Form
// -------------+--------------------+-----------------------
// Year         | yyyy (4 digits)    | yy (2 digits), y (2 or 4 digits)
// Month        | MMM (name or abbr.)| MM (2 digits), M (1 or 2 digits)
//              | NNN (abbr.)        |
// Day of Month | dd (2 digits)      | d (1 or 2 digits)
// Day of Week  | EE (name)          | E (abbr)
// Hour (1-12)  | hh (2 digits)      | h (1 or 2 digits)
// Hour (0-23)  | HH (2 digits)      | H (1 or 2 digits)
// Hour (0-11)  | KK (2 digits)      | K (1 or 2 digits)
// Hour (1-24)  | kk (2 digits)      | k (1 or 2 digits)
// Minute       | mm (2 digits)      | m (1 or 2 digits)
// Second       | ss (2 digits)      | s (1 or 2 digits)
// AM/PM        | a                  |
//
// NOTE THE DIFFERENCE BETWEEN MM and mm! Month=MM, not mm!
// Examples:
//  "MMM d, y" matches: January 01, 2000
//                      Dec 1, 1900
//                      Nov 20, 00
//  "M/d/yy"   matches: 01/20/00
//                      9/2/00
//  "MMM dd, yyyy hh:mm:ssa" matches: "January 01, 2000 12:30:45AM"
// ------------------------------------------------------------------

var MONTH_NAMES = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                            'October', 'November', 'December', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                            'Sep', 'Oct', 'Nov', 'Dec');
var DAY_NAMES = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sun', 'Mon',
                          'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
function LZ(x) {
    return (x < 0 || x > 9 ? "" : "0") + x
}

// ------------------------------------------------------------------
// isDate ( date_string, format_string )
// Returns true if date string matches format of format string and
// is a valid date. Else returns false.
// It is recommended that you trim whitespace around the value before
// passing it to this function, as whitespace is NOT ignored!
// ------------------------------------------------------------------
function isDate(val, format) {
    var date = getDateFromFormat(val, format);
    if (date == 0) {
        return false;
    }
    return true;
}

// -------------------------------------------------------------------
// compareDates(date1,date1format,date2,date2format)
//   Compare two date strings to see which is greater.
//   Returns:
//   1 if date1 is greater than date2
//   0 if date2 is greater than date1 of if they are the same
//  -1 if either of the dates is in an invalid format
// -------------------------------------------------------------------
function compareDates(date1, dateformat1, date2, dateformat2) {
    var d1 = getDateFromFormat(date1, dateformat1);
    var d2 = getDateFromFormat(date2, dateformat2);
    if (d1 == 0 || d2 == 0) {
        return -1;
    }
    else if (d1 > d2) {
        return 1;
    }
    return 0;
}

// ------------------------------------------------------------------
// formatDate (date_object, format)
// Returns a date in the output format specified.
// The format string uses the same abbreviations as in getDateFromFormat()
// ------------------------------------------------------------------
function formatDate(date, format) {
    format = format + "";
    var result = "";
    var i_format = 0;
    var c = "";
    var token = "";
    var y = date.getYear() + "";
    var M = date.getMonth() + 1;
    var d = date.getDate();
    var E = date.getDay();
    var H = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
    // Convert real date parts into formatted versions
    var value = new Object();
    if (y.length < 4) {
        y = "" + (y - 0 + 1900);
    }
    value["y"] = "" + y;
    value["yyyy"] = y;
    value["yy"] = y.substring(2, 4);
    value["M"] = M;
    value["MM"] = LZ(M);
    value["MMM"] = MONTH_NAMES[M - 1];
    value["NNN"] = MONTH_NAMES[M + 11];
    value["d"] = d;
    value["dd"] = LZ(d);
    value["E"] = DAY_NAMES[E + 7];
    value["EE"] = DAY_NAMES[E];
    value["H"] = H;
    value["HH"] = LZ(H);
    if (H == 0) {
        value["h"] = 12;
    }
    else if (H > 12) {
        value["h"] = H - 12;
    }
    else {
        value["h"] = H;
    }
    value["hh"] = LZ(value["h"]);
    if (H > 11) {
        value["K"] = H - 12;
    } else {
        value["K"] = H;
    }
    value["k"] = H + 1;
    value["KK"] = LZ(value["K"]);
    value["kk"] = LZ(value["k"]);
    if (H > 11) {
        value["a"] = "PM";
    }
    else {
        value["a"] = "AM";
    }
    value["m"] = m;
    value["mm"] = LZ(m);
    value["s"] = s;
    value["ss"] = LZ(s);
    while (i_format < format.length) {
        c = format.charAt(i_format);
        token = "";
        while ((format.charAt(i_format) == c) && (i_format < format.length)) {
            token += format.charAt(i_format++);
        }
        if (value[token] != null) {
            result = result + value[token];
        }
        else {
            result = result + token;
        }
    }
    return result;
}

// ------------------------------------------------------------------
// Utility functions for parsing in getDateFromFormat()
// ------------------------------------------------------------------
function _isInteger(val) {
    var digits = "1234567890";
    for (var i = 0; i < val.length; i++) {
        if (digits.indexOf(val.charAt(i)) == -1) {
            return false;
        }
    }
    return true;
}
function _getInt(str, i, minlength, maxlength) {
    for (var x = maxlength; x >= minlength; x--) {
        var token = str.substring(i, i + x);
        if (token.length < minlength) {
            return null;
        }
        if (_isInteger(token)) {
            return token;
        }
    }
    return null;
}

// ------------------------------------------------------------------
// getDateFromFormat( date_string , format_string )
//
// This function takes a date string and a format string. It matches
// If the date string matches the format string, it returns the
// getTime() of the date. If it does not match, it returns 0.
// ------------------------------------------------------------------
utils.getDateFromFormat = function (val, format) {
    val = val + "";
    format = format + "";
    var i_val = 0;
    var i_format = 0;
    var c = "";
    var token = "";
    var token2 = "";
    var x, y;
    var now = new Date();
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = 1;
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    var ampm = "";

    while (i_format < format.length) {
        // Get next token from format string
        c = format.charAt(i_format);
        token = "";
        while ((format.charAt(i_format) == c) && (i_format < format.length)) {
            token += format.charAt(i_format++);
        }
        // Extract contents of value based on format token
        if (token == "yyyy" || token == "yy" || token == "y") {
            if (token == "yyyy") {
                x = 4;
                y = 4;
            }
            if (token == "yy") {
                x = 2;
                y = 2;
            }
            if (token == "y") {
                x = 2;
                y = 4;
            }
            year = _getInt(val, i_val, x, y);
            if (year == null) {
                return 0;
            }
            i_val += year.length;
            if (year.length == 2) {
                if (year > 70) {
                    year = 1900 + (year - 0);
                }
                else {
                    year = 2000 + (year - 0);
                }
            }
        }
        else if (token == "MMM" || token == "NNN") {
            month = 0;
            for (var i = 0; i < MONTH_NAMES.length; i++) {
                var month_name = MONTH_NAMES[i];
                if (val.substring(i_val, i_val + month_name.length).toLowerCase() == month_name.toLowerCase()) {
                    if (token == "MMM" || (token == "NNN" && i > 11)) {
                        month = i + 1;
                        if (month > 12) {
                            month -= 12;
                        }
                        i_val += month_name.length;
                        break;
                    }
                }
            }
            if ((month < 1) || (month > 12)) {
                return 0;
            }
        }
        else if (token == "EE" || token == "E") {
            for (var i = 0; i < DAY_NAMES.length; i++) {
                var day_name = DAY_NAMES[i];
                if (val.substring(i_val, i_val + day_name.length).toLowerCase() == day_name.toLowerCase()) {
                    i_val += day_name.length;
                    break;
                }
            }
        }
        else if (token == "MM" || token == "M") {
            month = _getInt(val, i_val, token.length, 2);
            if (month == null || (month < 1) || (month > 12)) {
                return 0;
            }
            i_val += month.length;
        }
        else if (token == "dd" || token == "d") {
            date = _getInt(val, i_val, token.length, 2);
            if (date == null || (date < 1) || (date > 31)) {
                return 0;
            }
            i_val += date.length;
        }
        else if (token == "hh" || token == "h") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh == null || (hh < 1) || (hh > 12)) {
                return 0;
            }
            i_val += hh.length;
        }
        else if (token == "HH" || token == "H") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh == null || (hh < 0) || (hh > 23)) {
                return 0;
            }
            i_val += hh.length;
        }
        else if (token == "KK" || token == "K") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh == null || (hh < 0) || (hh > 11)) {
                return 0;
            }
            i_val += hh.length;
        }
        else if (token == "kk" || token == "k") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh == null || (hh < 1) || (hh > 24)) {
                return 0;
            }
            i_val += hh.length;
            hh--;
        }
        else if (token == "mm" || token == "m") {
            mm = _getInt(val, i_val, token.length, 2);
            if (mm == null || (mm < 0) || (mm > 59)) {
                return 0;
            }
            i_val += mm.length;
        }
        else if (token == "ss" || token == "s") {
            ss = _getInt(val, i_val, token.length, 2);
            if (ss == null || (ss < 0) || (ss > 59)) {
                return 0;
            }
            i_val += ss.length;
        }
        else if (token == "a") {
            if (val.substring(i_val, i_val + 2).toLowerCase() == "am") {
                ampm = "AM";
            }
            else if (val.substring(i_val, i_val + 2).toLowerCase() == "pm") {
                ampm = "PM";
            }
            else {
                return 0;
            }
            i_val += 2;
        }
        else {
            if (val.substring(i_val, i_val + token.length) != token) {
                return 0;
            }
            else {
                i_val += token.length;
            }
        }
    }
    // If there are any trailing characters left in the value, it doesn't match
    if (i_val != val.length) {
        return 0;
    }
    // Is date valid for month?
    if (month == 2) {
        // Check for leap year
        if (( (year % 4 == 0) && (year % 100 != 0) ) || (year % 400 == 0)) { // leap year
            if (date > 29) {
                return 0;
            }
        }
        else {
            if (date > 28) {
                return 0;
            }
        }
    }
    if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
        if (date > 30) {
            return 0;
        }
    }
    // Correct hours value
    if (hh < 12 && ampm == "PM") {
        hh = hh - 0 + 12;
    }
    else if (hh > 11 && ampm == "AM") {
        hh -= 12;
    }
    var newdate = new Date(year, month - 1, date, hh, mm, ss);
    return newdate.getTime();
}

// ------------------------------------------------------------------
// parseDate( date_string [, prefer_euro_format] )
//
// This function takes a date string and tries to match it to a
// number of possible date formats to get the value. It will try to
// match against the following international formats, in this order:
// y-M-d   MMM d, y   MMM d,y   y-MMM-d   d-MMM-y  MMM d
// M/d/y   M-d-y      M.d.y     MMM-d     M/d      M-d
// d/M/y   d-M-y      d.M.y     d-MMM     d/M      d-M
// A second argument may be passed to instruct the method to search
// for formats like d/M/y (european format) before M/d/y (American).
// Returns a Date object or null if no patterns match.
// ------------------------------------------------------------------
function parseDate(val) {
    var preferEuro = (arguments.length == 2) ? arguments[1] : false;
    generalFormats = new Array('y-M-d', 'MMM d, y', 'MMM d,y', 'y-MMM-d', 'd-MMM-y', 'MMM d');
    monthFirst = new Array('M/d/y', 'M-d-y', 'M.d.y', 'MMM-d', 'M/d', 'M-d');
    dateFirst = new Array('d/M/y', 'd-M-y', 'd.M.y', 'd-MMM', 'd/M', 'd-M');
    var checkList = new Array('generalFormats', preferEuro ? 'dateFirst' : 'monthFirst',
                              preferEuro ? 'monthFirst' : 'dateFirst');
    var d = null;
    for (var i = 0; i < checkList.length; i++) {
        var l = window[checkList[i]];
        for (var j = 0; j < l.length; j++) {
            d = getDateFromFormat(val, l[j]);
            if (d != 0) {
                return new Date(d);
            }
        }
    }
    return null;
}
