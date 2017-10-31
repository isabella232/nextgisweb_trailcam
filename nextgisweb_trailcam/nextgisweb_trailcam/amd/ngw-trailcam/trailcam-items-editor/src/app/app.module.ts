import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {DateTimePickerModule} from 'ng-pick-datetime';
import {TagInputModule} from 'ngx-chips';
import {GalleryConfig, GalleryModule} from 'ng-gallery';

import {AppComponent} from './app.component';

import 'material-design-lite/material.min.js';
import {MDL} from './MaterialDesignLiteUpgradeElement';

export const galleryConfig: GalleryConfig = {
  'style': {
    'background': '#121519',
    'width': '900px',
    'height': '500px'
  },
  'animation': 'fade',
  'loader': {
    'width': '50px',
    'height': '50px',
    'position': 'center',
    'icon': 'oval'
  },
  'description': {
    'position': 'bottom',
    'overlay': false,
    'text': true,
    'counter': true
  },
  'bullets': false,
  'navigation': true,
  'player': {
    'autoplay': false,
    'speed': 3000
  },
  'thumbnails': {
    'width': 120,
    'height': 90,
    'position': 'top',
    'space': 20
  }
};

@NgModule({
  declarations: [
    MDL,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DateTimePickerModule,
    TagInputModule,
    GalleryModule.forRoot(galleryConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
