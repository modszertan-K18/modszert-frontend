import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Product } from './product-page.model';
import { TUser } from '../../../types/TUser';
import { AuthService } from '../../services/AuthService/auth.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [FormsModule, NgClass, DatePipe, NgIf],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  isNightMode: boolean = false;
  isUserSameAsSeller: boolean = false;

  protected productString: Params | undefined;
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  protected currentPrice!: number;
  productId!: number;
  productName?: string;
  productDescription?: string;
  startingPrice!: number;
  bid: number = 1;
  user: TUser | undefined | null;
  countdown: string = '';
  private countdownSubscription: Subscription | null = null;

  ngOnInit() {
    this.fetchProduct(this.route.snapshot.params['id']);

    this.authService.fetchProfile();
    this.authService.profile$.subscribe((profile) => {
      this.user = profile;
    });

    this.checkIfUserIsSameAsSeller();
  }

  fetchProduct = (productId: number) => {
    this.http
      .get<Product>(`${environment.backendBaseUrl}/product/${productId}`)
      .subscribe({
        next: (response: Product) => {
          console.log('Fetched product:', response);
          console.log({ response });
          this.product = response;
          this.currentPrice = response.currentPrice;
          this.productDescription = response.productDescription;
          this.productId = response.productId;
          this.productName = response.productName;
          this.startingPrice = response.startingPrice;
          this.startCountdown(response.auctionEndTime);
        },
        error: (error: any) => {
          console.error('Fetching product failed', error);
        },
      });
  };

  startCountdown(auctionEndTime: string) {
    const auctionEndDate = new Date(auctionEndTime).getTime();

    this.countdownSubscription = interval(1000).subscribe(() => {
      const now = new Date().getTime();
      const timeLeft = auctionEndDate - now;

      if (timeLeft <= 0) {
        this.countdown = 'Auction ended';
        if (this.countdownSubscription) {
          this.countdownSubscription.unsubscribe();
        }
      } else {
        this.countdown = this.formatTimeLeft(timeLeft);
      }
    });
  }

  formatTimeLeft(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return days
      ? `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
      : hours
      ? `${hours} hours ${minutes} minutes ${seconds} seconds`
      : `${minutes} minutes ${seconds} seconds`;
  }

  toggleNightMode() {
    this.isNightMode = !this.isNightMode;
  }

  returnToHome(): void {
    this.router.navigate(['/']);
  }

  sendBid = (bid: number) => {
    if (bid < 0) {
      console.log('The bid must be at least 1$');
      return;
    }
    this.currentPrice += bid;
    this.http
      .post(`${environment.backendBaseUrl}/product/${this.productId}/bid`, {
        bidAmount: this.bid,
        userId: this.user?.userId,
      })
      .subscribe({
        next: (response: any) => {
          console.log('Bid sent successfully', response);
        },
        error: (err: any) => {
          console.error('Sending bid failed', err);
        },
      });
  };

  delete() {
    this.http
      .delete(`${environment.backendBaseUrl}/product/delete/${this.productId}`)
      .subscribe({
        next: (response: any) => {
          console.log('Deleted product:', response);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Deleting product failed:', error);
        },
      });
  }

  checkIfUserIsSameAsSeller(){
    this.http
      .get(`${environment.backendBaseUrl}/product/${this.route.snapshot.params['id']}`)
      .subscribe({
        next: (response: any) => {
          this.isUserSameAsSeller = response.productOwnerId == this.user?.userId;
        },error (error: any) {
          console.error('Cannot access product', error);
        },
      });
  }


  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  protected readonly Number = Number;
}
