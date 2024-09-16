import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';



@Component({
  selector: 'app-popup-detail',
  templateUrl: './popup-detail.component.html',
  styleUrls: ['./popup-detail.component.scss']
})
export class PopupDetailComponent implements OnInit  {
  @Input() customer: Customer;
  @Output() customerUpdate = new EventEmitter<Customer[]>();

  constructor(private modalService: NgbModal, private customerService: CustomerService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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


  dismiss(): void {
    this.modalService.dismissAll();
  }
}


// nowy komponent modalny do potwierdzenia
@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Potwierdzenie</h5>
      <button type="button" class="close" aria-label="Close" (click)="dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="dismiss()">Anuluj</button>
      <button type="button" class="btn btn-primary" (click)="confirm()">Tak</button>
    </div>
  `,
})
export class ConfirmModalComponent {
  @Input() message: string;

  constructor(private activeModal: NgbActiveModal) { }

  dismiss() {
    this.activeModal.dismiss();
  }

  confirm() {
    this.activeModal.close(true);
  }
}