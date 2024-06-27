import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { RideRequestService } from "../../../services/ride/ride-request.service";

@Component({
  selector: 'app-requested-rides',
  templateUrl: './requested-rides.component.html',
  styleUrls: ['./requested-rides.component.css']
})
export class RequestedRidesComponent implements OnInit {
  rides!: any[];
  totalItems: number = 0;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  apiUrl: string = 'http://localhost:8089/api';

  constructor(
    private toaster: ToastrService,
    private rideRequestService: RideRequestService
  ) { }

  ngOnInit(): void {
    this.getRequestedRides(this.currentPage, this.itemsPerPage);
  }

  getRequestedRides(page: any, size: any) {
    this.rideRequestService.getRequestedRidesForDriver(page - 1, size).subscribe(
      (res: any) => {
        this.rides = res.ridesRequest;
        this.rides.forEach(ride => {
          ride.passengerImageUrl = this.apiUrl + ride.passengerImageUrl;
        });
        this.totalItems = res.totalElements;
      }
    );
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
      this.getRequestedRides(this.currentPage, this.itemsPerPage)
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getRequestedRides(this.currentPage, this.itemsPerPage)
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.getRequestedRides(this.currentPage, this.itemsPerPage)
    }
  }

  confirm(id: number) {
    this.rideRequestService.acceptRideRequest(id).subscribe(
      (res: any) => {
        if (res.http_code != 200)
          this.toaster.error("Error")
        else {
          this.toaster.success("Ride Request Accepted");
          this.rides = this.rides.filter((r) => r.id != id);
        }
      }
    )
  }

  decline(id: number) {
    this.rideRequestService.declineRideRequest(id).subscribe(
      (res: any) => {
        if (res.http_code != 200)
          this.toaster.error("Error")
        else {
          this.toaster.warning("Ride Request Declined");
          this.rides = this.rides.filter((r) => r.id != id);
        }
      }
    )
  }
}
