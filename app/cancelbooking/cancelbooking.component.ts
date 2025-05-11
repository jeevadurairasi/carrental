import { Component } from '@angular/core';
import { CarServiceService } from '../servies/car-service.service';
@Component({
  selector: 'app-cancelbooking',
  templateUrl: './cancelbooking.component.html',
  styleUrls: ['./cancelbooking.component.css']
})
export class CancelbookingComponent {

  bookingId: string = '';
  message: string = '';

  constructor(private carService: CarServiceService) {}

  cancelBooking(): void {
    const success = this.carService.cancelBooking(this.bookingId);
    if (success) {
      this.message = 'Booking canceled successfully.';
    } else {
      this.message = 'Failed to cancel booking. Please check the booking ID and try again.';
    }
  }
}


