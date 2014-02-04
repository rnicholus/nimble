Nimble.ReposView = Ember.View.extend({
    didInsertElement: function() {
        $("#reposModal").foundation("reveal", {
            closed: function() {
                this.controller.transitionToRoute("/");
            }.bind(this)
        })
            .foundation("reveal", "open");
    }
});