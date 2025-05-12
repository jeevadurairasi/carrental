import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarlistComponent } from './carlist/carlist.component';
import { FormsModule } from '@angular/forms';
import { CancelbookingComponent } from './cancelbooking/cancelbooking.component';
import { PreviousRentalsComponent } from './previous-rentals/previous-rentals.component';
import { FurtherRentalsComponent } from './further-rentals/further-rentals.component';
import { LoginComponent } from './admin/login/login.component';

const routes: Routes = [
  { path: '', component: CarlistComponent },
  { path: 'car/:name', component: CarlistComponent },
  { path: 'cancelbooking', component: CancelbookingComponent },
  { path: 'previous-rentals', component: PreviousRentalsComponent }, // New route
  { path: 'further-rentals', component: FurtherRentalsComponent },
  {path: 'admin/login', component: LoginComponent}, // Admin login route

];
@NgModule({
  declarations: [
    AppComponent,
    CarlistComponent,
    CancelbookingComponent,
    PreviousRentalsComponent,
    FurtherRentalsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

