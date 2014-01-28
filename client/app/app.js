/* jshint -W079 */
// Creation of the Nimble app/namespace
var Nimble = Ember.Application.create();

// Init Ember Data.  We're going to use the REST Adapter.
Nimble.Store = DS.Store.extend({
    adapter: "DS.RESTAdapter"
});