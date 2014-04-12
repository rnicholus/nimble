/* jshint node:true */
var token_endpoint = "/github/token",
    cookie_name = "github_token",
    express = require("express"),
    oauth_data = require("./github_oauth_data.json"),
    uuid = require("node-uuid"),
    querystring = require("querystring"),
    github_token = require("./github_token"),
    app = express(),
    states = [];

app.use("/", express.static(__dirname + "/app"));
app.use(express.cookieParser());

function check_valid_state(state) {
    var state_index = states.indexOf(state);

    if (state_index >= 0) {
        states.splice(state_index, 1);
        return true;
    }

    return false;
}

app.get(token_endpoint, function(req, res) {
    var auth_params = {
            client_id: oauth_data.client_id,
            scope: oauth_data.scope,
            state: uuid.v1()
        },
        auth_url = "https://github.com/login/oauth/authorize?" +
            querystring.stringify(auth_params);

    states.push(auth_params.state);
    console.log("Requesting autorization from Github...");

    res.redirect(auth_url);
});

app.delete(token_endpoint, function(req, res) {
    var token = req.cookies[cookie_name];

    console.log("Attempting to revoke authorization for " + token);

    github_token.delete(oauth_data, token).then(function() {
        console.log("Authorization revoked for " + token);
        res.clearCookie(cookie_name).send();
    },
    function(reason) {
        console.log(reason);
        res.send(500);
    });
});

app.get("/github/gotauth", function(req, res) {
    var state = req.query.state,
        code = req.query.code;

    if (check_valid_state(state)) {
        console.log("Got authorization from Github.");

        github_token.get(oauth_data, code).then(function(token) {
            console.log("Retrieved token: " + token);
            res.cookie(cookie_name, token)
                .redirect("/");
        },
        function(error_msg) {
            console.error("Token retrieval failed: " + error_msg);
            res.send(500, error_msg);
        });
    }
    else {
        console.error("Invalid state param");
        res.send(403, "Invalid state");
    }
});

app.listen(9000);
console.log("Express server started on port %s",9000);