import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-popup-detail',
  templateUrl: './popup-detail.component.html',
  styleUrls: ['./popup-detail.component.scss']
})
export class PopupDetailComponent {
  @Input() customer: any;

  constructor(private modalService: NgbModal) { }

  dismiss(): void {
    this.modalService.dismissAll();
  }
}
