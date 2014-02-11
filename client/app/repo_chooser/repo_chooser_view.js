Nimble.RepoChooserView = Ember.View.extend({
    didInsertElement: function() {
        $("#repos-modal").modal("show")
            .on("shown.bs.modal", function() {
                $(this).find(".nav li:first a").click();
            })
            .on("hidden.bs.modal", function() {
                return this.controller.send("close_modal");
            }.bind(this));
    },

    actions: {
        selected_repo: function(id) {
            this.controller.cache.set("selected_repo", id);

            $("#repos-modal").modal("hide").on("hidden.bs.modal", function() {
                this.controller.transitionToRoute("repo", id);
            }.bind(this));
        }
    }
});