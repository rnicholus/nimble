/* global window */
Nimble.UserController = Ember.ObjectController.extend({
    init: function() {
        store.init(this.get("token"));

        store.load("user").done(function(data) {
            this.set("content", data);
        }.bind(this));
    },

    token: document.cookie.replace(
        /(?:(?:^|.*;\s*)github_token\s*\=\s*([^;]*).*$)|^.*$/, "$1"),

    actions: (function() {
        var tokenEndpoint = "/github/token";

        return {
            login: function() {
                window.location = tokenEndpoint;
            },

            logout: function() {
                $.ajax(tokenEndpoint, {type: "DELETE"})
                    .then(function() {
                        this.set("token", null);
                    }.bind(this)
                );
            }
        };
    }.bind(this)())
});