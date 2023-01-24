import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { Category } from 'src/model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClients: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClients.get<Category[]>(
      `${environment.apiURL.baseUrl}/${environment.apiURL.categories}`
    );
  }


}
