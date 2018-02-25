import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IModal} from '../interfaces/IModal';
import {ModalBaseComponent} from '../modal-base/modal-base.component';
import {Tag} from '../../../models/tag';
import {TranslateService} from '@ngx-translate/core';

const $ = window['jQuery'];

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.scss']
})
export class TagModalComponent implements OnInit, IModal {
  @ViewChild('modalBase') modalBase: ModalBaseComponent;
  @Input() editable: boolean;
  title = '';
  tag: Tag;

  translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
    this.tag = new Tag();
  }

  getValues(): object {
    return undefined;
  }

  open(tag: Tag, editable: boolean) {
    this.editable = editable;
    this.tag = tag;
    this.setTitle();
    this.modalBase.open();
  }

  close(): void {
  }

  ngOnInit() {
  }

  setTitle() {
    const context = this;

    if (this.editable) {
      return this.translate.get('Edit tag').subscribe(title => {
        context.title = title;
      });
    } else {
      this.translate.get('Create tag').subscribe(title => {
        context.title = title;
      });
    }
  }
}
