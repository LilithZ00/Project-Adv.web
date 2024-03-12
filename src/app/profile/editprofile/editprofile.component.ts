import { Component } from '@angular/core';
import { HeaderComponent } from '../../main/header/header.component';
import { Router,RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [HeaderComponent, RouterModule,CommonModule,HttpClientModule, FormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.scss'
})
export class EditprofileComponent {
  name: any[]=[];
  userId: any;
nameInput: any;
passwordInput: any;
  constructor(private router: Router, private routers: ActivatedRoute, private http:HttpClient) {
    const url = 'http://localhost:3000/project';
    this.http.get<any>(url).subscribe(
      (data: any) => {
        this.name = data;
        console.log(this.name);
      },
      (error: any) => {
        // console.log(error);
      }
    );
  }

  

  ngOnInit(): void {
    this.routers.params.subscribe(params => {
      this.userId = params['id'];
      // console.log(this.userId);
    });
  }

  Confirm(){
    // console.log(this.nameInput);
    // console.log(this.passwordInput);
    

    const body = {
      'user_name': this.nameInput,
    };
    const url =`http://localhost:3000/project/update/${this.userId}`;
    this.http.put<any>(url, body).subscribe(
      (data: any) => {
        // console.log(data);
        alert("เปลี่ยนชื่อสำเร็จ");
        this.router.navigate(['/Profile', this.userId]); 
      },
      (error: any) => {
        // console.log(error);
        alert(error.error.message);
      }
    );
  }

  send(){
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['profile/changepassword', this.userId]);
  }
}
