import {Component, OnInit} from '@angular/core';
import {forkJoin, interval, Observable, range, switchMap, tap} from "rxjs";
import {ChartService} from "../../../core/services/chart.service";
import {DATA_GENERATOR_SETTINGS} from "../../../core/constants/data-generator-settings.const";
import {ChartSource} from "../../../core/types/chart-source.type";
import {Helper} from "../../../core/utils/helper";

@Component({
  selector: 'app-dynamic-data-layout',
  templateUrl: './dynamic-data-layout.component.html',
  styleUrls: ['./dynamic-data-layout.component.scss']
})
export class DynamicDataLayoutComponent implements OnInit {

  data: Array<ChartSource> = [
    {
      name: 'BITCOIN',
      type: 'line',
      color: 'green',
      data: [[]]
    },
    {
      name: 'MY CRYPTO',
      type: 'line',
      color: 'purple',
      data: [[]]
    }
  ];
  startUpdate$: Observable<any> | undefined;
  dataUpdating: boolean = false;
  currentDate = new Date().getTime();
  settings = DATA_GENERATOR_SETTINGS;

  constructor(
    private chartService: ChartService
  ) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    range(1, this.settings.dynamicDataInitialLength)
      .pipe(
        switchMap(() => {
          let btc = this.data[0].data;
          let myc = this.data[1].data;
          return forkJoin([
            this.chartService.getNewPriceBTC(btc[btc.length - 1][1] ?? this.settings.initialPriceBTC),
            this.chartService.getNewPriceMY(myc[myc.length - 1][1] ?? this.settings.initialPriceMY)
          ])
        })
      )
      .subscribe(values => {
        // Making and adding fake date
        this.currentDate = Helper.addHours(this.currentDate, 1);
        this.data[0].data?.push([this.currentDate, values[0]]);
        this.data[1].data?.push([this.currentDate, values[1]]);
      })
  }

  startDataStream(): void {
    this.dataUpdating = true;
    if (!!this.startUpdate$) {
      return;
    }
    this.startUpdate$ = interval(300)
      .pipe(
        switchMap(() => {
          let btc = this.data[0].data;
          let myc = this.data[1].data;
          return forkJoin([
            this.chartService.getNewPriceBTC(btc[btc.length - 1][1] ?? this.settings.initialPriceBTC),
            this.chartService.getNewPriceMY(myc[myc.length - 1][1] ?? this.settings.initialPriceMY)
          ])
        }),
        tap(
          (values: Array<number>) => {
            if (this.data[0]?.data?.length > this.settings.maxDataLength) {
              let currentData = [...this.data[0].data];
              currentData.shift();
              this.data[0].data = currentData;
            }
            if (this.data[1]?.data?.length > this.settings.maxDataLength) {
              let currentData = [...this.data[1].data];
              currentData.shift();
              this.data[1].data = currentData;
            }
            // Making and adding fake date
            this.currentDate = Helper.addHours(this.currentDate, 1);
            // TODO Compare last values and sort only if we need it
            this.data[0].data?.push([this.currentDate, values[0]]);
            this.data[0].data = [...this.data[0].data.sort(Helper.sortDate)]

            this.data[1].data?.push([this.currentDate, values[1]]);
            this.data[1].data = [...this.data[1].data.sort(Helper.sortDate)]
          }
        ));
  }

  stopDataStream(): void {
    this.dataUpdating = false;
  }
}
