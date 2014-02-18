Nimble.IssuesRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);

        this.cache.load("repos/%@/%@/labels".fmt(model.owner, model.name))
            .then(function(data) {
                controller.set("issues", data);
            });
    }
});