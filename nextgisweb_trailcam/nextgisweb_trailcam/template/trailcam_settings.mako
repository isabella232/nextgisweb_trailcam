<%inherit file='nextgisweb:pyramid/template/base.mako' />

<%def name="head()">
    <% import json %>
    <script type="text/javascript">
        require([
            "ngw-trailcam/settings/TrailcamSettings",
            "dojo/domReady!"
        ], function (
            TrailcamSettings
        ) {
            (new TrailcamSettings()).placeAt('form').startup();
        });
    </script>
</%def>

<div id="form" style="width: 100%; height: 400px"></div>
