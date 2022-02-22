import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  constructor() {}

  getNextValue(currentValue: number, min: number, max: number): number {
    // Instead of a fixed volatility, pick a random volatility
    // each time, between 2 and 10.
    let volatility = Math.random() * 10 + 2;

    let rnd = Math.random();

    let changePercent = 2 * volatility * rnd;

    if (changePercent > volatility) {
      changePercent -= (2 * volatility);
    }
    let changeAmount = currentValue * changePercent / 100;
    let newValue = currentValue + changeAmount;

    // Add a ceiling and floor.
    if (newValue < min) {
      newValue += Math.abs(changeAmount) * 2;
    } else if (newValue > max) {
      newValue -= Math.abs(changeAmount) * 2;
    }
    return newValue;
  }

}


