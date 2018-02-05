<%! from nextgisweb_trailcam.util import _ %>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>${tr(_("Trail camera dashboard"))} ${trailcam.display_name}</title>
    <base href="${request.current_route_url()}">

    <link rel="icon" type="image/x-icon" href="favicon.ico">

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>
    <link href="${request.route_url('amd_package', subpath='ngw-trailcam/trailcam-dashboard/dist/styles.bundle.css')}"
          rel="stylesheet"/>

    <script>
        var trailcam_dashboard_config = {
            assets_path: "${request.route_url('amd_package', subpath='ngw-trailcam/trailcam-dashboard/dist/assets/')}",
            locale: "${request.locale_name}",
            trailcam_id: ${trailcam.id},
            trailcam_lat: ${trailcam.lat},
            trailcam_lon: ${trailcam.lon},
            items_count: ${items_count},
            ngw_root_url: "${request.application_url}"
        };
    </script>

</head>
<body>
<app-root></app-root>

<script src="${request.route_url('amd_package', subpath='ngw-trailcam/trailcam-dashboard/dist/inline.bundle.js')}"></script>
<script src="${request.route_url('amd_package', subpath='ngw-trailcam/trailcam-dashboard/dist/polyfills.bundle.js')}"></script>
<script src="${request.route_url('amd_package', subpath='ngw-trailcam/trailcam-dashboard/dist/scripts.bundle.js')}"></script>
<script src="${request.route_url('amd_package', subpath='ngw-trailcam/trailcam-dashboard/dist/vendor.bundle.js')}"></script>
<script src="${request.route_url('amd_package', subpath='ngw-trailcam/trailcam-dashboard/dist/main.bundle.js')}"></script>
</body>
</html>