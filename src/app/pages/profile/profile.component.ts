import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/AuthService/auth.service';
import {TUser} from '../../../types/TUser';
import {NgForOf, NgIf} from '@angular/common';
import {TProduct} from '../../../types/TProduct';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  profile: TUser | undefined | null;
  products: TProduct[] = [];

  constructor(private authServiceService: AuthService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.authServiceService.fetchProfile();
    this.authServiceService.profile$.subscribe((profile) => {
      console.log(profile);
      this.profile = profile;
    });
    this.fetchProducts();
  }

  fetchProducts = () => {
    this.http.get<TProduct[]>(`${environment.backendBaseUrl}/product`
    ).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        for (var responseElement of response) {
          if (responseElement.productOwnerId == this.profile?.userId){
            this.products.push(responseElement);
          }
        }
        //this.products = response;
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
}
