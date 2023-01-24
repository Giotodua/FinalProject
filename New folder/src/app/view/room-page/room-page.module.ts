import { NgForOf, NgIf } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { ReserveComponent } from 'src/app/shared/components/reserve/reserve.component';
import { RoomPageComponent } from 'src/app/view/room-page/room-page.component';

const routes: Routes = [
  {
    path: '',
    component: RoomPageComponent,
  },
];

@NgModule({
  declarations: [RoomPageComponent, ReserveComponent, MapComponent],
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,
    GoogleMapsModule,
    NgForOf,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatGridListModule,
    NgIf,
  ],
  exports: [RouterModule],
})
export class RoomPageModule {}
