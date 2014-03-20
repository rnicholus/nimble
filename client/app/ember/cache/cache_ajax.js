Nimble.Cache.reopen({
    _copy_of_cached_item: function(type) {
        return $.extend(
            true,
            $.isArray(this._cache[type].data) ? [] : {},
            this._cache[type].data
        );
    },

    _handle_load_success: function(type, data, xhr) {
        var etag = xhr.getResponseHeader("ETag");

        // If this was not a conditional request, or it was and the data
        // has changed, update the cache with a copy of the data.
        if (xhr.status !== 304 || !this._cache[type]) {
            this._cache[type] = {etag: etag, data: data};
        }

        return this._copy_of_cached_item(type);
    },

    load: function(type, params) {
        var headers = {};

        // If this data is already represented in the cache,
        // send a conditional request.  The response will be a
        // 304 sans the result set if nothing has changed.
        if (this._cache[type]) {
            headers["If-None-Match"] = this._cache[type].etag;
        }

        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (this.get("_token")) {
                var data = {access_token: this.get("_token")};

                if (params) {
                    $.extend(data, params);
                }

                $.ajax(this.get("_host") + "/" + type, {
                    type: "GET",

                    headers: headers,
                    data: data
                })
                    .done(function(data, textStatus, jq_xhr) {
                        resolve(this._handle_load_success(
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

    save: function(type, params, method) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (this.get("_token")) {
                var host = this.get("_host"),
                    token = this.get("_token");

                $.ajax("%@/%@?access_token=%@".fmt(host, type, token), {
                    type: method || "POST",
                    contentType: "application/json",
                    data: JSON.stringify(params)
                })
                    .done(function(data, textStatus, jq_xhr) {
                        resolve();
                    })
                    .fail(reject);
            }
            else {
                reject();
            }
        }.bind(this));
    },

    remove: function(type) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (this.get("_token")) {
                var host = this.get("_host"),
                    token = this.get("_token");

                $.ajax("%@/%@?access_token=%@".fmt(host, type, token), {
                    type: "DELETE"
                })
                    .done(function(data, textStatus, jq_xhr) {
                        resolve();
                    })
                    .fail(reject);
            }
            else {
                reject();
            }
        }.bind(this));
    },

    update: function(type, params) {
        return this.save(type, params, "PATCH");
    }
});