import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AvataPopupComponent } from '../../avata-popup/avata-popup/avata-popup.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { sha256 } from 'js-sha256'; // Import sha256 function from 'js-sha256' module

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
    // const hashedPassword = sha256(this.password); // Hash the password using sha256
    //   console.log(hashedPassword);
    if (!this.username || !this.email || !this.password || !this.confirmpassword) {
      alert("โปรดกรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    if (this.password !== this.confirmpassword) {
      alert("รหัสผ่านไม่ตรงกัน")
    } else {
      const hashedPassword = sha256(this.password); // Hash the password using sha256
      console.log(hashedPassword);
      const body = {
        'user_name': this.username,
        'user_email': this.email,
        'user_password': hashedPassword, // Store hashed password in the database
        'user_type': 'user',
        'avatar_id': "1"
      };

      const url = 'https://adv-node.onrender.com/project/register';
      this.http.post<any>(url, body).subscribe(
        (data: any) => {
          // console.log(data);
          alert("สมัครสำเร็จ");
          this.router.navigate(['']); 
        },
        (error: any) => {
          // console.log(error);
          alert(error.error.message);
        }
      );
    }

  }

}
