import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TProduct} from "../../../types/TProduct";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {routes} from "../../app.routes";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: TProduct[] = [];

  constructor(private router: Router, private http: HttpClient) {
  }

  navigateToCreateProduct() {
    this.router.navigate(['create']);
  }

  fetchProducts = () => {
    this.http.get<TProduct[]>(`${environment.backendBaseUrl}/product`
    ).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.products = response;
      },
      error: (error) => {
        console.error('fetching products failed', error);
      }
    });
  }

  navigateToProductPage(product: TProduct) {
    console.log({sourceProduct: product})
    this.router.navigate([`/product/${product.productId}`]);
  }

  ngOnInit() {
    this.fetchProducts();
  }
}
