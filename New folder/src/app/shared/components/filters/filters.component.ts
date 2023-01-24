import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import {
  HotelFilter,
  HotelService,
} from 'src/app/shared/shared-services/hotel/hotel.service';

export interface HotelFilterForms {
  PriceFrom: FormControl<string | null>;
  PriceTo: FormControl<string | null>;
  RoomsCount: FormControl<string | null>;
  BedsPerRoomCount: FormControl<string | null>;
  BathRoomsCount: FormControl<string | null>;
  TypeOfPlace: FormControl<string | null>;
  PropertyType: FormControl<string | null>;
  HostLanguages: FormControl<string[] | null>;
}
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  totalHotels = 0;

  public filters = new FormGroup<HotelFilterForms>({
    PriceFrom: new FormControl(''),
    PriceTo: new FormControl(''),
    RoomsCount: new FormControl(''),
    BedsPerRoomCount: new FormControl(''),
    BathRoomsCount: new FormControl(''),
    TypeOfPlace: new FormControl(''),
    PropertyType: new FormControl(''),
    HostLanguages: new FormControl([]),
  });

  public roomsAndBeds: Array<string> = Array.from({ length: 8 }, (_, i) =>
    (i + 1).toString()
  );

  constructor(
    public hotelService: HotelService,
    public router: Router,
    public route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { id: string | undefined }
  ) {
    this.filters.patchValue({
      PriceFrom: this.hotelService.minMaxPrice.min.toString(),
      PriceTo: this.hotelService.minMaxPrice.max.toString(),
    });
  }

  async filterHandler() {
    const { PriceFrom, PriceTo, HostLanguages, ...rest } = this.filters.value;
    const price = {
      PriceFrom:
        PriceFrom === this.hotelService.minMaxPrice.min.toString()
          ? ''
          : PriceFrom,
      PriceTo:
        PriceTo === this.hotelService.minMaxPrice.max.toString() ? '' : PriceTo,
    };

    await this.router.navigate(
      [this.data?.id ? `/category/${this.data.id}` : '/'],
      {
        queryParams: {
          ...this.hotelService.filterByValue({
            ...price,
            ...rest,
          }),
          HostLanguages,
        },
      }
    );
  }

  activeBtn(param: keyof HotelFilterForms, value: string | number) {
    const props = this.filters.get(param);
    props?.setValue(props?.value !== value.toString() ? value.toString() : '');
  }

  isActive(param: keyof HotelFilterForms, value: string | number): boolean {
    return this.filters.get(param)?.value === value.toString();
  }
  isLang(lang: string): boolean {
    return this.filters.get('HostLanguages')?.value?.includes(lang) ?? false;
  }

  formatLanguageQuery(list?: string[] | null): string {
    return list?.length
      ? new URLSearchParams(list.map((x) => ['HostLanguages', x])).toString()
      : '';
  }

  cleanFilter() {
    this.filters.reset({
      PriceFrom: this.hotelService.minMaxPrice.min.toString(),
      PriceTo: this.hotelService.minMaxPrice.max.toString(),
    });
  }

  totalHotelsHint(param: Partial<HotelFilter>) {
    this.hotelService
      .getHotelsAPI({
        Id: this.data?.id,
        ...param,
      })
      .subscribe((data) => {
        this.totalHotels = data.length;
      });
  }
  handleLang(lang: string) {
    if (this.isLang(lang)) {
      this.filters
        .get('HostLanguages')
        ?.setValue(
          this.filters.get('HostLanguages')?.value?.filter((x) => x !== lang) ??
            []
        );
    } else {
      this.filters
        .get('HostLanguages')
        ?.setValue([...(this.filters.get('HostLanguages')?.value ?? []), lang]);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.totalHotelsHint(this.filters.value);
    });

    this.filters.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.totalHotelsHint(value);
    });
  }
}
