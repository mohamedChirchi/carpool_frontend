import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent} from './components/admin/adminDashboard/adminDashboard.component';
import {UserDashboardComponent} from './components/user/userDashboard/userDashboard.component';
import {NotFoundComponent} from './components/shareed/NotFound/NotFound.component';
import {DriverDashboardComponent} from './components/driver/driverDashboard/driverDashboard.component';
import {AuthGuard} from './guards/Auth-guard';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {CheckEmailComponent} from './components/auth/check-email/check-email.component';
import {ForgotPasswordComponent} from "./components/auth/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./components/auth/reset-password/reset-password.component";
import {VerifyAccountComponent} from "./components/auth/verify-account/verify-account.component";
import {RideComponent} from "./components/user/ride/ride.component";
import {AppliedRidesComponent} from "./components/user/applied-rides/applied-rides.component";
import {HomeComponent} from './components/shareed/home/home.component';
import {MyItemsTabsComponent} from './components/driver/my-items-tabs/my-items-tabs.component';
import {CreateTabsComponent} from './components/driver/create-tabs/create-tabs.component';
import {ProfileInfoComponent} from './components/user/profile-info/profile-info.component';
import {ProfileInfoDriverComponent} from './components/driver/profile-info-driver/profile-info-driver.component';
import {AccountSettingsUserComponent} from './components/user/account-settings-user/account-settings-user.component';
import {
  AccountSettingsDriverComponent
} from './components/driver/account-settings-driver/account-settings-driver.component';
import {StatisticsComponent} from "./components/admin/statistics/statistics.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'check-email/:email', component: CheckEmailComponent },
  { path: 'verify-account', component: VerifyAccountComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'admin', component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      role: 'ADMIN'
    },
    children:[
      {path: '',component: StatisticsComponent},
      {path: 'statistics',component: StatisticsComponent},
      {path:'profile',component: ProfileInfoComponent},
      {path:'settings',component: AccountSettingsUserComponent}

    ]
  },
  {
    path: 'driver', component: DriverDashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      role: 'DRIVER'
    },
    children: [
      { path: '', redirectTo: 'my-items/my-rides', pathMatch: 'full' },
      { path: 'my-items', redirectTo: 'my-items/my-rides', pathMatch: 'full' },
      { path: 'my-items/:tab', component: MyItemsTabsComponent },
      { path: 'create', redirectTo: 'create/ride', pathMatch: 'full' },
      { path: 'create/:tab', component: CreateTabsComponent },
      { path: 'profile', component: ProfileInfoDriverComponent },
      { path: 'settings', component: AccountSettingsDriverComponent },
    ]
  },
  {
    path: 'user', component: UserDashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      role: 'PASSENGER'
    },
    children: [
      { path: '', redirectTo: 'rides', pathMatch: 'full' },
      { path: 'rides', component: RideComponent },
      { path: 'applied-rides', component: AppliedRidesComponent },
      { path: 'profile', component: ProfileInfoComponent },
      { path: 'settings', component: AccountSettingsUserComponent },
    ]
  },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
