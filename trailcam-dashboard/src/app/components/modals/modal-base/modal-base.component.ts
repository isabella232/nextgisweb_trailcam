import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';

const $ = window['jQuery'];

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent implements OnInit {
  @Input() modalBodyTemplate: TemplateRef<any>;
  @Input() title: string;
  @ViewChild('modal') modal: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  open() {
    $(this.modal.nativeElement).modal({});
  }

}
