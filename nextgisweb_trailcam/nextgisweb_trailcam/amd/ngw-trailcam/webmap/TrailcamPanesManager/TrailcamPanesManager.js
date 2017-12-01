define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/topic',
    'ngw/utils/make-singleton',
    'ngw-pyramid/i18n!tracker',
    '../TrailcamPane/TrailcamPane'
], function (declare, lang, dom, domConstruct, on, topic, MakeSingleton,
             i18n, TrailcamPane) {
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
            var trailcamPane = new TrailcamPane(this._display, trailcamFeature);
            this._panes[trailcamFeature.props.id] = trailcamPane;
            trailcamPane.show();
        }
    }));
});
