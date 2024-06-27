import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/dark-mode.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalService } from 'src/app/services/encryption/local.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    public darkModeService: DarkModeService,
    private localService: LocalService,
    public router: Router
    ) { }
  firstName: string | null = null;
  lastName: string | null = null;
  destination!:string;
  ngOnInit(): void {
    this.firstName = this.localService.getData('first-name') ;
    this.lastName = this.localService.getData('last-name') ;
  }
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
  search(){
    if(this.authService.isLoggedIn)
      this.router.navigate(['/user/rides', {destination:this.destination}]);
    else
      this.router.navigate(['/rides', {destination:this.destination}]);
  }

  switchDashboard() {
    const currentRoute = this.router.url;
    const targetDashboard = currentRoute.includes('/driver') ? '/user' : '/driver';
    this.router.navigate([targetDashboard]);
  }
  shouldDisplaySwitchButton(): boolean {
    return this.authService.getToken() ? this.authService.getRoles().length === 2 : false;
  }
}
