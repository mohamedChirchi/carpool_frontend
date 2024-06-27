import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RideInfo } from 'src/app/models/RideInfo';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountdownService } from 'src/app/services/countdown/countdown.service';
import { RideRequestService } from 'src/app/services/ride/ride-request.service';
import { RideService } from 'src/app/services/ride/ride.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  latestRides!: RideInfo[];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  countdown: { days: number, hours: number, minutes: number, seconds: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };


  backendEndpoint: string = 'http://localhost:8089/api';

  constructor(
    private rideService: RideService,
    private rideRequestService: RideRequestService,
    private authSerice: AuthService,
    private router: Router,
    private countdownService: CountdownService,
  ) { }


  ngOnInit(): void {
    this.getLatestRides(this.currentPage, this.itemsPerPage);
  }


  ngOnDestroy(): void {
    this.stopCountdown();
  }

  stopCountdown(): void {
    if (this.latestRides) {
      this.latestRides.forEach(ride => {
        ride.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }
  }

  startCountdown(ride: RideInfo): void {
    const countdownDate = new Date(ride.departureDate);
    this.stopCountdown();
    this.countdownService.startCountdown(countdownDate, ride.id).subscribe(distance => {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      ride.countdown = { days, hours, minutes, seconds };
    });
  }



  getLatestRides(page: any, size: any) {
    //this.stopCountdown();

    this.rideService.getLatestRides(page - 1, size).subscribe((res: any) => {
      this.latestRides = res.rides;

      this.latestRides.forEach(ride => {
        ride.driverImageUrl = this.backendEndpoint + ride.driverImageUrl;
      });

      this.latestRides.forEach(ride => this.startCountdown(ride));
    });
  }

  viewRideDetails(rideId: number): void {
    // this.router.navigate(['/ride-details', rideId]);
    console.log('View ride details for ride ID:', rideId);
  }

  joinRide(rideId: number): void {
    if (this.authSerice.getToken()) {
      this.rideRequestService.applyForRide(rideId).subscribe(
        (response) => {
          console.log('Successfully joined the ride:', response);
        },
        (error) => {
          console.error('Error joining the ride:', error);
        }
      );
      console.log('Join ride with ID:', rideId);
    } else {
      this.router.navigate(['/login']);
    }
  }

  get availableSeatsArray(): number[] {
    return Array.from({ length: this.latestRides.length }, (_, index) => index);
  }

}
