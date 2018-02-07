import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Chart} from 'chart.js';
import {config} from '../../app.config';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart = [];

  constructor(private datePipe: DatePipe, translate: TranslateService) {
  }

  ngOnInit(): void {
    this.initDaysChart();
    this.initMonthsChart();
  }

  initDaysChart() {
    const data = {
      labels: config['items_count_by_7_days'].map(item => this.datePipe.transform(item['x'], 'MM/dd')),
      datasets: [{
        data: config['items_count_by_7_days'].map(item => item['y']),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }]
    };
    this.initTimeChart(data, 'canvasDays');
  }

  initMonthsChart() {
    const data = {
      labels: config['items_count_by_7_months'].map(item => this.datePipe.transform(item['x'], 'MMM')),
      datasets: [{
        data: config['items_count_by_7_months'].map(item => item['y']),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }]
    };
    this.initTimeChart(data, 'canvasMonths');
  }

  initTimeChart(data: object, canvasId: string) {
    const options = {
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0
          }
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      scaleShowLabels: true
    };

    this.chart = new Chart(canvasId, {
      type: 'bar',
      data: data,
      options: options
    });
  }

  startAnimationForLineChart(chart) {

  }

  startAnimationForBarChart(chart) {

  }

}
