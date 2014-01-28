Nimble.LoginController = Ember.Controller.extend({
    token: document.cookie.replace(
        /(?:(?:^|.*;\s*)github_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
});