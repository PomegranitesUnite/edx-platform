define(["backbone", "jquery", "jquery.ui"], function(Backbone, $) {
    // course update -- biggest kludge here is the lack of a real id to map updates to originals
    var CourseUpdate = Backbone.Model.extend({
        defaults: {
            "date" : $.datepicker.formatDate('MM d, yy', new Date()),
            "content" : "",
            "push_notification_enabled": false,
            "push_notification_selected" : false
        },
        validate: function(attrs) {
            if (!attrs.date || $.datepicker.formatDate('MM d, yy', new Date(attrs.date)) != attrs.date) {
                return {"date_required": gettext("This field must contain a valid date.")};
            }
        }
    });
    return CourseUpdate;
}); // end define()
