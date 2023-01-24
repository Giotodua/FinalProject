import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

import { MatTableModule } from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';
import { FiltersComponent } from 'src/app/shared/components/filters/filters.component';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SingUpComponent,
    SingInComponent,
    FiltersComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    // SharedModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatTableModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatFormFieldModule,
    GoogleMapsModule,
    MatGridListModule,
    RouterLinkWithHref,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
  exports: [
    NavbarComponent,
    MatInputModule,
    FooterComponent,
    MatDatepickerModule,
    MatButtonModule,
  ],
})
export class ComponentsModule {}
