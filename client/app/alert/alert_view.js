Nimble.AlertView = Ember.View.extend({
    didInsertElement: function() {
        window.setTimeout(function() {
            this.send("hide");
            this.controller.send("close_alert");
        }.bind(this), 2000);
    },

    actions: {
        hide: function() {
            this.$(".alert").fadeOut();
        }
    }
});