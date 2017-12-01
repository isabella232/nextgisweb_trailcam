define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dojox/layout/FloatingPane',
    'ngw/utils/make-singleton',
    'ngw-tracker/webmap/map/TrackerLayersManager/TrackerLayersManager',
    'ngw-pyramid/i18n!tracker',
    'ngw-pyramid/hbs-i18n',
    'dojo/text!./TrailcamPane.hbs',
    'dijit/form/Button',
    'ngw-tracker/webmap/TrackersTimeFilter/TrackersTimeFilter'
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
             lang, dom, domConstruct, on, FloatingPane, MakeSingleton,
             TrackerLayersManager, i18n, hbsI18n, template) {
    return declare('ngw-webmap.TrailcamPane', [], {
        _display: null,
        _floatingPane: null,
        _feature: null,
        _domContainer: null,
        _trailcamId: null,

        constructor: function (display, feature) {
            this._display = display;
            this._feature = feature;
            this._trailcamId = feature.props.id;
            this._initialize();
        },

        _initialize: function () {
            var divContainer = domConstruct.toDom(hbsI18n(template, i18n, this));
            this._domContainer = divContainer;
            domConstruct.place(divContainer, document.body);

            this._floatingPane = new FloatingPane({
                id: 'trailcamePane_' + this._trailcamId,
                title: i18n.gettext('Trailcam') + ' ' + this._feature.props.name,
                resizable: true,
                dockable: false,
                maxable: false,
                closable: true,
                style: 'position:absolute;top:112px;left:263px;height:400px;width:500px;border:1px solid #759dc0;padding:5px;z-index:9999;overflow-x:hidden;'
            }, dom.byId('trailcamePane_' + this._trailcamId));

            // this._floatingPane.close = this._floatingPane.hide;
        },

        show: function () {
            this._floatingPane.startup();
            this._floatingPane.show();
        }
    });
});
