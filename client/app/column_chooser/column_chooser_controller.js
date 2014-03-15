Nimble.ColumnChooserController = Ember.ObjectController.extend({
    needs: "issues",

    save_columns: function(new_names) {
        var selected_repo = this.cache.get("selected_repo"),
            existing_column_names = this.get("existing_columns"),
            to_update = [],
            to_delete = [],
            to_create = [],
            promises = [],
            loop_idx, save_promise;

        if (existing_column_names.length > 0) {
            (function() {
                for (loop_idx = 0; loop_idx < existing_column_names.length; loop_idx++) {
                    var existing_name = existing_column_names[loop_idx],
                        new_name = new_names[loop_idx];

                    if (existing_name !== new_name) {
                        to_update.push({
                            old_label: this._column_to_label(loop_idx, existing_name),
                            new_label: this._column_to_label(loop_idx, new_name)
                        });
                    }
                }
            }.bind(this)());
            promises = promises.concat(this._rename_labels(to_update));
        }

        if (existing_column_names.length > new_names.length) {
            for (loop_idx = new_names.length; loop_idx < existing_column_names.length; loop_idx++) {
                to_delete.push(this._column_to_label(loop_idx, existing_column_names[loop_idx]));
            }
            promises = promises.concat(this._delete_labels(to_delete));
        }
        else if (new_names.length > existing_column_names.length) {
            for (loop_idx = existing_column_names.length; loop_idx < new_names.length; loop_idx++) {
                to_create.push(this._column_to_label(loop_idx, new_names[loop_idx]));
            }
            promises = promises.concat(this._create_labels(to_create));
        }

        save_promise = Ember.RSVP.Promise.all(promises);

        save_promise.then(
            function() {
                this.transitionToRoute("issues", $.extend({}, selected_repo));
            }.bind(this),
            function() {
                console.error("Failed to save columns as labels!");
            }
        );

        return save_promise;
    },

    existing_columns: function() {
        return this.get("controllers.issues.column_names");
    }.property("controllers.issues.column_names"),

    _create_labels: function(names) {
        var selected_repo = this.cache.get("selected_repo"),
            repo_name = selected_repo.name,
            repo_owner = selected_repo.owner,
            promises = [];

        $.each(names, function(idx, name) {
            var promise = this.cache.save("repos/%@/%@/labels".fmt(repo_owner, repo_name), {
                name: name,
                color: "FFFFFF"
            });
            promises.push(promise);
        }.bind(this));

        return promises;
    },

    _delete_labels: function(names) {
        var selected_repo = this.cache.get("selected_repo"),
            repo_name = selected_repo.name,
            repo_owner = selected_repo.owner,
            promises = [];

        $.each(names, function(idx, name) {
            promises.push(
                this.cache.remove("repos/%@/%@/labels/%@".fmt(repo_owner, repo_name, name))
            );
        }.bind(this));

        return promises;
    },

    _column_to_label: function(idx, name) {
        return "%@ - %@".fmt(idx, name);
    },

    _rename_labels: function(names) {
        var selected_repo = this.cache.get("selected_repo"),
            repo_name = selected_repo.name,
            repo_owner = selected_repo.owner,
            promises = [];

        $.each(names, function(idx, name) {
            var promise = this.cache.update("repos/%@/%@/labels/%@".fmt(repo_owner, repo_name, name.old_label), {
                name: name.new_label,
                color: "FFFFFF"
            });
            promises.push(promise);
        }.bind(this));

        return promises;
    }
});