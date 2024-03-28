import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../main/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, RouterModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  showWinImage: boolean = false;
  showLoseImage: boolean = false;
  name: any[] = [];
  constructor(private router: Router, private routers: ActivatedRoute, private http: HttpClient) {
    const url = 'https://adv-node.onrender.com/project/join';
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

  userId: any;

  ngOnInit(): void {
    this.routers.params.subscribe(params => {
      this.userId = params['id'];
      // console.log(this.userId);
    });
  }

  // นับจำนวนโพสท์ที่เกี่ยวข้องกับ userId
  countUserPosts(userId: number): Observable<number> {
    const url = `https://adv-node.onrender.com/project/join/${userId}`;
    return this.http.get<any[]>(url).pipe(
      map((posts: string | any[]) => posts.length) // นับจำนวนโพสท์ที่ได้รับมา
    );
  }

  // ฟังก์ชันตรวจสอบจำนวนโพสท์และทำการแจ้งเตือนหรือนำทางไปยังหน้าเพิ่มโพสท์ตามเงื่อนไข
  checkPostLimit() {
    this.countUserPosts(this.userId).subscribe((postCount: number) => {
      if (postCount >= 5) {
        alert('คุณมีรูปภาพครบ 5 รายการแล้ว');
      } else {
        // นำทางไปยังหน้าเพิ่มโพสท์
        this.router.navigate(['/header', this.userId]);
        this.router.navigate(['/profile/add', this.userId]);
        // console.log(postCount);
      }
    });
  }

  send() {
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['profile/editprofile', this.userId]);
  }

  sendpost(idP: number) {
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['profile/editpost', this.userId, idP]);
  }

  strs: String = 'Today';
  sendTograp(idP: number) {
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['/score/grap', this.userId, idP, this.strs]);
  }


  @ViewChild('fileInput') fileInput!: any;

  sendFileToServer() {
    const fileInputElement = this.fileInput.nativeElement as HTMLInputElement;
    const file: File = (fileInputElement.files as FileList)[0];

    const formData = new FormData();
    formData.append('file', file);

    const url = 'http://localhost:3000/upload';

    this.http.post(url, formData).subscribe(
      (response) => {
        console.log('File uploaded successfully', response);
        // ทำอย่างอื่นตามที่ต้องการหลังจากอัปโหลดไฟล์เสร็จสมบูรณ์
      },
      (error) => {
        console.error('Error uploading file', error);
        // จัดการข้อผิดพลาดที่เกิดขึ้นในการอัปโหลดไฟล์
      }
    );
  }
}
