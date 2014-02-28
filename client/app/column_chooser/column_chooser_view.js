Nimble.ColumnChooserView = Ember.View.extend({
    didInsertElement: function() {
        $("#columns-modal").modal("show")
            .on("hidden.bs.modal", function() {
                return this.controller.send("close_modal");
            }.bind(this));
    },

    actions: {
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

            if (names.length) {
                this.controller.save_columns(names).then(
                    function() {
                        $("#columns-modal").modal("hide");
                    },
                    function() {
                        this.controller.send(
                            "open_alert",
                            "There was a problem saving the columns to GitHub.",
                            "error");
                    }.bind(this)
                );
            }
            else {
                this.controller.send(
                    "open_alert",
                    "At least one column is required!",
                    "error");
            }
        }
    }
});