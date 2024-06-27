import {User} from "./User";

export class Ride{
  id!:string;
  departureLocation!:string;
  destinationLocation!:string;
  departureDate!:number;
  price!:number;
  status!:any;
  driver!:User;

}
