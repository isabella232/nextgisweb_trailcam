define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/topic',
    'dijit/registry',
    'ngw/utils/make-singleton',
    'ngw-pyramid/i18n!trailcam',
    '../TrailcamPane/TrailcamPane'
], function (declare, lang, dom, domConstruct, on, topic,
             registry, MakeSingleton, i18n, TrailcamPane) {
    return MakeSingleton(declare('ngw-webmap.TrailcamPanesManager', [], {
        _display: null,
        _panes: {},

        constructor: function (display) {
            this._display = display;
        },

        bindEvents: function () {
            topic.subscribe('/webmap/trailcam/pane/show', lang.hitch(this, this.showTrailcamPane));
        },

        showTrailcamPane: function (trailcamFeature) {
            var paneWidget = registry.byId('trailcamPane_' + trailcamFeature.props.id),
                trailcamPane;
            if (paneWidget) {
                return false;
            }
            trailcamPane = new TrailcamPane(this._display, trailcamFeature);
            trailcamPane.show();
        }
    }));
});
