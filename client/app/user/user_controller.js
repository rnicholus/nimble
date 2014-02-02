/* global window */
Nimble.UserController = Ember.ObjectController.extend({
    init: function() {
        this.get("store").load("user").then(function(data) {
            this.setProperties({
                content: data,
                logged_in: true
            });
        }.bind(this), function() {
            this.set("logged_in", false);
        }.bind(this));
    },

    content: {},

    login_attempted: function() {
        return this.get("logged_in") !== undefined;
    }.property("logged_in"),

    actions: (function() {
        var authEndpoint = "/github/token";

        return {
            login: function() {
                window.location = authEndpoint;
            },

            logout: function() {
                $.ajax(authEndpoint, {type: "DELETE"})
                    .then(function() {
                        this.get("store").clear_token();
                        this.set("logged_in", false);
                    }.bind(this)
                );
            }
        };
    }.bind(this)())
});