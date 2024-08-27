import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupDetailComponent } from 'src/app/components/popup-detail/popup-detail.component';



@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

  customers: Customer[] = [];

  constructor(private customerServices: CustomerService, private modalService: NgbModal) {}

  ngOnInit(): void{
    this.customerServices
    .getCustomer()
    .subscribe((result: Customer[]) => (this.customers = result));
  }

  openDetails(customer: any): void {
    const modalRef = this.modalService.open(PopupDetailComponent, { size: 'lg' });
    modalRef.componentInstance.customer = customer;
  }

}
