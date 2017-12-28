define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/topic',
    'dojox/layout/FloatingPane',
    'dijit/registry',
    'ngw/utils/make-singleton',
    'ngw-pyramid/i18n!trailcam',
    'ngw-pyramid/hbs-i18n',
    'dojo/text!./TrailcamPane.hbs',
    'dijit/form/Button',
    'ngw-trailcam/webmap/TrailcamTimeFilter/TrailcamTimeFilter',
    'ngw-trailcam/webmap/TrailcamItemsPane/TrailcamItemsPane',
    'xstyle/css!./TrailcamPane.css'
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
             lang, dom, domConstruct, on, topic, FloatingPane, registry,
             MakeSingleton, i18n, hbsI18n, template) {
    return declare('ngw-webmap.TrailcamPane', [], {
        _display: null,
        _floatingPane: null,
        _feature: null,
        _domContainer: null,

        _timeFilter: null,
        _editorBtn: null,
        _itemsPane: null,

        trailcamId: null,

        constructor: function (display, feature) {
            this._display = display;
            this._feature = feature;
            this.trailcamId = feature.props.id;
            this._initialize();
        },

        _initialize: function () {
            var divContainer = domConstruct.toDom(hbsI18n(template, i18n, this));
            this._domContainer = divContainer;
            domConstruct.place(divContainer, document.body);

            this._floatingPane = new FloatingPane({
                id: 'trailcamPane_' + this.trailcamId,
                title: i18n.gettext('Trailcam') + ' ' + this._feature.props.name,
                resizable: true,
                dockable: false,
                maxable: false,
                closable: true,
                style: 'position:absolute;top:112px;left:263px;height:400px;width:500px;border:1px solid #759dc0;padding:5px;z-index:9999;overflow-x:hidden;'
            }, dom.byId('trailcamPane_' + this.trailcamId));
        },

        show: function () {
            this._floatingPane.startup();
            this._setWidgets();
            this._bindEvents();
            this._floatingPane.show();
            this._updateTrailcamItems();
        },

        _setWidgets: function () {
            var trailcamId = this.trailcamId;
            this._timeFilter = registry.byId('trailcamTimeFilter_' + trailcamId);
            this._editorBtn = registry.byId('trailcamEditorBtn_' + trailcamId);
            this._itemsPane = registry.byId('trailcamItemsPane_' + trailcamId);
        },

        _bindEvents: function () {
            this._timeFilter.on('changed', lang.hitch(this, this.onTimeFilterChanged));
        },

        onTimeFilterChanged: function (data) {
            this._itemsPane.updateItems(data['from'], data['to'], this.trailcamId);
        },

        _updateTrailcamItems: function () {
            var timeData = this._timeFilter.getCurrentData();
            this._itemsPane.updateItems(timeData['from'], timeData['to'], this.trailcamId);
        }
    });
});