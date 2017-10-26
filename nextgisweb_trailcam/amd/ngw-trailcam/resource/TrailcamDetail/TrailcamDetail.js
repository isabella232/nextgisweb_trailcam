define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/layout/ContentPane',
    'ngw-pyramid/i18n!tracker',
    'ngw-pyramid/hbs-i18n',
    'ngw-resource/serialize',
    // resource
    'dojo/text!./TrailcamDetail.hbs',
    // template
    'dojox/layout/TableContainer',
    'dijit/form/TextBox',
    'dijit/form/ValidationTextBox',
    'dijit/form/NumberTextBox',
    'dijit/form/CheckBox',
    'ngw-resource/ResourceBox'
], function (declare,
             lang,
             _TemplatedMixin,
             _WidgetsInTemplateMixin,
             ContentPane,
             i18n,
             hbsI18n,
             serialize,
             template) {
    return declare([ContentPane, serialize.Mixin, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: hbsI18n(template, i18n),
        title: i18n.gettext('Trail camera detail'),
        prefix: 'trailcam',

        serializeInMixin: function (data) { },

        deserializeInMixin: function (data) { }
    });
});
