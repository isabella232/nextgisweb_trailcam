import {EventEmitter, Injectable, Output} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class TitleService {
  @Output() changed: EventEmitter<string> = new EventEmitter();


  constructor(private titleService: Title,
              private translate: TranslateService) {
  }


  change(title: string) {
    const context = this;
    this.translate.get('AppName').subscribe((appNameTranslated) => {
      context.titleService.setTitle(appNameTranslated + title);
    });
    this.changed.emit(title);
  }
}
