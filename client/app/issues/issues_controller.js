Nimble.IssuesController = Ember.Controller.extend({
    labels: [],

    columns: function() {
        return $.grep(this.get("labels"), function(issue) {
            return (/\d+ -.+/).test(issue.name);
        });
    }.property("labels"),

    column_observer: function() {
        if(!this.get("columns").length) {
            this.send("open_modal", "column_chooser");
        }
    }.observes("columns")
});