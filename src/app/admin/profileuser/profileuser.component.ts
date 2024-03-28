import { Component } from '@angular/core';
import { HeaderadminComponent } from '../headeradmin/headeradmin.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profileuser',
  standalone: true,
  imports: [HeaderadminComponent, HttpClientModule, CommonModule],
  templateUrl: './profileuser.component.html',
  styleUrl: './profileuser.component.scss'
})
export class ProfileuserComponent {

  name: any;
  userId: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      // console.log(this.userId);
    });

    const url = 'https://adv-node.onrender.com/project/join';
    this.http.get<any>(url).subscribe(
      (data: any) => {
        this.name = data;
        // console.log(this.name);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  strs: String = 'Today';

  showGrapTo(idP: number) {
    this.router.navigate(['/Headeradmin', this.userId]);
    this.router.navigate(['/scoreadmin/grapadmin', this.userId, idP, this.strs]);
    // console.log(this.userId);
  }
}
