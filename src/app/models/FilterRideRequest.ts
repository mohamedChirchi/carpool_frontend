
export class FilterRideRequest{
  departure!: string;
  destination!: string;
  status!: string;
  minPrice!: string;
  maxPrice!: string;


  constructor(departure: string, destination: string, status: string, minPrice: string, maxPrice: string) {
    this.departure = departure;
    this.destination = destination;
    this.status = status;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }
}
