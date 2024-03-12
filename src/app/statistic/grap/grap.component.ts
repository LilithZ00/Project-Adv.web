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
export class GrapComponent implements OnInit {
    userId: any;
    idP: any;
    datas: any;

    chart: any;
    data: any[] | undefined;

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
        // Call API to get data
            this.http.get<any[]>('http://localhost:3000/vote/join').subscribe(data => {
            this.data = data;

            // Process data to prepare for chart
            const labels = this.data.map(item => item.date);
            const scores = this.data.map(item => item.score_sum);

            // Create chart
            this.createChart(labels, scores);
        });
    }

    createChart(labels: string[], scores: number[]): void {
        this.chart = new Chart('canvas', {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Score Sum',
                        data: scores,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        throw new Error('Method not implemented.');
    }

}
