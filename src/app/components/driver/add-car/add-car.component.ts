import {Component, OnInit} from '@angular/core';
import {CarService} from "../../../services/car/car.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddCarRequest} from "../../../models/AddCarRequest";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit{
  carForm!: FormGroup;

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      carBrand: ['', [Validators.required, ]],
      carModel: ['', [Validators.required, ]],
      carColor: ['', [Validators.required, ]],
      carSeats: ['', [Validators.required, ]],
    });
  }
  constructor(private carService:CarService,private toaster:ToastrService,private formBuilder:FormBuilder) {
  }
  addCar(){
    this.carService.addCar(new AddCarRequest(
      this.carForm.value['carBrand'],
      this.carForm.value['carModel'],
      this.carForm.value['carColor'],
      this.carForm.value['carSeats']
    ))
      .subscribe((res)=> {
        if (res.http_code != 200)
          this.toaster.error(res.message);
        else
          this.toaster.success(res.message);
      });
  }

}
