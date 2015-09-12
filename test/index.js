'use strict';

var yunxun = require('../index.js');

//the first param is phoneNumber
//the second param is the str that will replace tamplate's {1}\{2}
//the third param is the key that set in the file(../lib/config.js)'s TEMPLATE

yunxun.setTemplate({
	'Template_1': { //测试通道-秒杀
        appID: 'faf28de434c74d681cc69131ax728a1074',
        templateID: '6869'
    }
});

yunxun.setConfig({
	accountSid: '80ef7bc1b70f2315a592d27e37e0bf19',
	authToken: '13f3ad08d1a0814726054bd963ecc301'
});

yunxun.sendOne('1803361XXXX', 'XXXXXX', 'Template_1', function (err, ret) {
	console.log(err, ret);
});

//if sms send successfully the err is bull and ret is { code: '000000' }
//else the err will exists eg: [Error: Error in send sms type: code, errCode: 101104, errMsg: 请求包头Authorization参数解码后格式有误]
