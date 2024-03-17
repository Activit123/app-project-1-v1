import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from 'chart.js';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.statistics = data;
  }
  ngAfterViewInit(): void {
    this.statistics.forEach((stat, index) => {
      const levelCounts = this.levels.map(level => stat['Level' + level]);
  
      const canvas = document.getElementById(`chart${index}`) as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.levels.map(level => 'Level ' + level),
            datasets: [{
              data: levelCounts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
              ],
            }],
          },
        });
      } else {
        console.error('Failed to create chart: getContext returned null');
      }
    });
  }
  
}
