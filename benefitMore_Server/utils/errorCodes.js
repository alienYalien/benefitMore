/**
 * Created by chen on 2018/3/3.
 */

module.exports = {
    OK: 0,    // 成功无错误
    ParameterNull  : 1,       //参数为空
    SignWrong: 2,       //sign不正确
    FileSizeError: 3,       //文件太大
    FileTypeError: 4,       //文件类型异常
    SmsError: 5,        //阿里云短信报错
    NoRole: 6,        //用户不存在
    FindProError: 7,        //获取活动出现异常
    FindSalesError: 8,        //获取发起人出现异常
    alreadyLottery: 9,        //玩家已经没有抽奖次数
    NoCustom:10,              //关卡不存在
    NoTopic : 11,               //该题目不存在
    scoreNotEougth:12,          //积分不足
    NoOpenCustom:13,          //需要先花费积分开启关卡
    NotThisCustom:14,          //当前挑战的不是该关卡
    NotThisTopic:14,          //当前挑战的不是该题目
    NotEnougthCustomNum:15,          //当前挑战的不是该关卡
    GetChatError:16,          //获取排行榜失败
    NoTemplate:17,          //策划表有问题
    createUserError:18,    //创建用户错误
    customTypeError:19,    //此关卡类型不符
    NoThisLearn:20,         //当前学习的不是该关卡
    ServiceNotRuning:99, //没有找到服务器，或者服务器未开启
    IpMore:999,// ip注册过多
    SystemError:9999,//系统出现错误

    Max: 10000000
};