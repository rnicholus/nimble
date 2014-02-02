Nimble.Store = Ember.Object.extend({
    token: document.cookie.replace(
        /(?:(?:^|.*;\s*)github_token\s*\=\s*([^;]*).*$)|^.*$/, "$1"),

    host: "https://api.github.com",

    load: function(type) {
        return new Promise(function(resolve, reject){
            if (this.get("token")) {
                $.get(this.get("host") + "/" + type, {
                    access_token: this.get("token")
                })
                    .done(resolve.bind(this))
                    .fail(reject);
            }
            else {
                reject();
            }
        }.bind(this));
    },

    clear_token: function() {
        this.set("token", null);
    }
});