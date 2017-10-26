define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
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
             on,
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

        postCreate: function () {
            var isAutoUpdating = this.isAutoUpdating.get('value');

            this.inherited(arguments);

            this.subjectFilter.set('disabled', !isAutoUpdating);

            on(this.isAutoUpdating, 'change', lang.hitch(this, function (value) {
                this.subjectFilter.set('disabled', !value);
            }));
        },

        serializeInMixin: function (data) { },

        deserializeInMixin: function (data) { }
    });
});
