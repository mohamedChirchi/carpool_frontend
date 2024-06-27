import { Component, OnInit } from '@angular/core';
import { RideService } from "../../../services/ride/ride.service";

@Component({
  selector: 'app-list-driver-rides',
  templateUrl: './list-driver-rides.component.html',
  styleUrls: ['./list-driver-rides.component.css']
})
export class ListDriverRidesComponent implements OnInit {

  driverRides!: any[];
  totalItems: number = 0;
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(private rideService: RideService) {
  }

  ngOnInit(): void {
    this.getDriverRides(this.currentPage, this.itemsPerPage);
  }

  getDriverRides(page: any, size: any) {
    this.rideService.getRidesCreatedByAuthenticatedDriver(page - 1, size).subscribe(
      (res: any) => {
        this.driverRides = res.rides;
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
      this.getDriverRides(this.currentPage, this.itemsPerPage)
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getDriverRides(this.currentPage, this.itemsPerPage)
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.getDriverRides(this.currentPage, this.itemsPerPage)
    }
  }
}
