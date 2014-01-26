/* jshint node:true */
"use strict";
var request = require("request"),
    querystring = require("querystring"),
    Promise = require("node-promise").Promise;

exports.get = function(oauth_config, auth_code) {
    var token_params = {
            client_id: oauth_config.client_id,
            client_secret: oauth_config.client_secret,
            code: auth_code
        },
        get_token_url = "https://github.com/login/oauth/access_token?" +
            querystring.stringify(token_params),
        promise = new Promise();

    request.post(get_token_url, function(error, response, body) {
        var parsed_response;

        if (!error && response.statusCode === 200) {
            parsed_response = querystring.parse(body);
            promise.resolve(parsed_response.access_token);
        }
        else {
            promise.reject("Get token response failed.  " +
                "Status code " + response.statusCode + ".  Error = " + error);
        }
    });

    return promise;
};