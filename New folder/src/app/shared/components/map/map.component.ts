import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Hotel } from 'src/model';
import { CategoryService } from '../../shared-services/category/category.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() curentHotel!: Hotel;
  constructor() { }

  ngOnInit(): void {
    this.center = {
      lat: Number(this.curentHotel.latitude),
      lng: Number(this.curentHotel.longitude)
    };
    this.markerPositions.push({
      lat: Number(this.curentHotel.latitude),
      lng: Number(this.curentHotel.longitude)
    });
    console.log(this.curentHotel)
  }
  center: google.maps.LatLngLiteral = {
    lat: 1,
    lng: 1,
  };
  display: any;
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 13;
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }





}
