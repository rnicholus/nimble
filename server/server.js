/* jshint node:true */
'use strict';
var express = require('express'),
    oauth_data = require('./github_oauth_data.json'),
    uuid = require('node-uuid'),
    querystring = require('querystring'),
    app = express();

app.use(express.static('./client/'));

app.get('/github/getauth', function(req, res) {
    var authParams = {
            client_id: oauth_data.client_id,
            scope: 'repo',
            state: uuid.v1()
        },
        authUrl = 'https://github.com/login/oauth/authorize?' +
            querystring.stringify(authParams);

    console.log('Requesting autorization from Github...');

    res.redirect(authUrl);
});

app.get('/github/gotauth', function(req, res) {
    console.log('Got authorization from Github.');
    res.send('Authorized');
});

app.listen(9000);
console.log('Express server started on port %s',9000);
