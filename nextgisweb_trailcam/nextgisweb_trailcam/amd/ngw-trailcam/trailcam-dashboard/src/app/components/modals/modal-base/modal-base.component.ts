import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

const $ = window['jQuery'];

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent implements OnInit {
  @Input() modalBodyTemplate: TemplateRef<any>;
  @ViewChild('modal') modal: ElementRef;
  title = 'Empty title';

  constructor() {
  }

  ngOnInit() {
  }

  open() {
    $(this.modal.nativeElement).modal({});
  }

}
