import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ConfirmModalComponent } from '../popup-detail/popup-detail.component';

@Component({
  selector: 'app-popup-add',
  templateUrl: './popup-add.component.html',
  styleUrls: ['./popup-add.component.scss']
})
export class PopupAddComponent implements OnInit {
  @Input() customer: Customer;
  @Output() customerCreate = new EventEmitter<Customer[]>();

  constructor(private modalService: NgbModal,  private customerService: CustomerService) { }

  createCustomer(customer: Customer){
    const confirmModal = this.modalService.open(ConfirmModalComponent, { size: 'sm' });
    confirmModal.componentInstance.message = 'Czy na pewno chcesz zapisać zmiany?';
    confirmModal.result.then((result) => {
      if (result) {
        this.customerService
        .createCustomer(customer)
        .subscribe((customers: Customer[]) => this.customerCreate.emit(customers))
        this.modalService.dismissAll();
      }
  });
}

  ngOnInit(): void {
  }

  closeAddCustomerPopup(): void {
    this.modalService.dismissAll();
  }
  
}
