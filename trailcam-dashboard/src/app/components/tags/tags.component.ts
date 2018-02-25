import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TitleService} from '../services/title.service';
import {TitleBaseComponent} from '../base/title-base.component';
import {Page} from '../../models/view/page';
import {Tag} from '../../models/tag';
import {TagService} from '../../services/tag.service';
import {TagModalComponent} from '../modals/tag-modal/tag-modal.component';

const $ = window['jQuery'];

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent extends TitleBaseComponent implements OnInit {
  @ViewChild('modal') modal: TagModalComponent;
  titleKeyTranslate: 'tags';
  page = new Page();
  rows = new Array<Tag>();

  columns = [];

  constructor(translate: TranslateService,
              titleService: TitleService,
              private tagService: TagService) {
    super(titleService, translate);
  }

  ngOnInit() {
    this.setPage({offset: 0});

    this.translate.get(['Tag', 'Description']).subscribe((translates: object) => {
      this.columns = [
        {prop: 'name', name: translates['Tag']},
        {prop: 'description', name: translates['Description']}
      ];
    });
  }

  getTitle() {
    const context = this;
    return new Promise<string>((resolve, reject) => {
      this.translate.get('Tags').subscribe((titleTranslated: string) => {
        resolve(titleTranslated);
      });
    });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;

    this.tagService.getResults(this.page).then(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

  onCreate(event) {
    this.modal.open(new Tag(), false);
  }

  onSave(event) {

  }
}
