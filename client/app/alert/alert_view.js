Nimble.AlertView = Ember.View.extend({
    model_observer: function() {
        window.clearTimeout(this.get("_timer"));

        var timer = window.setTimeout(function() {
            this.send("hide");
            this.controller.send("close_alert");
        }.bind(this), 3000);

        this.set("_timer", timer);
    }.observes("controller.model"),

    alert_class: function() {
        var level = this.controller.get("model.level"),
            css_class = {
                info: "alert-info",
                success: "alert-success",
                warning: "alert-warning",
                error: "alert-danger"
            };

        return css_class[level];
    }.property("controller.model.level"),

    actions: {
        hide: function() {
            this.$(".alert").fadeOut();
        }
    }
});