Nimble.ColumnChooserController = Ember.ObjectController.extend({
    save_columns: function(names) {
        //TODO add/update labels in repo
        this.transitionToRoute("index");
    }
});