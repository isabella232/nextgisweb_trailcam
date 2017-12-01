define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./TrailcamItemsPane.hbs',
    'xstyle/css!./TrailcamItemsPane.css'
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
             template) {
    return declare('webmap.trailcam.TrailcamItemsPane',
        [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
            templateString: template,
            trailcamId: null,

            constructor: function () {

            }
        });
});
