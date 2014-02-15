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
        }
    }
});