import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  avatars: any[]=[];
  num: number = 67;


  constructor(private router: Router, private http: HttpClient) { }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    const url = 'http://localhost:3000/project';
    this.http.get<any>(url).subscribe(
      (data: any) => {
        this.avatars = data;
        let loggedIn = false; // เพิ่มตัวแปรเพื่อตรวจสอบว่ามีการเข้าสู่ระบบสำเร็จหรือไม่
  
        for (let av of this.avatars) {
          if (this.email === av.user_email && this.password === av.user_password) {
            if (av.user_id === this.num) {
              this.router.navigate(['/homeadmin', av.user_id]); // ใช้ av.user_id ในการระบุไอดีใน URL parameter
            } else {
              this.router.navigate(['/header', av.user_id]);
              this.router.navigate(['/main', av.user_id]);
            }
            loggedIn = true; // เมื่อพบข้อมูลผู้ใช้งานที่ตรงกันแล้วให้กำหนดค่าเป็น true
            break; // หยุดการวนซ้ำเมื่อพบข้อมูลที่ตรงกันแล้ว
          }
        }
  
        if (!loggedIn) { // ถ้าไม่เข้าสู่ระบบสำเร็จ
          alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง..");
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  
  

}
