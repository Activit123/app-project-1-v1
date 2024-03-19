import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart, ChartDataset, CoreChartOptions, DatasetChartOptions, DoughnutControllerChartOptions, ElementChartOptions, PluginChartOptions, ScaleChartOptions } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-statistics-popup',
  standalone: true,
  imports: [NgFor,CommonModule,BaseChartDirective],
  templateUrl: './statistics-popup.component.html',
  styleUrl: './statistics-popup.component.css'
})

export class StatisticsPopupComponent implements AfterViewInit{

  statistics: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.statistics = data;
  }
  // Define your data
 chartData:any;
 doughnutChartLabels = Object.keys(0);
 doughnutChartDatasets = Object.values(0).map((item:any) => ({
  data: [item.Level1, item.Level2, item.Level3, item.Level4, item.Level5],
  label: 'Total Users'
}));// Set options for the chart
 doughnutChartOptions = {
  responsive: false
};
  ngAfterViewInit(): void {
   console.log("intra");
   this.chartData = this.data;

  this.chartData = this.data;
   console.log(this.chartData);
    this.doughnutChartLabels = Object.keys(this.chartData);
    this.doughnutChartDatasets =  Object.values(this.chartData).map((item:any) => ({
      data: [item.Level1, item.Level2, item.Level3, item.Level4, item.Level5],
      label: 'Total Users'
    }));// Set options for the chart
    this.doughnutChartOptions = {
      responsive: false
    };
    throw new Error('Method not implemented.');
  }
}
