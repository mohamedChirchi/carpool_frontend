import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { UpdateDataRequest } from "src/app/models/UpdateDataRequest";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private endpoint: string = 'http://localhost:8089/api';

  constructor(private http: HttpClient) {}

  updateData(user: UpdateDataRequest) {
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('address', user.address);
    formData.append('phoneNumber', user.phoneNumber);
   /*  formData.append('image', user.image);
     */
    return this.http.patch<any>(`${this.endpoint}/users/update/data`, formData);
  }
}
