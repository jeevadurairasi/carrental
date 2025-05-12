import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-vehicletypes',
  templateUrl: './vehicletypes.component.html',
  styleUrls: ['./vehicletypes.component.css']
})
export class VehicletypesComponent implements OnInit {
  cars: any[] = [];
  selectedcars: any;
  selectedCity: string = '';
  locations:string[]=["Banglore","Chennai","Hyderbad","Mumbai"];

  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.http.get<any>('/assets/cars.json').subscribe(data => {
      this.cars = data.cars;
      this.selectedcars = this.cars[0]; // default car image 1 will be displayed
    });
  }

  public selectcar(car: any): void {
    this.selectedcars = car;
  }

  public booknow(): void {
    this.sharedService.setCity(this.selectedCity);
    console.log('City set in shared service:', this.selectedCity);
    this.router.navigate(['/']);
  }

  public onCityChange(event: any): void {
    this.selectedCity = event.target.value;
    console.log('Selected city:', this.selectedCity);
  }
}
