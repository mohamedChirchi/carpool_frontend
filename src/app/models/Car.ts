
export class Car{
   id!:number;
    carBrand !:string ;
    carModel!:string;
    carColor!:string;
    carSeats!:string;


  constructor(carBrand: string, carModel: string, carColor: string, carSeats: string) {
    this.carBrand = carBrand;
    this.carModel = carModel;
    this.carColor = carColor;
    this.carSeats = carSeats;
  }
}
