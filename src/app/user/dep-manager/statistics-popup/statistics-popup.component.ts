import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from 'chart.js';
interface SkillStatistics {
  [key: string]: {
    TotalUsers: number;
    Level1: number;
    Level2: number;
    Level3: number;
    Level4: number;
    Level5: number;
  };
}
@Component({
  selector: 'app-statistics-popup',
  standalone: true,
  imports: [NgFor,CommonModule],
  templateUrl: './statistics-popup.component.html',
  styleUrl: './statistics-popup.component.css'
})

export class StatisticsPopupComponent implements AfterViewInit{
 
  statistics: any[];
  levels = [1, 2, 3, 4, 5];
  title = 'ng-chart';
  chart: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.statistics = data;
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    if (this.statistics) {
      this.generatePieCharts();
    }
  }

  generatePieCharts(): void {
    // Level-based statistics
    const levelLabels = ['Level1', 'Level2', 'Level3', 'Level4', 'Level5'];
 // const levelData = levelLabels.map(label => this.statistics[label]?.TotalUsers ?? 0);
  //this.generatePieChart('levelChart', levelLabels, levelData);

    // Total count of people on each skill
    const skillLabels = Object.keys(this.statistics);
  //  const skillData = skillLabels.map(label => this.statistics[label].TotalUsers);
  //  this.generatePieChart('skillChart', skillLabels, skillData);
  }

  generatePieChart(chartId: string, labels: string[], data: number[]): void {
    const ctx = document.getElementById(chartId) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderWidth: 1
        }]
      }
    });
  }
  
}
