Nimble.IssuesController = Ember.Controller.extend({
    labels: [],

    // TODO move to view?
    columns: function() {
        var columns = [];

        $.each(this.get("_column_labels"), function(idx, column) {
            var match = column.name.match(/(\d+)\s-\s(.+)/),
                columnIdx = parseInt(match[1]);

            columns[columnIdx] = {
                name: match[2],
                label: column.name
            };
        });

        return columns;
    }.property("_column_labels"),

    // TODO move to view?
    issues: function() {
        var issues = this.get("_columns_issues"),
            issue_rows = [],
            max_issues = 0;

        $.each(issues, function(idx, column_issues) {
            max_issues = Math.max(max_issues, column_issues.length);
        });

        (function() {
            for (var i = 0; i < max_issues; i++) {
                issue_rows.push([]);
            }
        }());

        (function() {
            var issue_row;

            for (var i = 0; i < issue_rows.length; i++) {
                issue_row = issue_rows[i];

                for (var j = 0; j < issues.length; j++) {
                    issue_row.push(issues[j][i]);
                }
            }
        }());

        return issue_rows;
    }.property("_columns_issues"),

    _columns_issues: function() {
        var issues = [];

        //TODO replace with actual issues from repo
        $.each(this.get("columns"), function(idx, column) {
            var column_issues = [{
                title: idx + " issue1",
                description: "desc"
            }];

            if (idx % 2 === 0) {
                column_issues.push({
                    title: idx + " issue2",
                    description: "desc"
                });
            }

            issues.push(column_issues);
        });

        return issues;
    }.property("columns"),

    _column_labels: function() {
        return $.grep(this.get("labels"), function(issue) {
            return (/\d+ -.+/).test(issue.name);
        });
    }.property("labels"),

    _column_labels_observer: function() {
        if(!this.get("_column_labels").length) {
            this.send("open_modal", "column_chooser");
        }
    }.observes("_column_labels")
});