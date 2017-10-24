define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'ngw-pyramid/modelWidget/Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/request/xhr',
    'dojo/json',
    'ngw/route',
    'ngw-pyramid/i18n!tracker',
    'ngw-pyramid/hbs-i18n',
    'dojo/text!./TrailcamSettings.hbs',
    'dijit/layout/ContentPane',
    'dijit/layout/BorderContainer',
    'dijit/form/NumberTextBox',
    'dijit/form/Button',
    'dijit/form/Select',
    'dojox/layout/TableContainer'
], function (declare,
             array,
             lang,
             Widget,
             _TemplatedMixin,
             _WidgetsInTemplateMixin,
             xhr,
             json,
             route,
             i18n,
             hbsI18n,
             template) {
    var API_URL = route.trailcam.settings();

    return declare([Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: hbsI18n(template, i18n),

        postCreate: function () {
            this.inherited(arguments);
            var self = this;
            this.buttonSave.on('click', function () {
                self.save();
            });
        },

        startup: function () {
            this.inherited(arguments);
            var self = this;
            xhr.get(API_URL, {
                handleAs: 'json'
            }).then(function (data) {
                self.emailRetrievalPeriod.attr('value', data.email_retrieval_period);
            });
        },

        save: function () {
            xhr.put(API_URL, {
                handleAs: 'json',
                headers: {'Content-Type': 'application/json'},
                data: json.stringify({
                    email_retrieval_period: this.emailRetrievalPeriod.attr('value')
                })
            }).then(function () {
                alert(i18n.gettext('Trail cameras settings has been saved successfully!'));
            }, function () {
                alert(i18n.gettext('Error, trail cameras settings not has been saved!'));
            });
        }
    });
});
