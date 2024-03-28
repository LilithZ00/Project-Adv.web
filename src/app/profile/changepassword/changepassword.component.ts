import { Component } from '@angular/core';
import { HeaderComponent } from '../../main/header/header.component';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { sha256 } from 'js-sha256'; // Import sha256 function from 'js-sha256' module

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
  

  Confirm() {
     // แปลงรหัสผ่านเป็นรูปแบบของ hash
  const oldPasswordHash = sha256(this.Old);
  const newPasswordHash = sha256(this.New2);

  const url = `https://adv-node.onrender.com/project/password/${this.userId}`;
  this.http.get<any>(url).subscribe(
    (data: any) => {
      if(oldPasswordHash === data[0].user_password){
        if(this.New1 !== this.New2){
          alert('รหัสผ่านไม่ตรงกัน');
        }
        else{
          const body = {
            'user_password': newPasswordHash
          };
    
          const url = `https://adv-node.onrender.com/project/update/${this.userId}`;
          this.http.put<any>(url, body).subscribe(
            (data: any) => {
              alert("เปลี่ยนรหัสผ่านสำเร็จ");
              this.router.navigate(['/Profile', this.userId]); 
            },
            (error: any) => {
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
