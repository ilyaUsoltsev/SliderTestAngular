import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { SliderService } from "../../services/slider.service";
import { fromEvent, Subscription } from "rxjs";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  filter
} from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("sizeInput", { static: true }) sizeInput: ElementRef;
  @ViewChild("radiusInput", { static: true }) radiusInput: ElementRef;
  componentDestroyed = false;
  sizeSubscription = new Subscription();
  radiusSubscription = new Subscription();

  constructor(private sls: SliderService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.sizeSubscription = fromEvent<any>(
      this.sizeInput.nativeElement,
      "keyup"
    )
      .pipe(
        map(event => event.target.value),
        map((i: string) => parseInt(i, 10)),
        filter((i: number) => i >= 50 && i <= 250),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((size: number) => this.sls.imageSizeSubject.next(size));

    this.radiusSubscription = fromEvent<any>(
      this.radiusInput.nativeElement,
      "keyup"
    )
      .pipe(
        map(event => event.target.value),
        map((i: string) => parseInt(i, 10)),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((size: number) => this.sls.imageRadiusSubject.next(size));
  }

  onPrevClick() {
    this.sls.updateCurrentImage("PREV");
  }

  onNextClick() {
    this.sls.updateCurrentImage("NEXT");
  }

  onAddClick() {
    this.sls.addImage();
  }

  ngOnDestroy() {
    this.radiusSubscription.unsubscribe();
    this.sizeSubscription.unsubscribe();
  }
}
