import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../main/header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [HeaderComponent, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  userId: any;
  @ViewChild('fileInput') fileInput!: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  url: string = '';
  caption: string = '';
  sendData(img: any, uid: any, caption: any): void {
    // สร้าง object ข้อมูลที่ต้องการส่งไปยังเซิร์ฟเวอร์
    const data = {
      'post_photo': img, // ใช้ URL จากการอัปโหลดไฟล์แทน 'aaa'
      'post_caption': caption,
      'post_time': '', // ค่าเวลาที่ควรจะมี
      'user_id': uid,
    };

    const url = 'https://adv-node.onrender.com/post/insert_post';
    this.http.post<any>(url, data).subscribe(
      (response) => {
        console.log(response);
        alert('อัพโหลดรูปสำเร็จ'); // แสดงข้อความแจ้งเตือน
        // อื่นๆ ที่ต้องการทำหลังจาก insert ข้อมูลเสร็จสิ้น
        this.router.navigate(['/Profile', this.userId]);
      },
      (error) => {
        console.error('Error inserting data:', error);
        alert('Error inserting data');
      }
    );
}

sendFileToServer() {
    const file: File = this.fileInput.nativeElement.files[0];
    if (!file) {
      alert('Please select a file');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    const uploadUrl = 'https://adv-node.onrender.com/upload'; // URL สำหรับอัปโหลดไฟล์
    this.http.post(uploadUrl, formData).subscribe(
      (response: any) => {
        // เรียกใช้ sendData เพื่อส่งข้อมูลไป insert ลงในฐานข้อมูล
        this.sendData(response.filename, this.userId, this.caption);
      },
      (error) => {
        console.error('Error uploading file:', error);
        alert('Error uploading file');
      }
    );
}


  back() {
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['/Profile', this.userId]);
  }
}