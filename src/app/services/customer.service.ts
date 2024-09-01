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


  public updateHero(customer: Customer): Observable<Customer[]> {
    return this.http.put<Customer[]>(
      `${environment.apiUrl}/${this.url}`,
      customer
    );
  }

  public createHero(customer: Customer): Observable<Customer[]> {
    return this.http.post<Customer[]>(
      `${environment.apiUrl}/${this.url}`,
      customer
    );
  }

  public deleteHero(customer: Customer): Observable<Customer[]> {
    return this.http.delete<Customer[]>(
      `${environment.apiUrl}/${this.url}/${customer.id}`
    );
  }


  public getCustomerStats(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${this.url}/customer-purpose-stats`);
  }

}
