import { Component, OnInit } from '@angular/core';
import {ChartSource} from "../../../core/types/chart-source.type";
import {ChartService} from "../../../core/services/chart.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  dataTemp: Array<ChartSource> = [
    {
      name: 'Temperature',
      type: 'line',
      color: 'red',
      data: [[]]
    },
  ];
  dataHumidity: Array<ChartSource> = [
    {
      name: 'Humidity',
      type: 'line',
      color: 'purple',
      data: [[]]
    },
  ];
  dataTemp2: Array<ChartSource> = [
    {
      name: 'Temperature2',
      type: 'line',
      color: 'pink',
      data: [[]]
    },
  ];
  dataHumidity2: Array<ChartSource> = [
    {
      name: 'Humidity2',
      type: 'line',
      color: 'blueviolet',
      data: [[]]
    },
  ];
  dataCombined: Array<ChartSource> = []
  mode: 'combined' | 'separate' = 'separate';

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    forkJoin([
      this.chartService.getHumidity(),
      this.chartService.getTemperature(),
      this.chartService.getHumidity(),
      this.chartService.getTemperature(),
    ]).subscribe(
      values => {
        this.dataHumidity[0].data = values[0];
        this.dataTemp[0].data = values[1];
        this.dataHumidity2[0].data = values[2];
        this.dataTemp2[0].data = values[3];
        this.dataCombined = [
          ...this.dataHumidity,
          ...this.dataTemp,
          ...this.dataHumidity2,
          ...this.dataTemp2
        ]
      }
    )
  }

  switchMode(): void {
    this.mode = this.mode === 'separate' ? 'combined' : 'separate';
  }

}
