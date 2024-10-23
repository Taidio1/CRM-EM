import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { ConfirmModalComponent } from '../popup-detail/popup-detail.component';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-popup-edit',
  templateUrl: './popup-edit.component.html',
  styleUrls: ['./popup-edit.component.scss']
})
export class PopupEditComponent implements OnInit {
  customer: Customer;
  @Output() customerUpdate = new EventEmitter<Customer[]>();

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  updateCustomer(customer: Customer) {
    const confirmModal = this.modalService.open(ConfirmModalComponent, { size: 'sm' });
    confirmModal.componentInstance.message = 'Czy na pewno chcesz zapisać zmiany?';
    confirmModal.result.then((result) => {
      if (result) {
        this.customerService
          .updateCustomer(customer)
          .subscribe((customers: Customer[]) => this.customerUpdate.emit(customers));
        this.modalService.dismissAll();
      }
    });
  }


}
