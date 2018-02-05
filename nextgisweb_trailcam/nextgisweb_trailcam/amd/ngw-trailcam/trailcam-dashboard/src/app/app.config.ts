import {environment} from '../environments/environment';

const AppConfig = {};
const WindowRef: any = window;

if (environment.production) {
  Object.assign(AppConfig, WindowRef.trailcam_dashboard_config);
} else {
  AppConfig['assets_path'] = 'assets/';
  AppConfig['locale'] = 'ru';
  AppConfig['trailcam_id'] = 96;
  AppConfig['trailcam_lat'] = 50.0;
  AppConfig['trailcam_lon'] = 50.0;
  AppConfig['items_count'] = 34;
}

export const config = AppConfig;
