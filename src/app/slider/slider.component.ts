import { Component, OnInit } from "@angular/core";
import { SliderService } from "../services/slider.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements OnInit {
  imageCount: number;

  constructor(private sls: SliderService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.imageCount = parseInt(params.get("count"), 10);
      if (!this.imageCount || this.imageCount <= 0) {
        this.sls.generateImages(5);
      } else {
        this.sls.generateImages(this.imageCount);
      }
    });
  }
}
