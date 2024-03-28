import { Component } from '@angular/core';
import { HeaderComponent } from '../../main/header/header.component';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [HeaderComponent, RouterModule, FormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
  name: any;
  userId: any;
  constructor(private router: Router, private routers: ActivatedRoute, private http:HttpClient) {
    const url = 'https://adv-node.onrender.com/project';
    this.http.get<any>(url).subscribe(
      (data: any) => {
        this.name = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.routers.params.subscribe(params => {
      this.userId = params['id'];
      // console.log(this.userId);
    });
  }

  send(){
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['profile/editprofile', this.userId]);
  }

  Old: string = '';
  New1: string = '';
  New2: string = '';
  passwordInput = '';

  Confirm(){
    // console.log(this.Old, this.New1, this.New2);
    const url = `https://adv-node.onrender.com/project/password/${this.userId}`;
    this.http.get<any>(url).subscribe(
      (data: any) => {
        if(this.Old === data[0].user_password){
          if(this.New1 !== this.New2){
            alert('รหัสผ่านไม่ตรงกัน');
          }
          else{
            const body = {
              'user_password': this.New2
            };
      
            const url = `https://adv-node.onrender.com/project/update/${this.userId}`;
            this.http.put<any>(url, body).subscribe(
              (data: any) => {
                // console.log(data);
                alert("เปลี่ยนรหัสผ่านสำเร็จ");
                this.router.navigate(['/Profile', this.userId]); 
              },
              (error: any) => {
                // console.log(error);
                alert(error.error.message);
              }
            );
          }
        }
        else{
          alert('รหัสผ่านไม่ถูกต้อง');
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  changeP(){
    alert('ll');
  }
}
