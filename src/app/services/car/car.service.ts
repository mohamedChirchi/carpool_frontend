import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AddCarRequest} from "../../models/AddCarRequest";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  endpoint: string = 'http://localhost:8089/api/cars';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor( private http: HttpClient) {
  }

  addCar(car: AddCarRequest){
    return this.http
      .post<any>(`${this.endpoint}/`, car) ;
  }
  getDriverCars(){
    return this.http
      .get<any>(`${this.endpoint}/get-cars`);
  }

  delete(id: number) {
    return this.http.delete(`${this.endpoint}/delete?id=${id}`);
  }
}
