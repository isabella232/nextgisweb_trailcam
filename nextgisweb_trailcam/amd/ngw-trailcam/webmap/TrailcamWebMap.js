define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/json',
    'dojo/topic',
    'ngw-webmap/plugin/_PluginBase',
    'dojo/dom-construct',
    'ngw-pyramid/i18n!basemap',
    'openlayers/ol',
    './MapTrailcamButton/MapTrailcamButton'
], function (
    declare,
    array,
    lang,
    json,
    topic,
    _PluginBase,
    domConstruct,
    i18n,
    ol,
    MapTrailcamButton
) {
    return declare([_PluginBase], {
        _display: null,

        constructor: function (params) {
            this._display = params.display;
            this._bindEvents();
        },

        _bindEvents: function () {
            topic.subscribe('/webmap/tools/initialized', lang.hitch(this, this.addMapTrailcamButton));
        },

        addMapTrailcamButton: function () {
            this._display.mapToolbar.items.addButton(MapTrailcamButton, {
                display: this._display
            });
        },

        postCreate: function () { },

        startup: function () { }
    });
});
