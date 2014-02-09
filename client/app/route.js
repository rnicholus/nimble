Nimble.Router.map(function() {
    this.route("repos");
    this.route("repo", {path: "/repos/:repo_id"});
    this.resource("issues", {path: "/repos/:repo_id/issues"});
});