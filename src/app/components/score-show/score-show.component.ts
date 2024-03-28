import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderrshowComponent } from '../headerrshow/headerrshow.component';

@Component({
  selector: 'app-score-show',
  standalone: true,
  imports: [HeaderrshowComponent,CommonModule, RouterModule, HttpClientModule, MatTableModule],
  templateUrl: './score-show.component.html',
  styleUrl: './score-show.component.scss'
})
export class ScoreShowComponent {
  userId: any;
  datas: any;
  datad: any;
  constructor(private routers: Router, private router: ActivatedRoute, private http: HttpClient) {
    this.router.params.subscribe(params => {
      this.userId = params['id'];
    });

    const urls = "https://adv-node.onrender.com/post/scoreCheck";
    this.http.get<any>(urls).subscribe(
      (data: any) => {
        this.datas = data;
      },
      (error: any) => {
        alert(error);
      }
    );

    const urld = "https://adv-node.onrender.com/post/difference";
    this.http.get<any>(urld).subscribe(
      (data: any) => {
        this.datad = data;
      },
      (error: any) => {
        alert(error);
      }
    );
  }
  strs: String = 'Today';

  showGrapTo(idP: number) {
    this.routers.navigate(['showGraph', idP, this.strs]);
  }

}
