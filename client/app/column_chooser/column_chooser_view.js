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
        },

        add_column: function() {
            var $list_input = this.$(".list-input:first").clone();

            $list_input.find("input").val("");
            this.$(".list-input:last").after($list_input);
        },

        save_columns: function() {
            var names = [];

            this.$(".list-input INPUT[type='text']").each(function() {
                var name = $(this).val().trim();
                name && names.push(name);
            });

            this.controller.send("close_modal");
            this.controller.save_columns(names);
        }
    }
});