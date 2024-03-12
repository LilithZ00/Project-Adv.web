import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userId: any;
  name: any[]=[];
  constructor(private router: Router, private routers: ActivatedRoute, private http:HttpClient) {
    this.routers.params.subscribe(params => {
      this.userId = params['id'];
      // console.log(this.userId);
    });

    const url = 'http://localhost:3000/project';
    this.http.get<any>(url).subscribe(
      (data: any) => {
        // const user = data.find((item: any) => item.user_id === this.userId);
        // if (user) {
        //   this.userId = user.user_id; // Update userId to the matched user's id
        // }
        this.name = data;
        // console.log(this.name);
      },
      (error: any) => {
        // console.log(error);
      }
    );
  }
  sendhome(){
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['/main',this.userId]);
  }
  sendprofile(){
    // this.router.navigate(['/main',this.userId]);
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['/Profile',this.userId]);
  }
  sendscore(){
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['/score',this.userId]);
  }

}

