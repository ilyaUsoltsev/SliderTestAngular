import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SliderComponent } from "./slider/slider.component";

const routes: Routes = [
  { path: "slider", component: SliderComponent },
  { path: "**", redirectTo: "slider" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
