import {Component, OnInit} from '@angular/core';
import {StatisticsService} from "../../../services/statistics/statistics.service";
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  stats:any;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public lineChartType: ChartType = "line";
  public barChartLegend: boolean = true;
  public barChartData: any[] = [
    { data: [], label: 'Total Rides' }
  ];
  public barChartDataYear: any[] = [
    { data: [], label: 'Total Rides' }
  ];
  public barChartLabelsYear: string[] = [];

  ngOnInit() {
    this.statisticsService.getStatistics().subscribe(
      (res:any)=> {
        this.stats = res
        const ridesPerDay = res.totalRidesPerDay;
        const ridesPerYear = res.totalRidesPerYear;

        this.barChartLabels = Object.keys(ridesPerDay);
        this.barChartData[0].data = Object.values(ridesPerDay);
        this.barChartLabelsYear = Object.keys(ridesPerYear);
        this.barChartDataYear[0].data = Object.values(ridesPerYear);


      }
    )

  }
  constructor(public statisticsService : StatisticsService) {
  }


  protected readonly Object = Object;
  protected readonly Objectx = Object;
}
