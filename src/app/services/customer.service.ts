import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = "Customer";
  constructor(private http: HttpClient) { }

  public getCustomer() : Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/${this.url}`);
  }
}
