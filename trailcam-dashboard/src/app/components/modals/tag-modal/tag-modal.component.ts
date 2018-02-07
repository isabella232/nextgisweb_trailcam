import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IModal} from '../interfaces/IModal';
import {ModalBaseComponent} from '../modal-base/modal-base.component';

const $ = window['jQuery'];

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.scss']
})
export class TagModalComponent implements OnInit, IModal {
  title: string;
  @ViewChild('modalBase') modalBase: ModalBaseComponent;

  constructor() {
  }

  getValues(): object {
    return undefined;
  }


  open(o: object) {
    this.modalBase.open();
  }

  close(): void {
  }

  ngOnInit() {
  }
}
