import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = "Customer";
  constructor(private http: HttpClient) { }

  public getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/${this.url}`).pipe(
      map(customers => 
        customers.filter(customer => 
          customer.status === 'Aktywny' || 
          customer.status === 'W trakcie' || 
          customer.status === 'Planowany'
        )
      )
    );
  }


  public updateCustomer(customer: Customer): Observable<Customer[]> {
    return this.http.put<Customer[]>(
      `${environment.apiUrl}/${this.url}`,
      customer
    );
  }

  public createCustomer(customer: Customer): Observable<Customer[]> {
    return this.http.post<Customer[]>(
      `${environment.apiUrl}/${this.url}`,
      customer
    );
  }

  public deleteCustomer(customer: Customer): Observable<Customer[]> {
    return this.http.delete<Customer[]>(
      `${environment.apiUrl}/${this.url}/${customer.id}`
    );
  }


  public getCustomerStats(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${this.url}/customer-purpose-stats`);
  }

}
