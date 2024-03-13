import { Component } from '@angular/core';
import { HeaderComponent } from "../../main/header/header.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';


@Component({
    selector: 'app-score',
    standalone: true,
    templateUrl: './score.component.html',
    styleUrl: './score.component.scss',
    imports: [HeaderComponent, CommonModule, RouterModule, HttpClientModule, MatTableModule]
})
export class ScoreComponent {
    userId: any;
    datas: any;
    constructor(private routers: Router, private router: ActivatedRoute, private http: HttpClient) {
        this.router.params.subscribe(params => {
            this.userId = params['id'];
            // console.log(this.userId);
        });
        console.log(this.userId);


        const url = "http://localhost:3000/post/joinUser";
        this.http.get<any>(url).subscribe(
            (data: any) => {
                // console.log(data);
              },
              (error: any) => {
                alert(error);
              }
        );

        const urls = "http://localhost:3000/post/score10";
        this.http.get<any>(urls).subscribe(
            (data: any) => {
                
                this.datas = data;
                // console.log(this.datas);
              },
              (error: any) => {
                alert(error);
              }
        );

        const urlsss = "http://localhost:3000/vote/date";
        this.http.get<any>(urlsss).subscribe(
            (data: any) => {
                console.log(data);
              },
              (error: any) => {
                alert(error);
              }
        );

        
    }




    showGrap(idP : number) {
        this.routers.navigate(['/header', this.userId]);
        this.routers.navigate(['/score/grap', this.userId, idP]);
        console.log(this.userId);
    }

    oninit(){
        
    }
}
