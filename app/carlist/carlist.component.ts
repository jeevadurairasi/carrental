import { Component } from '@angular/core';

interface RentalDetails {
  pricePerKm: number;
  discount: number;
  perDayCost: number; // Add per day rental cost
}

interface Car {
  name: string;
  image: string;
  model: string;
  type: 'basic' | 'mid-range' | 'high-end';
  rentalDetails: RentalDetails;
  userDistance?: number;
  rentalDays?: number; // Add rental days property
  details: string;
  gearType: 'manual' | 'automatic';
  isFrequentRenter?: boolean;
  loyaltyPoints?: number;
  extraDiscountRides?: number;
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
    { name: 'Car 1', image: './assets/OIP.jfif', model: 'Model 1', type: 'basic', rentalDetails: { pricePerKm: 10, discount: 20, perDayCost: 500 }, details: 'Economical and fuel-efficient', gearType: 'manual', isFrequentRenter: true, loyaltyPoints: 0, extraDiscountRides: 0 },
    { name: 'Car 2', image: './assets/OIP.jfif', model: 'Model 2', type: 'mid-range', rentalDetails: { pricePerKm: 12, discount: 25, perDayCost: 700 }, details: 'Comfortable and spacious', gearType: 'automatic', isFrequentRenter: false, loyaltyPoints: 0, extraDiscountRides: 0 },
    { name: 'Car 3', image: './assets/OIP.jfif', model: 'Model 3', type: 'high-end', rentalDetails: { pricePerKm: 15, discount: 30, perDayCost: 1000 }, details: 'Luxury and high performance', gearType: 'automatic', isFrequentRenter: true, loyaltyPoints: 0, extraDiscountRides: 0 },
    // Add more cars as needed
  ];

  get filteredCars(): Car[] {
    return this.cars.filter(car => 
      (this.selectedType === 'all' || car.type === this.selectedType) &&
      (this.selectedGearType === 'all' || car.gearType === this.selectedGearType)
    );
  }

  calculateRentalCost(car: Car): number {
    const { pricePerKm, discount, perDayCost } = car.rentalDetails;
    const userDistance = car.userDistance || 0;
    const rentalDays = car.rentalDays || 1; // Default to 1 day if not provided

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

    // Apply initial discount
    totalCost -= (totalCost * discount) / 100;

    // Apply additional discount for frequent renters and distance > 1000 km
    if (userDistance > 1000 && car.isFrequentRenter) {
      totalCost -= (totalCost * 10) / 100;
    }

    // Apply extra discount for loyalty points
    if (car.extraDiscountRides && car.extraDiscountRides > 0) {
      totalCost -= (totalCost * 10) / 100; // Assuming a 10% extra discount
      car.extraDiscountRides--; // Decrease the count of extra discount rides
    }

    // Add per day rental cost if rented for more than a day
    if (rentalDays > 1) {
      totalCost += perDayCost * (rentalDays - 1);
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
