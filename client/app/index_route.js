Nimble.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        var repo = this.cache.get("selected_repo");

        // Load the last selected repo, if one exists
        if (repo !== null) {
            this.transitionTo("issues", repo);
        }
    }
});