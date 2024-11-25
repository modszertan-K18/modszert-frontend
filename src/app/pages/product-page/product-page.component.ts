import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    NgClass,
    FormsModule
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  isNightMode: boolean = false;

  toggleNightMode() {
    this.isNightMode = !this.isNightMode;
  }
}
