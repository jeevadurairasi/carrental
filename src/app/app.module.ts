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
import { VehicletypesComponent } from './vehicletypes/vehicletypes.component';
import { HttpClientModule } from '@angular/common/http';



const routes: Routes = [
  { path: '', component: CarlistComponent },
  { path: 'car', component: VehicletypesComponent },
  { path: 'cancelbooking', component: CancelbookingComponent },
  { path: 'previous-rentals', component: PreviousRentalsComponent },
  { path: 'further-rentals', component: FurtherRentalsComponent },
  { path: 'admin/login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CarlistComponent,
    CancelbookingComponent,
    PreviousRentalsComponent,
    FurtherRentalsComponent,
    LoginComponent,
    VehicletypesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

