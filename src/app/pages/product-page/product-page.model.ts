export interface Product {
  auctionEndTime: string;
  auctionStartTime: string | null;
  currentBid: number;
  productDescription: string;
  productId: number;
  productName: string;
  startingPrice: number;
}
