export class ApplyForRideRequest{
  depart!: string;
  arrive!: string;
  nombrePlace!: number;
  price!: number;
  time!: string;

  constructor(depart:string,arrive:string,nb:number,price:number,time:string) {
    this.depart=depart;
    this.arrive=arrive;
    this.nombrePlace=nb;
    this.price=price;
    this.time=time;
  }


}
