import { Component, OnInit, OnDestroy } from "@angular/core";
import { Image } from "../../interfaces/image";
import { SliderService } from "../../services/slider.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-window",
  templateUrl: "./window.component.html",
  styleUrls: ["./window.component.scss"]
})
export class WindowComponent implements OnInit {
  images: Observable<Image[]>;
  imageSize: Observable<number>;
  imageRadius: Observable<number>;
  imageIndex: Observable<number>;

  constructor(private sls: SliderService) {}

  ngOnInit() {
    this.images = this.sls.imagesSubject;
    this.imageSize = this.sls.imageSizeSubject;
    this.imageRadius = this.sls.imageRadiusSubject;
    this.imageIndex = this.sls.imageIndexSubject;
  }

  getImageStyles(
    image: Image,
    i: number,
    size: number,
    radius: number,
    index: number
  ) {
    return {
      height: `${size}px`,
      borderRadius: `${radius}px`,
      width: `${size}px`,
      backgroundImage: `url(${image.imageUrl})`,
      opacity: 1 - i * 0.2 + index * 0.2,
      transform: `translate(${-(size + 10) * index}px, -50%)`
    };
  }
}
