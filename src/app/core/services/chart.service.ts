import { Injectable } from '@angular/core';
import {FakeDataService} from "./fake-data.service";
import {Observable, of} from "rxjs";
import {DATA_GENERATOR_SETTINGS} from "../constants/data-generator-settings.const";
import {Helper} from "../utils/helper";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  settings = DATA_GENERATOR_SETTINGS;

  constructor(
    private dataService: FakeDataService
  ) { }

  getNewPriceBTC(currentValue: number): Observable<number> {
    return of(this.dataService.getNextValue(currentValue, this.settings.minPriceBTC, this.settings.maxPriceBTC))
  }

  getNewPriceMY(currentValue: number): Observable<number> {
    return of(this.dataService.getNextValue(currentValue, this.settings.minPriceMY, this.settings.maxPriceMY))
  }

  getHumidity(): Observable<Array<Array<number>>> {
    let result = [[new Date().getTime(), DATA_GENERATOR_SETTINGS.initialHumidity]];
    let now = new Date()
    let currentDate = Helper.addHours(now, 1);

    for (let i = 0; i < 100; i++) {
      let value = this.dataService.getNextValue(result[result.length - 1][1], this.settings.minHumidity, this.settings.maxHumidity);
      currentDate = Helper.addHours(currentDate, 1)
      result.push([currentDate, value]);
    }
    return of(result)
  }

  getTemperature(): Observable<Array<Array<number>>> {
    let result = [[new Date().getTime(), DATA_GENERATOR_SETTINGS.initialTemp]];
    let now = new Date()
    let currentDate = Helper.addHours(now, 1);

    for (let i = 0; i < 100; i++) {
      let value = this.dataService.getNextValue(result[result.length - 1][1], this.settings.minTemp, this.settings.maxTemp);
      currentDate = Helper.addHours(currentDate, 1)
      result.push([currentDate, value]);
    }
    return of(result)
  }
}
