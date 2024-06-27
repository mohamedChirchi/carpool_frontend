import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { RideService } from "../../../services/ride/ride.service";
import { RideInfo } from "../../../models/RideInfo";
import { RideRequestService } from "../../../services/ride/ride-request.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FilterRideRequest } from "../../../models/FilterRideRequest";
import { CountdownService } from 'src/app/services/countdown/countdown.service';
import { Subscription } from 'rxjs';
import { AuthService } from "../../../services/auth/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css'],
})
export class RideComponent implements OnInit, OnDestroy {
  rides!: RideInfo[];
  totalItems: number = 0;
  itemsPerPage: number = 12;
  currentPage: number = 1;
  rideFilterForm!: FormGroup;

  backendEndpoint: string = 'http://localhost:8089/api';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private rideService: RideService,
    private rideRequestService: RideRequestService,
    private countdownService: CountdownService,
    public authService: AuthService,
    public route: ActivatedRoute
  ) {
  }

  destination? = this.route.snapshot.paramMap.get('destination');


  ngOnInit(): void {
    this.getRides(this.currentPage, this.itemsPerPage);
    this.rideFilterForm = this.fb.group({
      departure: [''],
      destination: [this.destination],
      status: [''],
      minPrice: ['', Validators.pattern('^\d{1,3}(?:\.\d{1,2})?$')],
      maxPrice: ['', Validators.pattern('^\d{1,3}(?:\.\d{1,2})?$')]
    });
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  stopCountdown(): void {
    if (this.rides) {
      this.rides.forEach(ride => {
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

  getRides(page: any, size: any) {
    //this.stopCountdown();
    if (this.destination) {
      this.rideService.search(this.destination).subscribe(
        (res: any) => {
          this.rides = res.rides;
          this.totalItems = res.totalElements;
          this.rides.forEach(ride => this.startCountdown(ride));
          this.rides.forEach(ride => {
            ride.driverImageUrl = this.backendEndpoint + ride.driverImageUrl;
          });
        });
    } else {
      this.rideService.getLatestRides(page - 1, size).subscribe((res: any) => {
        this.rides = res.rides;
        this.totalItems = res.totalElements;
        this.rides.forEach(ride => this.startCountdown(ride));
        this.rides.forEach(ride => {
          ride.driverImageUrl = this.backendEndpoint + ride.driverImageUrl;
        });
      });
    }
  }

  request(id: number) {
    this.rideRequestService.applyForRide(id).subscribe(
      (res: any) => {
        if (res.http_code == 200)
          console.log("Ride " + id + " requested successfully")
      }
    )
  }

  getFiltredRide() {
    this.rideService.filterRides(
      new FilterRideRequest(
        this.rideFilterForm.value['departure'],
        this.rideFilterForm.value['destination'],
        this.rideFilterForm.value['status'],
        this.rideFilterForm.value['minPrice'],
        this.rideFilterForm.value['maxPrice']
      ), this.currentPage - 1, this.itemsPerPage).subscribe(
        (res: any) => {
          if (res.http_code != 200)
            console.log("Erreur");
          else {
            this.rides = res.rides
            this.rides.forEach(ride => {
              ride.driverImageUrl = this.backendEndpoint + ride.driverImageUrl;
            });
            this.rides.forEach(ride => this.startCountdown(ride));
          }
        }
      )
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRides(this.currentPage, this.itemsPerPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getRides(this.currentPage, this.itemsPerPage);
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.getRides(this.currentPage, this.itemsPerPage);
    }
  }
}
