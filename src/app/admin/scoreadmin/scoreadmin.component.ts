import { Component } from '@angular/core';
import { HeaderadminComponent } from '../headeradmin/headeradmin.component';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-scoreadmin',
  standalone: true,
  imports: [HeaderadminComponent, RouterModule, CommonModule, HttpClientModule, MatTableModule],
  templateUrl: './scoreadmin.component.html',
  styleUrl: './scoreadmin.component.scss'
})
export class ScoreadminComponent {
  userId: any;
  datas: any;
  datad: any;
  constructor(private routers: Router, private router: ActivatedRoute, private http: HttpClient) {
    this.router.params.subscribe(params => {
      this.userId = params['id'];
      // console.log(this.userId);
    });
    // console.log(this.userId);


    // const url = "https://adv-node.onrender.com/post/joinUser";
    // this.http.get<any>(url).subscribe(
    //   (data: any) => {
    //     // console.log(data);
    //   },
    //   (error: any) => {
    //     alert(error);
    //   }
    // );

    const urls = "https://adv-node.onrender.com/post/scoreCheck";
    this.http.get<any>(urls).subscribe(
      (data: any) => {
        this.datas = data;
        // console.log(" Top 10 " + this.datas);
      },
      (error: any) => {
        alert(error);
      }
    );

    const urld = "https://adv-node.onrender.com/post/difference";
    this.http.get<any>(urld).subscribe(
      (data: any) => {
        this.datad = data; // กำหนดค่าข้อมูลที่ได้รับในตัวแปร this.datad
        // console.log(" difference Top 10 " + this.datad);
      },
      (error: any) => {
        alert(error);
      }
    );
  }
  strs: String = 'Today';

  showGrapTo(idP: number) {
    this.routers.navigate(['/Headeradmin', this.userId]);
    this.routers.navigate(['/scoreadmin/grapadmin', this.userId, idP, this.strs]);
    // console.log(this.userId);
  }

  
}
