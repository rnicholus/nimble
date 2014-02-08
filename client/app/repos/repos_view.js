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
        selected_repo: function(id) {
            this.controller.cache.set("selected_repo", id);
            $("#reposModal").foundation("reveal", "close");
        }
    }
});