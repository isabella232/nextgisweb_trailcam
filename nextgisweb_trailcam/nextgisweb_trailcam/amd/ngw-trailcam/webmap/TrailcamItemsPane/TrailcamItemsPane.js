define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-construct',
    'dojo/topic',
    'dojo/on',
    'dojo/request/xhr',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojox/image/Lightbox',
    'dojo/text!./TrailcamItemsPane.hbs',
    'xstyle/css!./TrailcamItemsPane.css',
    'xstyle/css!dojox/image/resources/Lightbox.css'
], function (declare, lang, array, domConstruct, topic, on, xhr, _WidgetBase,
             _TemplatedMixin, _WidgetsInTemplateMixin, Lightbox,
             template) {
    return declare('webmap.trailcam.TrailcamItemsPane',
        [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
            templateString: template,
            trailcamId: null,

            updateItems: function (from, to, trailcamId) {
                if (trailcamId !== this.trailcamId) return false;

                xhr(ngwConfig.applicationUrl + '/trailcam/' + this.trailcamId + '/items/', {
                    handleAs: "json"
                }).then(lang.hitch(this, function (imagesInfo) {
                    this.buildImages(imagesInfo);
                }), function (err) {
                    console.log(err);
                });
            },

            buildImages: function (imagesInfo) {
                domConstruct.empty(this.imageContainer);

                array.forEach(imagesInfo, lang.hitch(this, function (imageInfo) {
                    var imageElement = domConstruct.create('img', {
                        title: imageInfo.name,
                        src: ngwConfig.applicationUrl + '/trailcam/media/' + imageInfo.file_path_thumbnail
                    });
                    domConstruct.place(imageElement, this.imageContainer, 'last');
                    imageElement.imageInfo = imageInfo;
                    on(imageElement, 'click', lang.hitch(this, this.showModalImage));
                }));
            },

            showModalImage: function (clickEvent) {
                var imageInfo = clickEvent.target.imageInfo,
                    dialog;

                dialog = new Lightbox({
                    title: imageInfo.name,
                    href: ngwConfig.applicationUrl + '/trailcam/media/' + imageInfo.file_path
                });
                dialog.startup();
                dialog.show();
            }
        });
});
