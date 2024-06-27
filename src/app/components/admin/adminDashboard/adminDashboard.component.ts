import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {LocalService} from "../../../services/encryption/local.service";

@Component({
  selector: 'app-adminDashboard',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public authService:AuthService,private localService:LocalService) { }
  firstName: string | null = null;
  lastName: string | null = null;
  imgUrl: string = 'http://localhost:8089/api';

  ngOnInit() {
    this.firstName = this.localService.getData('first-name');
    this.lastName = this.localService.getData('last-name');
    this.imgUrl = this.imgUrl + this.localService.getData('imgUrl');

  }

}
