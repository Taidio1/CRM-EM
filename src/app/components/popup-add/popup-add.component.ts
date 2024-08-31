import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-add',
  templateUrl: './popup-add.component.html',
  styleUrls: ['./popup-add.component.scss']
})
export class PopupAddComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  closeAddCustomerPopup(): void {
    this.modalService.dismissAll();
  }
  
}
