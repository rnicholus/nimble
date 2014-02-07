Nimble.RepoRoute = Ember.Route.extend({
    model: function(params) {
        return {id: params.repo_id};
    }
});