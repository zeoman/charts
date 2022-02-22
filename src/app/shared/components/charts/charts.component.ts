import {AfterViewInit, Attribute, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts  from "highcharts/highstock";
import {Observable, Subscription} from "rxjs";
import {ChartSource} from "../../../core/types/chart-source.type";
import {DATA_GENERATOR_SETTINGS} from "../../../core/constants/data-generator-settings.const";


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() data: Array<ChartSource> = [];
  @Input() updateTrigger$: Observable<any> | undefined;
  @Input() dataUpdating: boolean = false;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {}; // required
  updateFlag: boolean = false;

  updateSub = new Subscription();

  constructor(
    @Attribute('title') public title: string = 'Title',
    @Attribute('yPostfix') public yPostfix: string = '',
    @Attribute('containerId') public containerId: string,
    @Attribute('type') public type: 'range' | 'dynamic'
  ) {
  }

  ngOnInit(): void {
    if (this.type === 'dynamic') {
      this.initDynamicChart();
    }
  }

  ngAfterViewInit(): void {
    if (this.type === 'range') {
      this.initRangeSelectChart();
    }
  }

  initDynamicChart(): void {
    this.chartOptions = {
      title: {
        text: this.title
      },
      series: this.data,
      tooltip: {
        formatter: function() {
          let date = new Date(this.x);
          return `The value for <b>${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}
                    ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}</b> is <b>${this.y}</b>, in series ${this.series.name}`;
        }
      },
      yAxis: {
        labels: {
          formatter: element => {
            return element.value + this.yPostfix;
          }
        },
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          day: '%e. %b',
          week: '%e. %b',
          month: '%b \'%y',
          year: '%Y'
        },
        min: new Date().getTime(),
        title: {
          text: 'Date'
        }
      },
      credits: {
        enabled: false
      },
    }
  }

  initRangeSelectChart(): void {
    Highcharts.stockChart(this.containerId,{
      title: {
        text: this.title
      },
      series: this.data,
      yAxis: {
        labels: {
          formatter: element => {
            return element.value + this.yPostfix;
          }
        },
      },
      credits: {
        enabled: false
      },
    });
  }

  checkLimit(): void {
    if (this.data[0].data.length > DATA_GENERATOR_SETTINGS.maxDataLength) {
      // TODO Add logic to find min date from all sources
      // @ts-ignore
      this.chartOptions.xAxis.min = this.data[0].data[0][0];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['dataUpdating']) {
      if (changes['dataUpdating'].currentValue === true && this.updateTrigger$ !== undefined) {
        this.updateSub = this.updateTrigger$.subscribe(
          () => {
            this.checkLimit();
            this.updateFlag = true
          }
        )
      } else {
        this.updateSub.unsubscribe();
      }
    }
  }

  ngOnDestroy(): void {
    this.updateSub.unsubscribe();
  }
}
