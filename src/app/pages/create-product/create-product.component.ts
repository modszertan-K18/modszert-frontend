import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TUser} from '../../../types/TUser';
import {AuthService} from '../../services/AuthService/auth.service';

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

  user: TUser | undefined | null;

  constructor(private authServiceService: AuthService, private http : HttpClient, private router: Router) {
  }
  ngOnInit() {
    this.authServiceService.fetchProfile();
    this.authServiceService.profile$.subscribe((profile) => {
      this.user = profile;
    });
  }


  onSubmit() {
    const newProductData = {
      productName: this.name,
      productDescription: this.description,
      startingPrice: this.productStartingBid,
      auctionEndTime: this.endTimeOfAuction,
      productOwnerId:this.user?.userId
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
