'use strict';

var crypto = require('crypto');
var request = require('request');
var config = require('./config');
var ERROE_CODE = require('./const').ERROE_CODE;

var TEMPLATE = {};

var uri_send_sms = config.restUrl;
var accountSid = config.user.accountSid;
var authToken = config.user.authToken;

function getMd5 (str) {
	var result = "";
    try {
        if (str && typeof str === "string") {
            var md5_str = crypto.createHash('md5');
            result = md5_str.update(str).digest('hex');
        } else
            result = "";

    } catch (err) {
        return result;
    }

    return result;
}

function getToken () {
    var now = new Date();
    var time = (now.getFullYear() * 10000000000) + ((now.getMonth() + 1) * 100000000) + (now.getDate() * 1000000) + (now.getHours() * 10000) + (now.getMinutes() * 100) + (now.getSeconds());
    var sig = getMd5(accountSid + authToken + time).toUpperCase();

    var authorization = new Buffer(accountSid + ':' + time);
    authorization = authorization.toString('base64');

    return {
        sig: sig,
        authorization: authorization
    };
};

module.exports.setTemplate = function (template) {
	TEMPLATE = template;
};

module.exports.sendOne = function(mobile, code, type, callback) {

	if (!accountSid || !authToken) return callback(new Error('please set the accountSid and authToken in the file of config'));
    if (!TEMPLATE[type]) return callback(new Error('This type:' + type + ' does not found in sms template'));

    var token = getToken();

    request.post({url: uri_send_sms + '2014-06-30/Accounts/' + accountSid + '/Messages/templateSMS?sig=' + token.sig,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': token.authorization
        },
        json: true,
        body: {
            'templateSMS': {
                'templateId': TEMPLATE[type].templateID,
                'appId': TEMPLATE[type].appID,
                'param': code,
                'to': mobile
            }
        }
    }, function (err, res, body) {
        if (err) {
            return callback(err);
        }
        else if (body && body.resp){
            if (body.resp.respCode === '000000')
                return callback(null, { code: body.resp.respCode });
            else
                return callback(new Error('Error in send sms type: ' + type + ', errCode: ' + body.resp.respCode + ', errMsg: ' + ERROE_CODE[body.resp.respCode]));
        }
        else {
            return callback(null, null);
        }
    })
};
