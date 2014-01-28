var Nimble = Ember.Application.create();

Nimble.Store = DS.Store.extend({
    adapter: "DS.RESTAdapter"
});