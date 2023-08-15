import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']   
})
export class AppComponent implements OnInit, OnDestroy {

  weatherData?: WeatherData;
  cityName: string = ""; // Fixed typo here

  private weatherSubscription: Subscription | undefined;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
  }

  onSubmit() { 
    this.getWeatherData(this.cityName);
  }

  private getWeatherData(cityName: string) {
    this.weatherSubscription = this.weatherService.getWeather(cityName)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          console.log(response);
        },
        error: (error) => {
          console.error('Error fetching weather data:', error);
        }
      });
  }
  
  

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
