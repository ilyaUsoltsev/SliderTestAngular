import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { SliderService } from "../../services/slider.service";
import { fromEvent, Subscription, Observable } from "rxjs";
import { ClickAction } from "../../utils/click-actions";
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
    this.sizeSubscription = this.inputHandler(this.sizeInput).subscribe(
      (size: number) => this.sls.imageSizeSubject.next(size)
    );

    this.radiusSubscription = this.inputHandler(this.radiusInput).subscribe(
      (size: number) => this.sls.imageRadiusSubject.next(size)
    );
  }

  onPrevClick() {
    this.sls.updateCurrentImage(ClickAction.previous);
  }

  onNextClick() {
    this.sls.updateCurrentImage(ClickAction.next);
  }

  onAddClick() {
    this.sls.addImage();
  }

  ngOnDestroy() {
    this.radiusSubscription.unsubscribe();
    this.sizeSubscription.unsubscribe();
  }

  inputHandler(input: ElementRef): Observable<any> {
    return fromEvent<any>(input.nativeElement, "keyup").pipe(
      map(event => event.target.value),
      map((i: string) => parseInt(i, 10)),
      filter((i: number) => i <= 250),
      debounceTime(500),
      distinctUntilChanged()
    );
  }
}
