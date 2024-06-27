import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-settings-driver',
  templateUrl: './account-settings-driver.component.html',
  styleUrls: ['./account-settings-driver.component.css']
})
export class AccountSettingsDriverComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmationPassword: string = '';
  private endpoint: string = 'http://localhost:8089/api';

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
  ) { }


  updatePassword() {
    if (this.newPassword !== this.confirmationPassword) {
      this.toastr.error('New password and confirm password do not match');
      return;
    }
    const requestBody = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmationPassword: this.confirmationPassword,
    };

    this.http.patch<any>(`${this.endpoint}/users/update/password`, requestBody).subscribe(
      (response) => {
        if (response.http_code === 200) {

          this.toastr.success(response.message);
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmationPassword = '';
        } else {
          this.toastr.error(response.errors);
          console.error('Failed to update profile:', response.errors);
        }
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }
}