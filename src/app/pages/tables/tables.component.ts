import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupDetailComponent } from 'src/app/components/popup-detail/popup-detail.component';
import { PopupAddComponent } from 'src/app/components/popup-add/popup-add.component';
import { FormsModule } from '@angular/forms';



/**
 * Komponent odpowiedzialny za wyświetlanie tabeli z danymi klientów.
 */
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TablesComponent {
  customerToCreate? : Customer;
  displayedColumns: string[] = ['IMIĘ I NAZWISKO', 'STATUS', 'CEL POBYTU	', 'NR SPRAWY	','DATA ZAK. POB'];
  clickedRows = new Set<Customer>();

  
  searchText = '';
  /**
   * Tablica przechowująca dane klientów.
   */
  customers: Customer[] = [];
  allCustomers: Customer[] = [];
  selectedStatus: string = ''; // store the selected status

  public pageSize = 20; // Domyślna ilość pozycji do wyświetlenia
  public pageSizes = [20, 40, 60, 100];
  public currentPage = 1; // Aktualna strona
  public totalPages: number; // Łączna liczba stron
  public pages: number[] = [];
 

   /**
   * Konstruktor komponentu.
   * @param customerServices Serwis odpowiedzialny za pobieranie danych klientów.
   * @param modalService Serwis odpowiedzialny za wyświetlanie okien modalnych.
   */
  constructor(private customerServices: CustomerService, private modalService: NgbModal) { }
  /**
   * Metoda wywoływana po zainicjowaniu komponentu.
   * Pobiera dane klientów z serwisu i przypisuje je do tablicy customers.
   */
  ngOnInit(): void {
    this.customerServices
      .getCustomer()
      .subscribe((result: Customer[]) => {
        this.allCustomers = result;
        this.customers = result.slice(0, this.pageSize); // Pobierz tylko pierwsze 'pageSize' pozycji
        this.totalPages = Math.ceil(result.length / this.pageSize); // Oblicz łączną liczbę stron
      });
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.filterCustomers();
  }

  filterCustomers(): void {
    this.customers = this.allCustomers.filter(customer => customer.status === this.selectedStatus);
    if(this.selectedStatus === ""){
      this.customers = this.allCustomers
    }
    this.currentPage = 1; // Reset current page to 1
    this.totalPages = Math.ceil(this.customers.length / this.pageSize); // Recalculate total pages
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

  isActivePage(page: any): boolean {
    return page === this.currentPage;
  }

  /**
   * Metoda otwierająca okno modalne z detalami klienta.
   * @param customer Klient, którego dane będą wyświetlane w oknie modalnym.
   */
  openDetails(customer: any): void {
    const modalRef = this.modalService.open(PopupDetailComponent, { size: 'lg' });
    modalRef.componentInstance.customer = customer;
  }
  addCustomerPopup(): void {
    this.customerToCreate = new Customer();
    this.modalService.open(PopupAddComponent, { size: 'lg' });
  }
  
}
