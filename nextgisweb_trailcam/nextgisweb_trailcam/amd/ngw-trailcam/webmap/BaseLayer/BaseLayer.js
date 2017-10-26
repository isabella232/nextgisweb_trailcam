define([
    'dojo/_base/declare',
    'openlayers/ol'
], function (declare, ol) {
    return declare(null, {
        _map: null,
        _source: null,
        _layer: null,
        _addedOnMap: false,

        addToMap: function () {
            if (!this._addedOnMap) {
                this._map.olMap.addLayer(this._layer);
                this._addedOnMap = true;
            }
            return this;
        },

        removeFromMap: function () {
            if (this._addedOnMap) {
                this._map.olMap.removeLayer(this._layer);
                this._addedOnMap = false;
            }
            return this;
        },

        zoomTo: function () {
            var olMap = this._map.olMap,
                extent = this._source.getExtent();

            if (this._isEmptyExtent(extent)) {
                return false;
            }

            olMap.getView().fit(extent, olMap.getSize());
        },

        _isEmptyExtent: function (extent) {
            return extent[0] === Number.POSITIVE_INFINITY &&
                extent[1] === Number.POSITIVE_INFINITY &&
                extent[2] === Number.NEGATIVE_INFINITY &&
                extent[3] === Number.NEGATIVE_INFINITY;
        }
    });
});
