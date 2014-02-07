Nimble.Router.map(function() {
    this.route("repos");
    this.route("repo", {path: "/repo/:repo_id"});
});