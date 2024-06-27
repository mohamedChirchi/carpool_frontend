import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckEmailComponent } from './components/auth/check-email/check-email.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import {ForgotPasswordComponent} from "./components/auth/forgot-password/forgot-password.component";
import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "./components/shareed/interceptors/auth.interceptor";
import {AddRideComponent} from "./components/driver/add-ride/add-ride.component";
import {VerifyAccountComponent} from "./components/auth/verify-account/verify-account.component";
import {HeaderComponent} from "./components/layout/header/header.component";
import {FooterComponent} from "./components/layout/footer/footer.component";
import {SpinnerComponent} from "./components/shareed/spinner/spinner.component";
import { RideComponent } from './components/user/ride/ride.component';
import {MatInputModule} from "@angular/material/input";
import {DriverDashboardComponent} from "./components/driver/driverDashboard/driverDashboard.component";
import { AddCarComponent } from './components/driver/add-car/add-car.component';
import { ListCarsComponent } from './components/driver/list-cars/list-cars.component';
import {UserDashboardComponent} from "./components/user/userDashboard/userDashboard.component";
import { RequestedRidesComponent } from './components/driver/requested-rides/requested-rides.component';
import { AppliedRidesComponent } from './components/user/applied-rides/applied-rides.component';
import { ListDriverRidesComponent } from './components/driver/list-driver-rides/list-driver-rides.component';
import { HomeComponent } from './components/shareed/home/home.component';
import { MyItemsTabsComponent } from './components/driver/my-items-tabs/my-items-tabs.component';
import { CreateTabsComponent } from './components/driver/create-tabs/create-tabs.component';
import { StatisticsComponent } from './components/admin/statistics/statistics.component';
import {AccountSettingsUserComponent} from "./components/user/account-settings-user/account-settings-user.component";
import {ProfileInfoDriverComponent} from "./components/driver/profile-info-driver/profile-info-driver.component";
import {
  AccountSettingsDriverComponent
} from "./components/driver/account-settings-driver/account-settings-driver.component";
import {AdminDashboardComponent} from "./components/admin/adminDashboard/adminDashboard.component";
import {ProfileInfoComponent} from "./components/user/profile-info/profile-info.component";
import {NgChartsModule} from "ng2-charts";

// Import ReactiveFormsModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CheckEmailComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    AddRideComponent,
    VerifyAccountComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    RideComponent,
    DriverDashboardComponent,
    AddCarComponent,
    ListCarsComponent,
    UserDashboardComponent,
    RequestedRidesComponent,
    AppliedRidesComponent,
    ListDriverRidesComponent,
    HomeComponent,
    MyItemsTabsComponent,
    CreateTabsComponent,
    StatisticsComponent,
    AccountSettingsUserComponent,
    ProfileInfoDriverComponent,
    AccountSettingsDriverComponent,
    AdminDashboardComponent,
    ProfileInfoComponent
  ],
    imports: [
        ToastrModule.forRoot(),
        BrowserModule,
      NgChartsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        MatInputModule

    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
