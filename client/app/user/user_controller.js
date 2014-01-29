/* global window */
Nimble.UserController = Ember.Controller.extend({
    token: document.cookie.replace(
        /(?:(?:^|.*;\s*)github_token\s*\=\s*([^;]*).*$)|^.*$/, "$1"),


    actions: (function() {
        var tokenEndpoint = "/github/token";

        return {
            login: function() {
                window.location = tokenEndpoint;
            },

            logout: function() {
                $.ajax({
                    url: tokenEndpoint,
                    type: "DELETE"
                }).then(function() {
                        this.set("token", null);
                    }.bind(this)
                );
            }
        };
    }.bind(this)())
});