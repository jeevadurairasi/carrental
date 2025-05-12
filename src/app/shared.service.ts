import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private city: string = '';

  setCity(city: string) {
    this.city = city;
  }

  getCity(): string {
    return this.city;
  }
}
