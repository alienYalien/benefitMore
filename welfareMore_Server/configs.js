var ACCOUNT_PRI_KEY = "^&*#$%()@";
var ROOM_PRI_KEY = "~!@#$(*&^%$&";

var LOCAL_IP = 'localhost';

exports.config = {
	mysql : {
		HOST:'localhost',
		USER:'root',
		PSWD:'123456',
		DB:'benefitMore',
		PORT:3306

	},
    app:{
        APPID:'xxx',
        APPSECRET:'xxx',
    },
    session:{
        time:15*60*1000
    }

};

