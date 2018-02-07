import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

export declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

@Injectable()
export class RouteService {
  translate: TranslateService;
  routesInfo: RouteInfo[] = [
    {path: 'start', title: 'Dashboard', icon: 'dashboard', class: ''},
    {path: 'media', title: 'Photo', icon: 'photo_library', class: ''},
    {path: 'upload', title: 'Upload', icon: 'file_upload', class: ''},
    {path: 'tags', title: 'Tags', icon: 'library_books', class: ''},
    {path: 'email', title: 'Email', icon: 'email', class: ''}
  ];

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  getRoutesInfo() {
    const context = this;

    return new Promise((resolve, reject) => {
      const titleKeys = context.routesInfo.map(routeInfo => routeInfo.title);
      context.translate.get(titleKeys).subscribe((res: object) => {
        context.routesInfo.forEach(function (routeInfo, i, arr) {
          const title = context.routesInfo[i].title;
          context.routesInfo[i].title = res[title];
        });
        resolve(context.routesInfo);
      });
    });
  }

}
