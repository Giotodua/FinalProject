import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {


  private allhotelApi: string = 'http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Hotel';
  constructor(private httpClient: HttpClient) { }

  getAllrooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.allhotelApi)
  }
}
