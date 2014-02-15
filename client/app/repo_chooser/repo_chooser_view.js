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
        // TODO selected_repo should be the name, not the ID
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