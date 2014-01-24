var express = require('express'),
    fs = require('fs'),
    githubOauthData = require("./github_oauth_data.json"),
    app = express();

app.use(express.static("./client/"));

app.get('/github/getauth', function(req, res) {
    console.log("Requesting autorization from Github...");
    res.redirect("https://github.com/login/oauth/authorize?client_id=" + githubOauthData.clientId +
    "&scope=repo&state=" + Math.random());
});

app.get('/github/gotauth', function(req, res) {
    console.log("Got authorization from Github.");
    res.send("Authorized");
});

app.listen(process.env.PORT);
console.log('Express server started on port %s', process.env.PORT);
