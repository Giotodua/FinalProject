import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel, Room } from 'src/model';

export interface HotelFilter {
  Id?: string | number | null;
  PriceFrom?: string | null;
  PriceTo?: string | null;
  RoomsCount?: string | null;
  BedsPerRoomCount?: string | null;
  BathRoomsCount?: string | null;
  TypeOfPlace?: string | null;
  PropertyType?: string | null;
  HostLanguages?: string[] | null;
}

export interface MinMaxPrices {
  min: number;
  max: number;
}

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  loading = false;

  public minMaxPrice: MinMaxPrices = { min: 0, max: 0 };

  public typeOfPlaces: string[] = [];
  public propertyType: string[] = [];

  public hostLanguages: string[] = [];

  hotels: Hotel[] = [];
  constructor(private httpClients: HttpClient) {}

  getHotelsAPI(args: Partial<HotelFilter>): Observable<Hotel[]> {
    const params = this.serializeParams(this.filterByValue(args));
    return this.httpClients.get<Hotel[]>(
      `${environment.apiURL.baseUrl}/${
        environment.apiURL.hotel
      }/filter-by-category${args ? `?${params}` : ''}`
    );
  }

  getFilterData(args: Partial<HotelFilter>) {
    this.getHotelsAPI(args).subscribe((data) => {
      this.minMaxPrice = this.calculatePrices(
        data?.reduce(
          (acc: Room[], item) => [...acc, ...(item?.rooms ?? [])],
          []
        )
      );
      this.propertyType = (
        data?.map((item) => item?.propertyType ?? '') ?? []
      ).filter((item, id, self) => self.indexOf(item) === id);

      this.hostLanguages = (
        data?.map((item) => item?.hostLanguage ?? '') ?? []
      ).filter((item, id, self) => self.indexOf(item) === id);

      this.typeOfPlaces = (
        data?.map((item) => item?.typeOfPlace ?? '') ?? []
      ).filter((item, id, self) => self.indexOf(item) === id);
    });
  }

  public calculatePrices(list?: Room[]): MinMaxPrices {
    const prices = list?.map((item) => item?.price ?? 0) ?? [];
    return {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    };
  }

  getHotels(args: Partial<HotelFilter>) {
    this.loading = true;
    const response = this.getHotelsAPI(args);
    response.subscribe((data) => {
      this.hotels = data;
      this.loading = false;
    });
  }

  public filterByValue(value: HotelFilter): Record<string, string> {
    return Object.keys(value).reduce(
      (acc, key) =>
        value[key as keyof HotelFilter]
          ? {
              ...acc,
              [key]: value[key as keyof HotelFilter],
            }
          : acc,
      {}
    );
  }

  public serializeParams(params: Partial<HotelFilter>): string {
    const searchParams = new URLSearchParams();
    for (let z in params) {
      if (z === 'HostLanguages' && Array.isArray(params[z])) {
        params[z]?.forEach((item) => searchParams.append(z, item));
      } else {
        searchParams.append(z, params[z as keyof HotelFilter] as string);
      }
    }
    return searchParams.toString();
  }

  getHotelById(_hotelId: string): Observable<Hotel> {
    return this.httpClients.get<Hotel>(
      `${environment.apiURL.baseUrl}/${environment.apiURL.hotel}/${_hotelId}`
    );
  }
}
