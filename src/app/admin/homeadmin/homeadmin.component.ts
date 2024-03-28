import { Component } from '@angular/core';
import { HeaderadminComponent } from '../headeradmin/headeradmin.component';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homeadmin',
  standalone: true,
  imports: [HeaderadminComponent, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './homeadmin.component.html',
  styleUrl: './homeadmin.component.scss'
})
export class HomeadminComponent {
  userId: any;
  name: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      // console.log(this.userId);
    });

    const url = 'https://adv-node.onrender.com/project';
    this.http.get<any>(url).subscribe(
      (data: any) => {
        this.name = data;
        // console.log(this.name);
      },
      (error: any) => {
        // console.log(error);
      }
    );
  }

  profile(id: number) {
    this.router.navigate(['/Headeradmin', id]);
    this.router.navigate(['/profileUser', id]);
    // console.log(this.userId);
  }
}
