import { Component } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {NgClass} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Product} from './product-page.model';
import {TUser} from '../../../types/TUser';
import {AuthService} from '../../services/AuthService/auth.service';


@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [

    FormsModule,
    NgClass

  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})



export class ProductPageComponent {
  isNightMode: boolean = false;


  protected productString: Params | undefined;

  product!: Product;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private authService: AuthService,) {}
  protected currentPrice!: number;
  productId!:number;
  productName?:string;
  productDescription?:string;
  startingPrice!:number;
  bid: number =1;
  user:TUser|undefined|null;

  ngOnInit() {
    this.fetchProduct(this.route.snapshot.params['id']);

    this.authService.fetchProfile();
    this.authService.profile$.subscribe((profile) => {
      this.user = profile;
    });
  }
  fetchProduct = (productId: number) => {
    this.http.get<Product>(`${environment.backendBaseUrl}/product/${productId}`).subscribe({
      next: (response: Product) => {
        console.log('Fetched product:', response);
        this.product = response;
        this.currentPrice = response.currentPrice;
        this.productDescription = response.productDescription;
        this.productId = response.productId;
        this.productName = response.productName;
        this.startingPrice = response.startingPrice;
      },
      error: (error: any) => {
        console.error('Fetching product failed', error);
      }
    });
  }






  toggleNightMode() {
    this.isNightMode = !this.isNightMode;
  }

  returnToHome(): void {
    this.router.navigate(['/']);
  }


  sendBid = (bid: number) => {

    if( bid<0){
      console.log('The bid must be at least 1$');
      return;
    }
    this.currentPrice += bid;
    this.http.post(`${environment.backendBaseUrl}/product/${this.productId}/bid`, {
      bidAmount: this.bid,
      userId: this.user?.userId
    }).subscribe({
      next: (response: any) => {
        console.log('Bid sent successfully', response);
      },
      error: (err: any) => {
        console.error('Sending bid failed', err);
      }
    });
  }

  protected readonly Number = Number;

}
