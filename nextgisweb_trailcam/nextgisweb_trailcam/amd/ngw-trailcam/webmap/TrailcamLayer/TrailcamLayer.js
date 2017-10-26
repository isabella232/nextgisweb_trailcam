define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/request/xhr',
    'dojo/date/locale',
    'dojo/date/stamp',
    'openlayers/ol',
    'ngw-pyramid/i18n!trailcam',
    'ngw-trailcam/webmap/BaseLayer/BaseLayer'
], function (declare, lang, array, xhr, locale, stamp, ol, i18n, BaseLayer) {
    return declare([BaseLayer], {
        _existDevices: false,
        _devicesDict: {},
        _devicesIds: [],
        _iconUrl: null,
        _timeFrom: null,
        _timeTo: null,
        _map: null,

        constructor: function (map) {
            this._setIcon();

            this._map = map;

            this._source = new ol.source.Vector({
                projection: 'EPSG:3857'
            });
            this._layer = new ol.layer.Vector({
                source: this._source,
                style: (lang.hitch(this, this._getIconStyle))
            });
        },

        _setIcon: function () {
            var url = ngwConfig.applicationUrl + '/trailcam/amd/static/url/';

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: {
                    subpath: 'ngw-trailcam/webmap/TrailcamLayer/trailcam.png'
                }
            }).done(lang.hitch(this, function (data) {
                this._iconUrl = data.url;
            }));
        },

        _getIconStyle: function () {
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 0.5],
                    size: [32, 32],
                    offset: [0, 0],
                    opacity: 1,
                    scale: 1,
                    src: this._iconUrl
                })
            });
        },

        addToMap: function () {
            this.inherited(arguments);
            this.updateLayer();
        },

        updateLayer: function () {
            this._source.clear();
            this._layer.setZIndex(1005);
            this._updatePoints();
        },

        _updatePoints: function () {
            var url = ngwConfig.applicationUrl + '/api/trailcam/trailcams';

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                data: {}
            }).done(lang.hitch(this, this._buildPointsTrailcams));
        },

        _buildPointsTrailcams: function (trailcams) {
            array.forEach(trailcams, function (trailcam) {
                var pointStop = new ol.Feature({});
                var pointGeom = new ol.geom.Point([trailcam.lon, trailcam.lat]);
                pointStop.props = {
                    'name': trailcam.name,
                    'description': trailcam.description
                };
                pointStop.setGeometry(pointGeom);

                pointStop.getTooltipHtml = function () {
                    var html = '';
                    html += '<div class="row">' + i18n.gettext('Name') + ': ' + this.props.name + '</div>';
                    html += '<div class="row">' + i18n.gettext('Description') + ': ' + this.props.description + '</div>';
                    return html;
                };

                this._source.addFeature(pointStop);
            }, this)
        }
    });
});
