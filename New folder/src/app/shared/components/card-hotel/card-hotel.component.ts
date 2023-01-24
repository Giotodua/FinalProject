import { Component, Input, OnInit } from '@angular/core';
import { HotelService } from 'src/app/shared/shared-services/hotel/hotel.service';
import { Hotel } from 'src/model';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-card-hotel',
  templateUrl: './card-hotel.component.html',
  styleUrls: ['./card-hotel.component.css'],
})
export class CardHotelComponent implements OnInit {
  @Input() curentHotel!: Hotel;
  constructor(public hotelService: HotelService) { }

  ngOnInit() { }
}
