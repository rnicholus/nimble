Nimble.IssuesView = Ember.View.extend({
    column_names: function() {
        var names = [];

        $.each(this.controller.get("columns"), function(idx, column) {
            var match = column.name.match(/(\d+)\s*-\s*(.+)/),
                columnIdx = parseInt(match[1]);

            names[columnIdx] = match[2];
        });

        return names;
    }.property("controller.columns")
});