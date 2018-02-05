import {TranslateService} from '@ngx-translate/core';
import {TitleService} from '../services/title.service';

export abstract class TitleBaseComponent {
  titleKeyTranslate: string;
  titleService: TitleService;
  translate: TranslateService;

  constructor(titleService: TitleService,
              translate: TranslateService) {
    this.titleService = titleService;
    this.translate = translate;

    const context = this;
    this.getTitle().then((title: string) => {
      context.titleService.change(title);
    });
  }

  abstract getTitle(): Promise<string>;
}
