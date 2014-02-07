/* global window */
Nimble.ReposController = Ember.ArrayController.extend({
    /**
     * Get a subset of all repo entries.
     *
     * @param private `true` for private repos,
     * `false` for public,
     * `null` for all
     * @returns {Array} Relevant repo entries, sorted by full_name
     */
    _get_sorted_repos: function(private) {
        var repos = this.get("model");

        if (private !== null) {
            repos = $.grep(this.get("model"), function(repo) {
                return repo.private === private;
            });
        }

        return repos.sort(function(a, b) {
            return a.full_name < b.full_name;
        });
    },

    _all: function() {
        return this._get_sorted_repos(null);
    }.property("model"),

    _public: function() {
        return this._get_sorted_repos(false);
    }.property("model"),

    _private: function() {
        return this._get_sorted_repos(true);
    }.property("model"),

    repos: function() {
        return [
            {type: "all", entries: this.get("_all")},
            {type: "public", entries: this.get("_public")},
            {type: "private", entries: this.get("_private")}
        ];
    }.property("model")
});