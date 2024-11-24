import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  name: string = '';
  description: string = '';
  productStartingBid: number = 0;
  endTimeOfAuction: Date = new Date();

  constructor(private http: HttpClient, private router: Router) {}


  onSubmit() {
    const newProductData = {
      productName: this.name,
      productDescription: this.description,
      startingPrice: this.productStartingBid,
      auctionEndTime: this.endTimeOfAuction,
    }


    this.http.post(`${environment.backendBaseUrl}/product`, newProductData, {
      withCredentials: true
    }).subscribe({
      next: (response: any) => {
        console.log('Creating product successful', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Creating product failed', error);
      }
    });
  }
}
