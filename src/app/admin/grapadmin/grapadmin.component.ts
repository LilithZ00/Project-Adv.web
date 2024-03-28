import { Component } from '@angular/core';
import { HeaderadminComponent } from '../headeradmin/headeradmin.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grapadmin',
  standalone: true,
  imports: [HeaderadminComponent, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './grapadmin.component.html',
  styleUrl: './grapadmin.component.scss'
})
export class GrapadminComponent {
  userId: any;
  idP: any;
  datas: any;

  chart: any;
  data: any[] = [];
  str: any;


  constructor(private router: ActivatedRoute, private http: HttpClient) {
      this.router.params.subscribe(params => {
          this.userId = params['id'];
          this.idP = params['idPT'];
          this.str = params['str'];
          // console.log(this.userId);
          // console.log(this.idP);
        //   console.log(this.str);
      });



      const url = 'https://adv-node.onrender.com/vote/join';
      this.http.get<any>(url).subscribe(
          (data: any) => {
            //   console.log(data);
              this.datas = data;
          },
          (error: any) => {
              alert("quay");
          }
      );
  }
  ngOnInit(): void {
      this.router.params.subscribe(params => {
          this.idP = params['idP'];
      });

      // Fetch data from the API
      this.http.get<any[]>(`https://adv-node.onrender.com/post/grap/${this.idP}`).subscribe(data => {
          // Create an array of all dates within the last 7 days
          const endDate = new Date(data[data.length - 1].date); // Use the last date from the dataset
          const startDate = new Date(endDate);
          startDate.setDate(startDate.getDate() - 6); // Start date is 7 days before the end date

          const dates = this.getDates(startDate, endDate);

          // Initialize differences array with 0s for all dates
          const differences: number[] = Array(dates.length).fill(0);
          const pid: number[] = Array(dates.length).fill(0);

          // Populate differences array with score differences where available
          data.forEach(item => {
              const index = dates.indexOf(item.date);
              if (index !== -1) {
                  differences[index] = item.score_sum;
                  pid[index] = item.post_id
              }
          });

          // Adjust score difference for dates with only one vote
          for (let i = 1; i < differences.length; i++) {
              if (differences[i] === 0) {
                  differences[i] = differences[i - 1];
              }
          }

          // Create chart
          this.createChart(dates, differences, pid);
      });
  }

  getDates(startDate: Date, endDate: Date): string[] {
      const dates: string[] = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
          dates.push(currentDate.toISOString().slice(0, 10));
          currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
  }

  createChart(labels: string[], scores: number[], pid: number[]): void {
      const differences: number[] = [];

      // Calculate score differences for each day\
      // scores[0] = scores[0] - 1000;
      if (this.str === 'Today') {
          for (let i = 0; i < scores.length; i++) { //day
              const difference = scores[i];
              differences.push(difference);
          }
      }

      // Create chart
      this.chart = new Chart('canvas', {
          type: 'line',
          data: {
              labels: labels, // Include all dates within the last 7 days
              datasets: [
                  {
                      label: 'Score Difference',
                      data: differences,
                      borderColor: 'rgb(75, 192, 192)',
                      tension: 0.1
                  }
              ]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true,
                      suggestedMin: 0, // ค่าขั้นต่ำของแกน Y
                      suggestedMax: 1600 // ค่าสูงสุดของแกน Y
                  }
              }
          }
      });
  }




}
