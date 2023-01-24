import { JsonPipe, NgForOf, NgIf, NgStyle } from "@angular/common";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardAreaComponent } from 'src/app/shared/components/card-area/card-area.component';
import { CardHotelComponent } from 'src/app/shared/components/card-hotel/card-hotel.component';
import { CategoryListComponent } from 'src/app/shared/components/category-list/category-list.component';
import { HomeComponent } from 'src/app/view/home/home.component';
import { SwiperModule } from 'swiper/angular';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    CategoryListComponent,
    CardHotelComponent,
    CardAreaComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    NgIf,
    NgForOf,
    SwiperModule,
    NgStyle,
    JsonPipe
  ]
})
export class HomeModule {}
