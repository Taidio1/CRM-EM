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
  @Input() customer: Customer = new Customer;
  @Output() customerCreate = new EventEmitter<Customer[]>();
  successMessageVisible: boolean = false; 
  constructor(private modalService: NgbModal,  private customerService: CustomerService) { }
  
  ngOnInit(): void {
  }

  createCustomer(customer: Customer) {
    this.customerService
      .createCustomer(customer)
      .subscribe((customers: Customer[]) => this.customerCreate.emit(customers));
      this.showSuccessMessage();
      setTimeout(() => {
        this.closeAddCustomerPopup();
      }, 3000);
  }


  showSuccessMessage(): void {
    this.successMessageVisible = true; // Ustaw widoczność komunikatu na true
    setTimeout(() => {
      this.successMessageVisible = false; // Ustaw widoczność komunikatu na false po 25 sekundach
    }, 25000);
  }

  closeAddCustomerPopup(): void {
    this.modalService.dismissAll();
  }
  
}
