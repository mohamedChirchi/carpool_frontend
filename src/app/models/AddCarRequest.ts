
export class AddCarRequest{
  brand !:string ;
  model!:string;
  color!:string;
  seats!:string;


  constructor(brand: string, model: string, color: string, seats: string) {
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.seats = seats;
  }
}
