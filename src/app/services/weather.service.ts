import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<WeatherData> {
    const headers = new HttpHeaders()
      .set(environment.XRapidAPIHeaderName, environment.XRapidAPIKeyHeaderValue)
      .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue);

    const params = new HttpParams()
      .set('q',city)
      .set('units','metric')
      .set('mode','json')

    return this.http.get<WeatherData>(environment.weatherBaseUrl, { headers, params });
  }
}
