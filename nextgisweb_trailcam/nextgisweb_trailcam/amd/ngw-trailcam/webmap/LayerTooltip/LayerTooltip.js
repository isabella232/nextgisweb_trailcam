define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/topic',
    'dojo/dom-construct',
    'dojo/_base/window',
    'openlayers/ol',
    'xstyle/css!./LayerTooltip.css'
], function (declare, lang, array, topic,
             domConstruct, win, ol) {
    return declare(null, {
        _olMap: null,
        _overlay: null,

        constructor: function (map) {
            this._olMap = map.olMap;

            this._buildTooltipContainer();
            this._buildOverlay();
            this._bindEvents();
        },

        _buildTooltipContainer: function () {
            var node = domConstruct.toDom('<div id="trailcamMapTooltip"></div>');
            domConstruct.place(node, win.body());
        },

        _buildOverlay: function () {
            this._overlay = new ol.Overlay({
                element: document.getElementById('trailcamMapTooltip'),
                positioning: 'bottom-left'
            });
            this._overlay.setMap(this._olMap);
        },

        _isDisplaying: false,

        _bindEvents: function () {
            this._olMap.on(['pointermove'], lang.hitch(this, function (evt) {
                var overlay = this._overlay,
                    feature = this._olMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
                        if (feature.getTooltipHtml) {
                            overlay.setPosition(evt.coordinate);
                            overlay.getElement().innerHTML = feature.getTooltipHtml();
                            return feature;
                        }
                    });

                if (feature) {
                    overlay.getElement().style.display = '';
                    this._isDisplaying = true;
                } else {
                    if (this._isDisplaying) {
                        overlay.getElement().style.display = 'none';
                        this._isDisplaying = false;
                    }
                }
            }));
        }
    });
});
