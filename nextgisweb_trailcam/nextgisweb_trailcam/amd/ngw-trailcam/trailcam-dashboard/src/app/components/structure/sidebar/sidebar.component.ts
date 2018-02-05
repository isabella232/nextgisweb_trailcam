import {Component, OnInit} from '@angular/core';
import {config} from '../../../app.config';
import {TranslateService} from '@ngx-translate/core';
import {RouteService} from '../../services/route.service';


declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  routeService: RouteService;
  menuItems: any[];
  config: any = config;

  constructor(translate: TranslateService,
              routeService: RouteService) {
    this.routeService = routeService;
  }

  ngOnInit() {
    const context = this;
    this.routeService.getRoutesInfo().then((routesInfo: RouteInfo[]) => {
      context.menuItems = routesInfo;
    });
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
