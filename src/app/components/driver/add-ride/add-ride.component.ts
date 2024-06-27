import {Component, OnInit} from '@angular/core';
import {RideService} from "../../../services/ride/ride.service";
import {AddRideRequest} from "../../../models/AddRideRequest";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../../../services/car/car.service";
import {Car} from "../../../models/Car";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit{
  rideForm!: FormGroup;
  driverCars!:Car[] ;


  constructor(private toaster:ToastrService,private carService:CarService,private rideService: RideService,private formBuilder:FormBuilder) {
  }

  addRide(){
    this.rideService.createRide(
      new AddRideRequest(
            this.rideForm.value['depart'],
            this.rideForm.value['arrive'],
            this.rideForm.value['price'],
            this.rideForm.value['date'],
            this.rideForm.value['carId'],

      )
    ).subscribe((res:any)=>{
      if(res.http_code!=200)
        this.toaster.error(res.message)
      else
        this.toaster.success(res.message)
    });
  }
  getDriverCars(){
    this.carService.getDriverCars()
      .subscribe((res:any)=> {
        this.driverCars = res.driverCars;
      })
  }

  ngOnInit(): void {
    this.rideForm = this.formBuilder.group({
      date: ['', [Validators.required, ]],
      price: ['', [Validators.required, ]],
      depart: ['', [Validators.required, ]],
      arrive: ['', [Validators.required, ]],
      carId: [null, [Validators.required, ]],

    });

    this.getDriverCars();
  }
}
