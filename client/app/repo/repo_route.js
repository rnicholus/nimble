Nimble.RepoRoute = Ember.Route.extend({
    model: function(params) {
        this.transitionTo("issues", params.repo_id);
    }
});