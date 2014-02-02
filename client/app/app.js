/* jshint -W079 */
// Creation of the Nimble app/namespace
var Nimble = Ember.Application.create({
    ready: function() {
        // Inject the Store into all current and future controllers
        this.register("store:current", Nimble.Store, {singleton: true});
        this.inject("controller", "store", "store:current");
    }
});