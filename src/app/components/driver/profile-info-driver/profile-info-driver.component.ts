import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/services/encryption/local.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-profile-info-driver',
  templateUrl: './profile-info-driver.component.html',
  styleUrls: ['./profile-info-driver.component.css']
})
export class ProfileInfoDriverComponent implements OnInit {
  firstName = '';
  lastName = '';
  address = '';
  phoneNumber = '';
  imgUrl: File | null = null;
  private endpoint: string = 'http://localhost:8089/api';

  constructor(
    private localService: LocalService,
    private apiService: UserDataService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.firstName = this.localService.getData('first-name') || '';
    this.lastName = this.localService.getData('last-name') || '';
    this.address = this.localService.getData('address') || '';
    this.phoneNumber = this.localService.getData('phoneNumber') || '';
  }

  onFileSelected(event: any) {
    this.imgUrl = event.target.files[0];
  }
  updateUserProfile() {
    const userFormData = new FormData();

    userFormData.append('firstName', this.firstName);
    userFormData.append('lastName', this.lastName);
    userFormData.append('address', this.address);
    userFormData.append('phoneNumber', this.phoneNumber);

    if (this.imgUrl instanceof File) {
      userFormData.append('imgUrl', this.imgUrl, this.imgUrl.name);
    }

    this.http.patch<any>(`${this.endpoint}/users/update/data`, userFormData).subscribe(
      (response) => {
        if (response.http_code === 200) {
          this.localService.saveData('first-name', response.firstName);
          this.localService.saveData('last-name', response.lastName);
          this.localService.saveData('address', response.address);
          this.localService.saveData('phoneNumber', response.phoneNumber);
          this.localService.saveData('imgUrl', response.imgUrl);

          this.toaster.success(response.message);
          
          window.location.reload();
        } else {
          this.toaster.error(response.errors);
          console.error('Failed to update profile:', response.errors);
        }
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }
}