import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  customer: Customer;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Customer) {
    this.customer = data;
  }

}
