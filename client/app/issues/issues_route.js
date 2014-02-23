Nimble.IssuesRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);

        this.cache.load("repos/%@/%@/labels".fmt(model.owner, model.name))
            .then(
            function(data) {
                controller.set("issues", data);
            },
            function(xhr) {
                if (xhr.status >= 400) {
                    if (xhr.status === 410) {
                        controller.send("open_alert",
                            "The selected repo does not have issues enabled");
                    }
                    else {
                        controller.send("open_alert",
                            "The selected repo is invalid.");
                    }

                    controller.send("open_modal", "repo_chooser");
                }
            }
        );
    }
});