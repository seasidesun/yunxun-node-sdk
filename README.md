# yunxun-node-sdk

This is the node sdk of [yunxun](http://www.ucpaas.com/) that can send sms with tamplates


Before you use it, you must set the accountSid, authToken, restUrl in the file(../lib/config.js), these info can get in the [Yunxun-Console](http://www.ucpaas.com/user/account), like: 

```
{
	accountSid: '80ef7bc1b70f2315a592d27e37e0bf19'
	authToken: '13f3ad08d1a0814726054bd963ecc301'
}
```

```
	restUrl: 'https://api.ucpaas.com/'
```

And you must set one tamplate at [Yunxun-Console](http://www.ucpaas.com/user/account), then name it in the file(../lib/config.js)'s TEMPLATE, like:

```
{
	code: {
	    appID: 'a2dfebfdbd6f4bd9b76c3836637519e0',
	    templateID: '10010'
	}
}
```

You can use it with the function: 

*  `sendOne`: function (phoneNumber, str, type, callback)

It has three params:

* `phoneNumber`: String, //the phoneNumber '1803381XXXX' that you want send sms.
* `str`: String, //the str will replace tamplate's {1}, it can be seen in the sms. if the tamplate have more than one tamplate like {1} {2} {3}, split with comma(English)
* `type`: String, //set in the file(../lib/config.js)'s TEMPLATE

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
