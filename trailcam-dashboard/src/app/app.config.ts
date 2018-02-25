import {environment} from '../environments/environment';

const AppConfig = {};
const WindowRef: any = window;

if (environment.production) {
  Object.assign(AppConfig, WindowRef.trailcam_dashboard_config);
} else {
  AppConfig['assets_path'] = 'assets/';
  AppConfig['ngw_root_url'] = '';
  AppConfig['locale'] = 'ru';
  AppConfig['trailcam_id'] = 96;
  AppConfig['trailcam_lat'] = 50.0;
  AppConfig['trailcam_lon'] = 50.0;
  AppConfig['items_count'] = 34;
  AppConfig['items_count_by_7_days'] = [
    {'y': 23, 'x': new Date('2018-02-06T16:17:36.529777')},
    {'y': 10, 'x': new Date('2018-02-05T16:17:36.529777')},
    {'y': 2, 'x': new Date('2018-02-04T16:17:36.529777')},
    {'y': 3, 'x': new Date('2018-02-03T16:17:36.529777')},
    {'y': 8, 'x': new Date('2018-02-02T16:17:36.529777')},
    {'y': 9, 'x': new Date('2018-02-01T16:17:36.529777')},
    {'y': 15, 'x': new Date('2018-01-31T16:17:36.529777')}
  ];
  AppConfig['items_count_by_7_months'] = [
    {'y': 50, 'x': new Date('2018-02-06T16:17:36.529777')},
    {'y': 3, 'x': new Date('2018-01-05T16:17:36.529777')},
    {'y': 80, 'x': new Date('2017-12-04T16:17:36.529777')},
    {'y': 10, 'x': new Date('2017-11-03T16:17:36.529777')},
    {'y': 10, 'x': new Date('2017-10-02T16:17:36.529777')},
    {'y': 20, 'x': new Date('2017-09-01T16:17:36.529777')},
    {'y': 30, 'x': new Date('2017-08-31T16:17:36.529777')}
  ];
}

export const config = AppConfig;
