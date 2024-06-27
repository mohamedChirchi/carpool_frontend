export class AddRideRequest{
  departureLocation!: string;
  destinationLocation!: string;
  price!: number;
  departureDate!: Date;
  cardId:number;
  constructor(departureLocation:string,destinationLocation:string,price:number,date:Date,carId:number) {
    this.departureLocation=departureLocation;
    this.destinationLocation=destinationLocation;
    this.price=price;
    this.departureDate=date;
    this.cardId=carId
  }


}
