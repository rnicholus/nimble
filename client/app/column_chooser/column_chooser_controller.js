Nimble.ColumnChooserController = Ember.ObjectController.extend({
    save_columns: function(names) {
        var selected_repo = this.cache.get("selected_repo"),
            repo_name = selected_repo.name,
            repo_owner = selected_repo.owner,
            promises = [],
            save_promise;

        $.each(names, function(idx, name) {
            var promise = this.cache.save("repos/%@/%@/labels".fmt(repo_owner, repo_name), {
                name: "%@ - %@".fmt(idx, name),
                color: "FFFFFF"
            });
            promises.push(promise);
        }.bind(this));

        save_promise = Ember.RSVP.Promise.all(promises);

        save_promise.then(
            function() {
                this.transitionToRoute("issues", selected_repo);
            }.bind(this),
            function() {
                console.error("Failed to save columns as labels!");
            }
        );

        return save_promise;
    }
});