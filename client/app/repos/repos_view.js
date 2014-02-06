Nimble.ReposView = Ember.View.extend({
    didInsertElement: function() {
        $("#reposModal").foundation("reveal", {
            closed: function() {
                this.controller.transitionToRoute("/");
            }.bind(this),

            open: function() {
                $(document).foundation();
            }
        })
            .foundation("reveal", "open");
    }
});