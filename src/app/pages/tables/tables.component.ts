import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

  customers: Customer[] = [];

  constructor(private customerServices: CustomerService, private dialogRef : MatDialog) {}

  ngOnInit(): void{
    this.customerServices
    .getCustomer()
    .subscribe((result: Customer[]) => (this.customers = result));
  }

}
