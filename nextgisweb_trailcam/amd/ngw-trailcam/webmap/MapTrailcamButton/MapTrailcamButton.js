define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/on',
    'dijit/form/ToggleButton',
    'ngw-pyramid/i18n!trailcam'
], function (declare, lang, domConstruct, domClass, on, ToggleButton, i18n) {
    return declare([ToggleButton], {

        postCreate: function () {
            var customIcon = '<span class="ol-control__icon material-icons">camera</span>';

            this.set('title', i18n.gettext('Trail cameras'));
            this.set('showLabel', false);

            domClass.add(this.domNode, 'ol-control');
            domClass.add(this.domNode, 'ol-unselectable');

            domConstruct.destroy(this.iconNode);
            this.iconNode = domConstruct.toDom(customIcon);
            this.titleNode.appendChild(this.iconNode);

            this.bindEvents();
        },

        bindEvents: function () {
            on(this, 'change', lang.hitch(this, function (value) {
                if (value) {
                    console.log(value);
                } else {
                    console.log(value);
                }
            }));
        }
    });
});
