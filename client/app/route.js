Nimble.Router.map(function() {
    this.route("repos");

    // TODO repo_id should be the name, not the ID
    this.route("repo", {path: "/repos/:repo_id"});
    this.resource("issues", {path: "/repos/:repo_id/issues"});
});