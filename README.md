# yunxun-node-sdk

This is the node sdk of [yunxun](http://www.ucpaas.com/) that can send sms with tamplates


Before you use it, you must set the accountSid, authToken through the function: `setConfig`

These info can get in the [Yunxun-Console](http://www.ucpaas.com/user/account), like:

```
var yunxun = require('yunxun-node-sdk');

yunxun.setConfig({
	accountSid: '80ef7bc1b70f2315a592d27e37e0bf19',
	authToken: '13f3ad08d1a0814726054bd963ecc301'
});
```

And you must set one tamplate at [Yunxun-Console](http://www.ucpaas.com/user/account)

Then call the function: `setTemplate` to set tamplate in the sdk, like:

```
var yunxun = require('yunxun-node-sdk');

yunxun.setTemplate({
	'Template_1': { //测试通道-秒杀
        appID: 'faf28de434c74df681cc69b8a1071231',
        templateID: '6869'
    },
    'Template_2': { //测试通道-秒杀
        appID: 'a213asdc69b2123s6f681de434c74d10',
        templateID: '10023'
    }
});
```

Latsly, you can use it with the function:

*  `sendOne`: function (phoneNumber, str, type, callback)

It has three params:

* `phoneNumber`: String, //the phoneNumber '1803381XXXX' that you want send sms.
* `str`: String, //the str will replace tamplate's {1}, it can be seen in the sms. if the tamplate have more than one tamplate like {1} {2} {3}, split with comma(English)
* `type`: String, //set in the function: `setTemplate`, eg: Template_1, Template_2 ...

The callback will return (err, ret)

If sms send successfully the err will be null and ret is:

```
{
    code: '000000'
}
```
else the err will be like:

```
{
    errCode: 101104,
    errMsg: 请求包头Authorization参数解码后格式有误
}
```
