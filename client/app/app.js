/* jshint -W079 */
// Creation of the Nimble app/namespace
var Nimble = Ember.Application.create({
    ready: function() {
        // Inject the Store into all current and future controllers
        this.register("store:current", Nimble.Store, {singleton: true});
        this.inject("controller", "store", "store:current");
        this.inject("route", "store", "store:current");

        // This is apparently required to ensure Foundation
        // JavaScript component work after route changes
        $(function() {
            $(document).foundation();
        });
    }
});