import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Mode } from './components/mode-toggle-btn/mode-toggle/mode-toggle.model';
import { ModeToggleService } from './components/mode-toggle-btn/mode-toggle/mode-toggle.service';
import { Customer } from './models/customer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard-angular';
  currentMode: Mode = Mode.LIGHT;
  customers: Customer[] = [];
  constructor(private modeToggleService: ModeToggleService) {
    /**
     * Example code that demonstrate the modeChanged$ observable behavior and usage
     */
    this.modeToggleService.modeChanged$.subscribe((mode: Mode) => {
      this.currentMode = mode;
    });
  }
}
