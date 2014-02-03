Nimble.Store = Ember.Object.extend({
    _token: document.cookie.replace(
        /(?:(?:^|.*;\s*)github_token\s*\=\s*([^;]*).*$)|^.*$/, "$1"),

    _host: "https://api.github.com",

    // TODO cache these or issue conditional request.
    // Perhaps only issue conditional request if the data
    // is "stale" based on elapsed time since last request?
    load: function(type) {
        return new Ember.RSVP.Promise(function(resolve, reject){
            if (this.get("_token")) {
                $.get(this.get("_host") + "/" + type, {
                    access_token: this.get("_token")
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
        this.set("_token", null);
    }
});