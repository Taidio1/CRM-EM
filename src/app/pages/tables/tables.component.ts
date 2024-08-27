import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupDetailComponent } from 'src/app/components/popup-detail/popup-detail.component';



/**
 * Komponent odpowiedzialny za wyświetlanie tabeli z danymi klientów.
 */
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

  /**
   * Tablica przechowująca dane klientów.
   */
  customers: Customer[] = [];

  /**
   * Konstruktor komponentu.
   * @param customerServices Serwis odpowiedzialny za pobieranie danych klientów.
   * @param modalService Serwis odpowiedzialny za wyświetlanie okien modalnych.
   */
  constructor(private customerServices: CustomerService, private modalService: NgbModal) { }

  public pageSize = 20; // Domyślna ilość pozycji do wyświetlenia
  public pageSizes = [20, 40, 60, 100];
  public currentPage = 1; // Aktualna strona
  public totalPages: number; // Łączna liczba stron
  public pages: number[] = [];

  /**
   * Metoda wywoływana po zainicjowaniu komponentu.
   * Pobiera dane klientów z serwisu i przypisuje je do tablicy customers.
   */
  ngOnInit(): void {
    this.customerServices
      .getCustomer()
      .subscribe((result: Customer[]) => {
        this.customers = result.slice(0, this.pageSize); // Pobierz tylko pierwsze 'pageSize' pozycji
        this.totalPages = Math.ceil(result.length / this.pageSize); // Oblicz łączną liczbę stron
      });
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

   // Funkcja do zmiany ilości pozycji do wyświetlenia
   public changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1; // Reset current page to 1
    this.customerServices
      .getCustomer()
      .subscribe((result: Customer[]) => {
        this.customers = result.slice(0, this.pageSize); // Pobierz tylko pierwsze 'pageSize' pozycji
        this.totalPages = Math.ceil(result.length / this.pageSize); // Oblicz łączną liczbę stron
      });
  }

    // Funkcja do przewinięcia do następnej strony
    public nextPage(): void {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.customerServices.getCustomer().subscribe((customers: Customer[]) => {
          this.customers = customers.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        });
      }
    }

      // Funkcja do przewinięcia do poprzedniej strony
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.customerServices.getCustomer().subscribe((customers: Customer[]) => {
        this.customers = customers.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      });
    }
  }

  /**
   * Metoda otwierająca okno modalne z detalami klienta.
   * @param customer Klient, którego dane będą wyświetlane w oknie modalnym.
   */
  openDetails(customer: any): void {
    const modalRef = this.modalService.open(PopupDetailComponent, { size: 'lg' });
    modalRef.componentInstance.customer = customer;
  }

}
