Nimble.Cache = Ember.Object.extend({
    _host: "https://api.github.com",

    _selected_repo_key: "nimble.selected_repo",

    _repo: function() {
        return JSON.parse(localStorage.getItem(this._selected_repo_key));
    }.property(),

    _cache: {},

    _token: document.cookie.replace(
        /(?:(?:^|.*;\s*)github_token\s*\=\s*([^;]*).*$)|^.*$/, "$1"),

    // set passes 2 args (via controller.set()), otherwise get
    selected_repo: function(key_name, new_repo) {
        if (arguments.length > 1) {
            localStorage.setItem(this._selected_repo_key,
                JSON.stringify(new_repo));

            this.set("_repo", new_repo);
        }

        return this.get("_repo");
    }.property("_repo"),

    clear_token: function() {
        this.set("_token", null);
        localStorage.removeItem(this._selected_repo_key);
    },

    logged_in: function() {
        return !!this.get("_token");
    }.property("_token")
});