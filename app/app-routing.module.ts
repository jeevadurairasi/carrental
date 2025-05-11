import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarlistComponent } from './carlist/carlist.component';
import { CancelbookingComponent } from './cancelbooking/cancelbooking.component';
const routes: Routes = [
  {path:'',component:CarlistComponent},
  {path:'car/:name',component:CarlistComponent},
  {path:'cancelbooking',component:CancelbookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
