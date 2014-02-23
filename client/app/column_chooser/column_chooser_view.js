Nimble.ColumnChooserView = Ember.View.extend({
    didInsertElement: function() {
        $("#columns-modal").modal("show")
            .on("hidden.bs.modal", function() {
                return this.controller.send("close_modal");
            }.bind(this));
    },

    actions: {
        selected_repo: function(owner, name) {
            $("#columns-modal").modal("hide").on("hidden.bs.modal", function() {
                //TODO
            }.bind(this));
        }
    }
});