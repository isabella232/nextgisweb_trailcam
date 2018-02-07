import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule, Title} from '@angular/platform-browser';
import {APP_INITIALIZER, Injector, LOCALE_ID, NgModule} from '@angular/core';
import {DatePipe, LOCATION_INITIALIZED, registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {AppRoutingModule} from './app-routing.module';
import {StructureModule} from './components/structure/structure.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UploadComponent} from './components/upload/upload.component';
import {MediaComponent} from './components/media/media.component';
import {EmailComponent} from './components/email/email.component';

import {TagModalComponent} from './components/modals/tag-modal/tag-modal.component';
import {ModalBaseComponent} from './components/modals/modal-base/modal-base.component';

import {config} from './app.config';
import {TagsComponent} from './components/tags/tags.component';

import {TitleService} from './components/services/title.service';
import {TagService} from './services/tag.service';

if (config['locale'] === 'ru') {
  registerLocaleData(localeRu);
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, config['assets_path'] + 'i18n/', '.json');
}

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const langToSet = config['locale'];
      translate.setDefaultLang(langToSet);
      translate.use(langToSet).subscribe(() => {
        console.log(`Successfully initialized '${langToSet}' language.'`);
      }, err => {
        console.error(`Problem with '${langToSet}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TagsComponent,
    UploadComponent,
    TagModalComponent,
    ModalBaseComponent,
    MediaComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    StructureModule,
    HttpClientModule,
    NgxDatatableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: config['locale']
    },
    TitleService,
    TagService,
    Title,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
