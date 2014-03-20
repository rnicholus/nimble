Nimble.Router.map(function() {
    this.route("repos");
    this.route("issues", {path: "/repos/:owner/:name/issues"});
});