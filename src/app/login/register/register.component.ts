import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AvataPopupComponent } from '../../avata-popup/avata-popup/avata-popup.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(public dialog: MatDialog, private http: HttpClient, private router: Router) { }

  username: string = '';
  password: string = '';
  email: string = '';
  confirmpassword: string = '';

  openAvatarPopup(): void {
    const dialogRef = this.dialog.open(AvataPopupComponent, {
      width: 'auto',
      height: '315px',
    });
  }

  async new() {
    if (!this.username || !this.email || !this.password || !this.confirmpassword) {
      alert("โปรดกรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    if (this.password !== this.confirmpassword) {
      alert("รหัสผ่านไม่ตรงกัน")
    } else {
      const body = {
        'user_name': this.username,
        'user_email': this.email,
        'user_password': this.password,
        'user_type': 'user',
        'avatar_id': "1"
      };

      const url = 'https://adv-node.onrender.com/project/register';
      this.http.post<any>(url, body).subscribe(
        (data: any) => {
          // console.log(data);
          alert("สมัครสำเร็จ");
          this.router.navigate(['/login']); 
        },
        (error: any) => {
          // console.log(error);
          alert(error.error.message);
        }
      );
    }

  }

}
