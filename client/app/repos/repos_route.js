Nimble.ReposRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.send("open_modal", "repo_chooser");
    }
});