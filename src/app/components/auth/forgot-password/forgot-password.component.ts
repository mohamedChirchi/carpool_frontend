import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {ForgotPasswordRequest} from "../../../models/ForgotPasswordRequest";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent  implements OnInit{
  form: FormGroup = new FormGroup({
    oldPassword: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  constructor(private authService:AuthService , private formBuilder: FormBuilder,public router: Router) {
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required,
          Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$") ]]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.forgotPassword(new ForgotPasswordRequest(this.f['email'].value));
  }

}
