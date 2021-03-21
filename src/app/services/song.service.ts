import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song } from '../models/Song';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpClient) {}

  search(searchTerm: string): Observable<Song[]> {
    const url = `${environment.baseUrl}/song/search`;
    const requestBody = {
      searchTerm,
    };
    return this.http.post<Song[]>(url, requestBody);
  }
}
