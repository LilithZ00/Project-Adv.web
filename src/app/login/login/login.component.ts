import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { sha256 } from 'js-sha256'; // Import sha256 function from 'js-sha256' module

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  Inmain() {
    this.router.navigate(['/show']);
  }
  email: string = '';
  password: string = '';
  avatars: any[] = [];
  num: number = 67;

  constructor(private router: Router, private http: HttpClient) { }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    const hashedPassword = sha256(this.password); // Hash the password using sha256
    const url = 'https://adv-node.onrender.com/project';
    this.http.get<any>(url).subscribe(
      (data: any) => {
        this.avatars = data;
        let loggedIn = false;

        for (let av of this.avatars) {
          if (this.email === av.user_email && hashedPassword === av.user_password) { // Compare hashed passwords
            if (av.user_id === this.num) {
              this.router.navigate(['/homeadmin', av.user_id]);
            } else {
              this.router.navigate(['/header', av.user_id]);
              this.router.navigate(['/main', av.user_id]);
            }
            loggedIn = true;
            break;
          }
        }

        if (!loggedIn) {
          alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง..");
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
