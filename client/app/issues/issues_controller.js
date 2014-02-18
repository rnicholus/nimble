Nimble.IssuesController = Ember.Controller.extend({
    issues: [],

    columns: function() {
        return $.grep(this.get("issues"), function(issue) {
            return (/\d+ -.+/).test(issue.name);
        });
    }.property("issues")
});