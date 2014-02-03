Nimble.Router.map(function() {
    this.resource("repos", function() {
        this.route("repo", {path: ":repo_id"});
    });
});