Nimble.RepoChooserView = Ember.View.extend({
    didInsertElement: function() {
        $("#repos-modal").modal("show")
            .on("hidden.bs.modal", function() {
                return this.controller.send("close_modal");
            }.bind(this));
    },

    repos: function() {
        return this.controller.get("repos").map(function(i, idx) {
            return {repo: i, active: idx === 0};
        });
    }.property("controller.repos"),

    actions: {
        selected_repo: function(owner, name) {
            var repo = {owner: owner, name: name};

            this.controller.cache.set("selected_repo", repo);

            $("#repos-modal").modal("hide").on("hidden.bs.modal", function() {
                var storageKey = "nimble.saw_repo_chooser_hint",
                    sawHint = localStorage.getItem(storageKey);

                this.controller.transitionToRoute("issues", repo);

                if (!sawHint) {
                    localStorage.setItem(storageKey, true);
                    $("#repo-chooser-center").popover("show")
                        .on("shown.bs.popover", function() {
                            $("#close-repo-chooser-popover").click(function() {
                                $(this).popover("destroy");
                            }.bind(this));
                        });
                }
            }.bind(this));
        }
    }
});