Nimble.IssuesController = Ember.Controller.extend({
    issues: [],

    columns: function() {
        return $.grep(this.get("issues"), function(issue) {
            return (/\d+ -.+/).test(issue.name);
        });
    }.property("issues"),

    column_observer: function() {
        if(!this.get("columns").length) {
            this.send("open_modal", "column_chooser");
        }
    }.observes("columns")
});