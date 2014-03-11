Nimble.IssuesController = Ember.Controller.extend({
    labels: [],

    column_names: function() {
        var names = [];

        $.each(this.get("column_labels"), function(idx, column) {
            var match = column.name.match(/(\d+)\s-\s(.+)/),
                columnIdx = parseInt(match[1]);

            names[columnIdx] = match[2];
        });

        return names;
    }.property("column_labels"),

    column_labels: function() {
        return $.grep(this.get("labels"), function(issue) {
            return (/\d+ -.+/).test(issue.name);
        });
    }.property("labels"),

    _column_labels_observer: function() {
        if(!this.get("column_labels").length) {
            this.send("open_modal", "column_chooser");
        }
    }.observes("column_labels")
});