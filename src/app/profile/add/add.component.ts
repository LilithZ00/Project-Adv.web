import { Component } from '@angular/core';
import { HeaderComponent } from '../../main/header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [HeaderComponent, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  userId: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      // console.log(this.userId);
      // this.sendData(this.userId);
    });

  }


  url: string = '';
  caption: string = '';
  sendData(): void {
    // เช็คว่ามีข้อมูลทั้ง caption และ url หรือไม่
    if (!this.caption || !this.url) {
        alert('โปรดกรอกข้อมูลให้ครบ');
        return; // หยุดการทำงานทันทีหากข้อมูลไม่ครบ
    }

    const urlss = 'http://localhost:3000/post/insert_post';

    const data = {
        'post_photo': this.url,
        'post_caption': this.caption,
        'post_time': '',
        'user_id': this.userId
    };

    this.http.post<any>(urlss, data,).subscribe(
        (data: any) => {
            alert('เพิ่มรูปภาพสำเร็จ');
            this.router.navigate(['/header', this.userId]);
            this.router.navigate(['/Profile', this.userId]);
        },
        (error: any) => {
            alert(error.error.message);
        }
    );
}


  back() {
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['/Profile', this.userId]);
  }
}
