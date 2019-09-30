import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SliderComponent } from "./slider/slider.component";
import { WindowComponent } from "./slider/window/window.component";
import { DashboardComponent } from "./slider/dashboard/dashboard.component";
import { SliderService } from "./services/slider.service";

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    WindowComponent,
    DashboardComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
