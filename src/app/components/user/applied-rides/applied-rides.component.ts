import {Component, OnInit} from '@angular/core';
import {RideRequestService} from "../../../services/ride/ride-request.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-applied-rides',
  templateUrl: './applied-rides.component.html',
  styleUrls: ['./applied-rides.component.css']
})
export class AppliedRidesComponent implements OnInit{
  totalItems: number = 0;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  status="";
  rides!: any[];
  constructor(private toasterService:ToastrService,private requestRideService:RideRequestService) {
  }

  ngOnInit(): void {
  this.getRequestedRidesFromPassenger(this.currentPage, this.itemsPerPage);
  }


  getRequestedRidesFromPassenger(page: any, size: any) {
    this.requestRideService.getAppliedRides(page - 1, size,this.status).subscribe(
      (res: any) => {
        this.rides = res.ridesRequest;
        this.totalItems = res.totalElements;
      }
    );
  }


  /* getAppliedRides(){
    this.requestRideService.getAppliedRides(this.currentPage-1,10,this.status)
      .subscribe((res:any)=> {
        if(res.http_code!=200)
          console.log("Erreur !")
        else
        this.rides = res.ridesRequest
      });
  } */

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRequestedRidesFromPassenger(this.currentPage, this.itemsPerPage)
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getRequestedRidesFromPassenger(this.currentPage, this.itemsPerPage)
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.getRequestedRidesFromPassenger(this.currentPage, this.itemsPerPage)
    }
  }

  cancelRide(ride: any) {
    this.rides=this.rides.filter((r)=>r!=ride);
    this.requestRideService.cancelRide(ride.id).subscribe(
        (res:any) => {
          if (res.http_code === 200) {
            this.toasterService.success(res.message);
          }
          else {
            this.toasterService.error(res.errors);
          }
        }
    )
  }
}
