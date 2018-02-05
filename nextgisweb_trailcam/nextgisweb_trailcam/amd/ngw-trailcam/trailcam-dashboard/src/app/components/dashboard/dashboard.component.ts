import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart = [];

  constructor(translate: TranslateService) {
  }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Mn', 2, 3],
        datasets: [
          {
            data: [1, 2, 3],
            borderColor: '#3cba9f',
            fill: false
          },
          {
            data: [1, 2, 3],
            borderColor: '#ffcc00',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  startAnimationForLineChart(chart) {

  }

  startAnimationForBarChart(chart) {

  }

}
