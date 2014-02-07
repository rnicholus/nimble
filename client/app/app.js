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