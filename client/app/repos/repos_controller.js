/* global window */
Nimble.ReposController = Ember.ArrayController.extend({
    _getSortedRepos: function(private) {
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

    all: function() {
        return this._getSortedRepos(null);
    }.property("model"),

    public: function() {
        return this._getSortedRepos(false);
    }.property("model"),

    private: function() {
        return this._getSortedRepos(true);
    }.property("model")
});