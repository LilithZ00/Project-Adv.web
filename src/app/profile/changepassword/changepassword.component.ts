import { Component } from '@angular/core';
import { HeaderComponent } from '../../main/header/header.component';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
  name: any[]=[];
  userId: any;
  constructor(private router: Router, private routers: ActivatedRoute, private http:HttpClient) {
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
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.routers.params.subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId);
    });
  }

  send(){
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['profile/editprofile', this.userId]);
  }
}
