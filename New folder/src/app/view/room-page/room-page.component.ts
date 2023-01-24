import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/shared/shared-services/hotel/hotel.service';


@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css'],
})
export class RoomPageComponent implements OnInit {

  public hotel!: any;


  constructor(
    private HotelServices: HotelService,
    private activatedRoute: ActivatedRoute,

  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.HotelServices.getHotelById(params['id']).subscribe((response: any) => {
        this.hotel = response;
      });
    });
  }
}




