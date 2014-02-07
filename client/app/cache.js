Nimble.Cache = Ember.Object.extend({
    _token: document.cookie.replace(
        /(?:(?:^|.*;\s*)github_token\s*\=\s*([^;]*).*$)|^.*$/, "$1"),

    _host: "https://api.github.com",

    _cache: {},

    _handle_xhr_success: function(type, data, xhr) {
        var etag = xhr.getResponseHeader("ETag");

        // If this was a conditional request, and the result has not changed,
        // pull it from the cache (since the response didn't include the data).
        if (xhr.status === 304 && this._cache[type]) {
            return $.extend(
                true,
                $.isArray(this._cache[type].data) ? [] : {},
                this._cache[type].data
            );
        }

        // If this was not a conditional request, or it was and the data
        // has changed, update the cache with a copy of the data.
        this._cache[type] = {etag: etag, data: data};
        return $.extend(true, $.isArray(data) ? [] : {}, data);
    },

    load: function(type) {
        var headers = {};

        // If this data is already represented in the cache,
        // send a conditional request.  The response will be a
        // 304 sans the result set if nothing has changed.
        if (this._cache[type]) {
            headers["If-None-Match"] = this._cache[type].etag;
        }

        return new Ember.RSVP.Promise(function(resolve, reject){
            if (this.get("_token")) {
                $.ajax(this.get("_host") + "/" + type, {
                    type: "GET",

                    headers: headers,

                    data: {
                        access_token: this.get("_token")
                    }
                })
                    .done(function(data, textStatus, jq_xhr) {
                        resolve(this._handle_xhr_success(
                            type,
                            data,
                            jq_xhr
                        ));
                    }.bind(this))

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