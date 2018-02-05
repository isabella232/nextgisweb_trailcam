import {Component, OnInit, ElementRef} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {TitleService} from '../../services/title.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  location: Location;
  title: string;
  private toggleButton: any;
  private sidebarVisible: boolean;

  titleService: TitleService;

  constructor(location: Location,
              titleService: TitleService,
              private element: ElementRef) {
    this.titleService = titleService;
    this.location = location;
    this.sidebarVisible = false;

    const context = this;
    this.titleService.changed.subscribe((title) => {
      context.title = title;
    });
  }

  ngOnInit() {
    const context = this;
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    body.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
}
