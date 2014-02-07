Nimble.ReposView = Ember.View.extend({
    didInsertElement: function() {
        $("#reposModal").foundation("reveal", {
            open: function() {
                $(document).foundation();
            }
        })
            .foundation("reveal", "open");
    },

    actions: {
        selected_route: function() {
            $("#reposModal").foundation("reveal", "close");
        }
    }
});