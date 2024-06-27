import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/models/LoginRequest';
import {LocalService} from "../../../services/encryption/local.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private localService:LocalService,private authservice:AuthService,private formBuilder: FormBuilder){
  }
  userForm!: FormGroup;

  ngOnInit() {
    if (this.authservice.getToken())
      this.authservice.navigate();

      this.userForm = this.formBuilder.group({
        email: [this.localService.getData("email"), [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
        password: ['', Validators.required]
      });

  }
  onLogin(){
    if (this.userForm.invalid) {
      return;
    }
    this.authservice.login(new LoginRequest(this.userForm.value['email'],this.userForm.value['password']));
  }

}
