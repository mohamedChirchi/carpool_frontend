import { Component, OnInit } from '@angular/core';
import { Car } from "../../../models/Car";
import { CarService } from "../../../services/car/car.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {
  cars!: Car[];

  constructor(
    private toaster: ToastrService,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.carService.getDriverCars().subscribe((res) => this.cars = res.driverCars)
  }

  deleteCar(i: number) {
    this.cars = this.cars.filter((car) => car.id != i)
    this.carService.delete(i).subscribe((res: any) => {
      console.log(res);
      if (res.http_code != 200)
        this.toaster.error("Erreur")
      else
        this.toaster.success(res.message)
    })
  }
  
}
