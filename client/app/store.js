Nimble.Store = Ember.Object.extend({
    init: function(token) {
        this.set("token", token);
    },

    host: "https://api.github.com",

    load: function(type, token) {
        return $.get(this.get("host") + "/" + type, {
                access_token: this.get("token")
            }
        );
    }
});

/* jshint -W079 */
var store = Nimble.Store.create();