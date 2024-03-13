import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../main/header/header.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-grap',
    standalone: true,
    templateUrl: './grap.component.html',
    styleUrl: './grap.component.scss',
    imports: [HeaderComponent, RouterModule, CommonModule, HttpClientModule],

})
export class GrapComponent {
    userId: any;
    idP: any;
    datas: any;

    chart: any;
    data: any[] = [];


    constructor(private router: ActivatedRoute, private http: HttpClient) {
        this.router.params.subscribe(params => {
            this.userId = params['id'];
            this.idP = params['idP'];
            console.log(this.userId);
            console.log(this.idP);
        });



        const url = 'http://localhost:3000/vote/join';
        this.http.get<any>(url).subscribe(
            (data: any) => {
                console.log(data);
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

        // Calculate the start date 7 days ago
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);

        this.http.get<any[]>(`http://localhost:3000/post/grap/${this.idP}`).subscribe(data => {
            // Create an array of all dates within the last 7 days
            const dates = this.getDates(startDate);

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

    getDates(startDate: Date): string[] {
        const dates: string[] = [];
        for (let i = 0; i <= 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            dates.push(date.toISOString().slice(0, 10));
        }
        return dates;
    }

    createChart(labels: string[], scores: number[], pid: number[]): void {
        const differences: number[] = [];

        // Calculate score differences for each day\
        // scores[0] = scores[0] - 1000;

        for (let i = 1; i < scores.length; i++) {
            const difference = scores[i]
            differences.push(difference);
        }
        // Create chart
        this.chart = new Chart('canvas', {
            type: 'line',
            data: {
                labels: labels.slice(1), // Exclude the first date since there's no difference
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
                        suggestedMax: 2000 // ค่าสูงสุดของแกน Y
                    }
                }
            }
        });
    }




}


