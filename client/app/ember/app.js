/* jshint -W079 */
// Creation of the Nimble app/namespace
var Nimble = Ember.Application.create({
    ready: function() {
        // Inject the Store into all current and future controllers
        this.register("cache:current", Nimble.Cache, {singleton: true});
        this.inject("controller", "cache", "cache:current");
        this.inject("route", "cache", "cache:current");
    }
});

Nimble.ApplicationRoute = Ember.Route.extend({
    redirect: function() {
        if (!this.cache.get("logged_in")) {
            this.controllerFor("user").send("login");
        }
    },

    actions: {
        open_modal: function(modalName, model) {
            this.controllerFor(modalName).set("model", model);
            return this.render(modalName, {
                into: "application",
                outlet: "modal"
            });
        },

        close_modal: function() {
            return this.disconnectOutlet({
                outlet: "modal",
                parentView: "application"
            });
        },

        open_alert: function(message, opt_level) {
            this.controllerFor("alert").set("model", {
                message: message,
                level: opt_level || "info"
            });
            return this.render("alert", {
                into: "application",
                outlet: "alert"
            });
        },

        // TODO Find a way to trigger hide event on alert view so any
        // controller/route can simply close the alert view this event
        // to disconnect the outlet and hide the alert.
        close_alert: function() {
            return this.disconnectOutlet({
                outlet: "alert",
                parentView: "application"
            });
        }
    }
});