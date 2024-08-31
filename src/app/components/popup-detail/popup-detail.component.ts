import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';



@Component({
  selector: 'app-popup-detail',
  templateUrl: './popup-detail.component.html',
  styleUrls: ['./popup-detail.component.scss']
})
export class PopupDetailComponent implements OnInit  {
  @Input() customer: Customer;
  @Output() heroesUpdated = new EventEmitter<Customer[]>();

  constructor(private modalService: NgbModal, private customerService: CustomerService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  updateHero(customer: Customer) {
    this.customerService
      .updateHero(customer)
      .subscribe((customers: Customer[]) => this.heroesUpdated.emit(customers));
    this.modalService.dismissAll();
  }


  dismiss(): void {
    this.modalService.dismissAll();
  }
}
