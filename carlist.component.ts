import { Component } from '@angular/core';

interface RentalDetails {
  pricePerKm: number;
}

interface Car {
  name: string;
  image: string;
  model: string;
  type: 'basic' | 'mid-range' | 'high-end';
  rentalDetails: RentalDetails;
  userDistance?: number;
  details: string;
  gearType: 'manual' | 'automatic';
  isFrequentRenter?: boolean; // Add this property
}

interface Car {
  name: string;
  image: string;
  model: string;
  type: 'basic' | 'mid-range' | 'high-end';
  rentalDetails: RentalDetails;
  userDistance?: number;
  details: string;
  gearType: 'manual' | 'automatic';
  isFrequentRenter?: boolean;
  loyaltyPoints?: number; // Add this property
  extraDiscountRides?: number; // Add this property to track extra discount rides
}

interface Car {
  name: string;
  image: string;
  model: string;
  type: 'basic' | 'mid-range' | 'high-end';
  rentalDetails: RentalDetails;
  userDistance?: number;
  details: string;
  gearType: 'manual' | 'automatic';
  isFrequentRenter?: boolean;
  loyaltyPoints?: number; // Add this property
  extraDiscountRides?: number; // Add this property to track extra discount rides
}

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent {
  selectedType: string = 'all';
  selectedGearType: string = 'all';

  cars: Car[] = [
    { name: 'Car 1', image: './assets/OIP.jfif', model: 'Model 1', type: 'basic', rentalDetails: { pricePerKm: 10}, details: 'Economical and fuel-efficient', gearType: 'manual', isFrequentRenter: true, loyaltyPoints: 0, extraDiscountRides: 0 },
    { name: 'Car 2', image: './assets/OIP.jfif', model: 'Model 2', type: 'mid-range', rentalDetails: { pricePerKm: 12 }, details: 'Comfortable and spacious', gearType: 'automatic', isFrequentRenter: false, loyaltyPoints: 0, extraDiscountRides: 0 },
    { name: 'Car 3', image: './assets/OIP.jfif', model: 'Model 3', type: 'high-end', rentalDetails: { pricePerKm: 15 }, details: 'Luxury and high performance', gearType: 'automatic', isFrequentRenter: true, loyaltyPoints: 0, extraDiscountRides: 0 },
    // Add more cars as needed
  ];

  get filteredCars(): Car[] {
    return this.cars.filter(car => 
      (this.selectedType === 'all' || car.type === this.selectedType) &&
      (this.selectedGearType === 'all' || car.gearType === this.selectedGearType)
    );
  }

  calculateRentalCost(car: Car): number {
    const { pricePerKm} = car.rentalDetails;
    const userDistance = car.userDistance || 0;

    // Calculate base cost
    const baseCost = pricePerKm * userDistance;

    // Determine tax rate based on car type
    let taxRate = 0;
    switch (car.type) {
      case 'basic':
        taxRate = 0.10;
        break;
      case 'mid-range':
        taxRate = 0.20;
        break;
      case 'high-end':
        taxRate = 0.40;
        break;
    }

    // Calculate total cost with tax
    const tax = baseCost * taxRate;
    let totalCost = baseCost + tax;


    // Apply additional discount for frequent renters and distance > 1000 km
    if (userDistance >= 1000 ) {
      totalCost -= (totalCost * 10) / 100;
    }

    // Apply extra discount for loyalty points
    if (car.extraDiscountRides && car.extraDiscountRides > 0) {
      totalCost -= (totalCost * 10) / 100; // Assuming a 10% extra discount
      car.extraDiscountRides--; // Decrease the count of extra discount rides
    }

    // Ensure total cost is not negative
    totalCost = Math.max(totalCost, 0);

    return totalCost;
  }

  calculateLoyaltyPoints(car: Car): number {
    const userDistance = car.userDistance || 0;
    const points = Math.floor(userDistance / 50);
    car.loyaltyPoints = (car.loyaltyPoints || 0) + points;

    // Check if loyalty points qualify for extra discount rides
    if (car.loyaltyPoints >= 25) {
      car.extraDiscountRides = 2; // Give 2 consecutive rides extra discount
      car.loyaltyPoints -= 25; // Deduct the used points
    }

    return car.loyaltyPoints;
  }
}
