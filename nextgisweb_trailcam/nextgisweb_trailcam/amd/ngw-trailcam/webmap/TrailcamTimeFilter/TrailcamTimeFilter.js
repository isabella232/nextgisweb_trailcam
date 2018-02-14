define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/Evented',
    'dojo/topic',
    'dojo/ready',
    'dojo/fx',
    'dojo/Deferred',
    'dojo/date/locale',
    'dojo/date/stamp',
    'dojo/promise/all',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'ngw-pyramid/i18n!webmap',
    'dojo/text!./TrailcamTimeFilter.hbs',
    'xstyle/css!./TrailcamTimeFilter.css',
    'xstyle/css!jquery/datetimepicker/jquery.datetimepicker.min.css',
    'jquery/jquery/jquery-3.2.1.min'
], function (declare, lang, domConstruct, on, Evented, topic, ready, fx, Deferred, locale, stamp, all,
             _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
             i18n, template) {

    var jQueryDeferred = new Deferred();

    ready(function () {
        require(['jquery/jquery.mousewheel/jquery.mousewheel'], function () {
            ready(function () {
                require(['jquery/datetimepicker/jquery.datetimepicker.full'], function () {
                    ready(function () {
                        jQueryDeferred.resolve();
                    });
                });
            });
        });
    });

    var getPreviousDayDate = function (date) {
        var d;

        if (date) {
            d = new Date(date.getTime());
        } else {
            d = new Date();
        }

        d.setDate(d.getDate() - 1);
        return d;
    };

    return declare('webmap.trailcam.TrailcamTimeFilter',
        [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented],
        {
            templateString: template,
            trailcamId: null,
            _startupDef: null,
            dateFrom: locale.format(getPreviousDayDate(), {
                datePattern: 'yyyy/MM/dd HH:mm',
                selector: 'date'
            }),
            dateTo: locale.format(new Date(), {
                datePattern: 'yyyy/MM/dd HH:mm',
                selector: 'date'
            }),
            $elFrom: null,
            $elTo: null,

            constructor: function () {
                this._startupDef = new Deferred();
                all([jQueryDeferred, this._startupDef.promise]).then(lang.hitch(this, this.initializeDateTimeSelectors));
            },

            initializeDateTimeSelectors: function () {
                var context = this,
                    $elFrom, $elTo;

                $elFrom = this.$elFrom = $('#trailcamPane_' + this.trailcamId + ' .elFrom');
                $elTo = this.$elTo = $('#trailcamPane_' + this.trailcamId + ' .elTo');

                $elFrom.datetimepicker({
                    onChangeDateTime: function (dp, $input) {
                        context._onChangeDateTime(
                            context._removeTimeZoneOffset(dp),
                            context._removeTimeZoneOffset($elTo.datetimepicker('getValue'))
                        );
                    }
                });

                $elTo.datetimepicker({
                    onChangeDateTime: function (dp, $input) {
                        context._onChangeDateTime(
                            context._removeTimeZoneOffset($elFrom.datetimepicker('getValue')),
                            context._removeTimeZoneOffset(dp)
                        );
                    }
                });
            },

            _onChangeDateTime: function (from, to) {
                this.emit('changed', {
                    from: from,
                    to: to,
                    trailcamId: this.trailcamId
                });
            },

            getCurrentData: function () {
                return {
                    from: this._removeTimeZoneOffset(this.$elFrom.datetimepicker('getValue')),
                    to: this._removeTimeZoneOffset(this.$elTo.datetimepicker('getValue')),
                    trailcamId: this.trailcamId
                }
            },

            _setDate: function ($el, date) {
                var dateString = locale.format(date, {
                    datePattern: 'yyyy/MM/dd HH:mm',
                    selector: 'date'
                });

                $el.val(dateString);
            },

            getTimeRange: function () {
                return {
                    from: this._removeTimeZoneOffset(this.$elFrom.datetimepicker('getValue')),
                    to: this._removeTimeZoneOffset(this.$elTo.datetimepicker('getValue'))
                };
            },

            startup: function () {
                this.inherited(arguments);
                this._startupDef.resolve();
            },

            _removeTimeZoneOffset: function (time) {
                return new Date(time.getTime() - time.getTimezoneOffset() * 60 * 1000);
            }
        }
    );
});
