import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatestWith } from 'rxjs';
import { HotelService } from 'src/app/shared/shared-services/hotel/hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public hotelService: HotelService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(combineLatestWith(this.activatedRoute.queryParams))
      .subscribe(([params, queryParams]) => {
        this.hotelService.getHotels({ ...params, ...queryParams });
      });

    this.activatedRoute.params.subscribe((params) => {
      this.hotelService.getFilterData(params);
    });
  }
}
