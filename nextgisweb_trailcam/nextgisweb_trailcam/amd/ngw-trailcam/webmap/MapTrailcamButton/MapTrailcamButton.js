define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/on',
    'dijit/form/ToggleButton',
    'ngw-pyramid/i18n!trailcam',
    'ngw-trailcam/webmap/LayerTooltip/LayerTooltip',
    'ngw-trailcam/webmap/TrailcamLayer/TrailcamLayer',
    'xstyle/css!' + ngwConfig.amdUrl + 'dojox/layout/resources/FloatingPane.css',
    'xstyle/css!' + ngwConfig.amdUrl + 'dojox/layout/resources/ResizeHandle.css'
], function (declare, lang, domConstruct, domClass, on, ToggleButton, i18n, LayerTooltip, TrailcamLayer) {
    return declare([ToggleButton], {
        _trailcamLayer: null,

        postCreate: function () {
            var customIcon = '<span class="ol-control__icon material-icons">camera</span>';

            this.set('title', i18n.gettext('Trail cameras'));
            this.set('showLabel', false);

            domClass.add(this.domNode, 'ol-control');
            domClass.add(this.domNode, 'ol-unselectable');

            domConstruct.destroy(this.iconNode);
            this.iconNode = domConstruct.toDom(customIcon);
            this.titleNode.appendChild(this.iconNode);

            this._trailcamLayer = new TrailcamLayer(this.display.map);
            new LayerTooltip(this.display.map);
            this.bindEvents();
        },

        bindEvents: function () {
            on(this, 'change', lang.hitch(this, function (value) {
                if (value) {
                    this._trailcamLayer.addToMap();
                } else {
                    this._trailcamLayer.removeFromMap();
                }
            }));
        }
    });
});
