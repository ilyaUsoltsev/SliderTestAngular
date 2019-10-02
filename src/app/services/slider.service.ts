import { Injectable } from "@angular/core";
import { Image } from "../interfaces/image";
import { BehaviorSubject, Observable } from "rxjs";
import { ClickAction } from '../utils/click-actions';

@Injectable({
  providedIn: "root"
})
export class SliderService {
  private images: Image[] = [];
  imageIndexSubject = new BehaviorSubject<number>(0);
  imageSizeSubject = new BehaviorSubject<number>(130);
  imageRadiusSubject = new BehaviorSubject<number>(5);
  imagesSubject = new BehaviorSubject<Image[]>([]);
  private currentImageIndex = 0;
  constructor() {}

  generateImages(count: number = 5): void {
    for (let i = 0; i < count; i++) {
      const id = Math.floor(Math.random() * 999);
      const imageUrl = `https://picsum.photos/${id}`;
      this.images.push({ id, imageUrl });
    }
    this.imagesSubject.next(this.images);
  }

  get getImages(): Image[] {
    return this.images;
  }

  updateCurrentImage(action: string): void {
    const index = this.currentImageIndex;
    if (this.images.length > index + 1 && action === ClickAction.next) {
      this.currentImageIndex++;
      this.imageIndexSubject.next(this.currentImageIndex);
    } else if (index !== 0 && action === ClickAction.previous) {
      this.currentImageIndex--;
      this.imageIndexSubject.next(this.currentImageIndex);
    }
  }

  addImage() {
    const id = Math.floor(Math.random() * 999);
    const images = [...this.images];
    images.splice(this.currentImageIndex, 0, {
      imageUrl: `https://picsum.photos/${id}`,
      id
    });
    this.images = images;
    this.imagesSubject.next(images);
  }
}
