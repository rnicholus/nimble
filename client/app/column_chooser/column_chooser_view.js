Nimble.ColumnChooserView = Ember.View.extend({
    columns: function() {
        var columns = this.controller.get("existing_columns");

        if (columns.length) {
            return columns;
        }
        return [null, null, null];
    }.property("controller.existing_columns"),

    didInsertElement: function() {
        $("#columns-modal").modal("show")
            .on("hidden.bs.modal", function() {
                return this.controller.send("close_modal");
            }.bind(this));

        this._make_sortable();
    },

    _make_sortable: function() {
        this.$("#column-list").sortable({
            handle: ".glyphicon-move"
        });
    },

    actions: {
        add_column: function() {
            var $list_input = this.$(".list-input:first").clone();

            $list_input.find("input").val("");
            this.$(".list-input:last").after($list_input);

            this._make_sortable();
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