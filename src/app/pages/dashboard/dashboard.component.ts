import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import {Moment} from 'moment';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  constructor(private customerService: CustomerService){}

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public customerStats: any;
  public chartsStatsData = {
    labels: [],
    datasets: [
      {
        label: "Status",
        data: [],
        maxBarThickness: 10
      }
    ]
  }
  
  customers: Customer[] = [];
  previousMonthCustomers: number;
  customerCountChange: string;

  ngOnInit(): void {
    this.customerService
      .getCustomer()
      .subscribe((result: Customer[]) => {
        this.customers = result;
      });

      //Chart - Status
      this.customerService
      .getCustomerStats()
      .subscribe((result: any[]) => {
        const labels = result.map(el=> el.purpose)
        const counts = result.map(el=> el.count)
        this.chartsStatsData.labels = labels 
        this.chartsStatsData.datasets[0].data = counts
        console.log(this.chartsStatsData);
      });

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: this.chartsStatsData
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}