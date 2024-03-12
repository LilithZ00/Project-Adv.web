import { Component } from '@angular/core';
import { HeaderComponent } from "../../main/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-show',
    standalone: true,
    templateUrl: './show.component.html',
    styleUrl: './show.component.scss',
    imports: [HeaderComponent, RouterModule]
})
export class ShowComponent {
    userId: any;
  isLeftButtonClicked: boolean = false;
  isRightButtonClicked: boolean = false;
  name: any;
  selectedLeftPhoto: string = '';
  selectedRightPhoto: string = '';
  selectedLeftName: string = '';
  selectedRightName: string = '';
  selectedLeftUser_id: number | undefined;
  selectedRightUser_id: number | undefined;
  selectedLeftPost_id: number | undefined;
  selectedRightPost_id: number | undefined;
  id: number | undefined;
  LeftScore_sum: number | undefined;
  RightScore_sum: number | undefined;

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
        const url = 'http://localhost:3000/post';
    this.http.get<any>(url).subscribe(
      (data: any) => {
        this.name = data;
        // console.log(this.name);
        

        // เลือกรูปภาพสุ่มสำหรับทั้งซ้ายและขวา
        this.selectRandomPhoto('left');
        this.selectRandomPhoto('right');
      },
      (error: any) => {
        // console.log(error);
      }
    );
     }

    showAlert() {
        alert('กรุณาล็อกอิน');
        this.router.navigate(['/login']); // นำทางไปยังหน้า login
    }

    // เลือกรูปภาพแบบสุ่ม
  selectRandomPhoto(position: string): void {
    // เช็คว่ารูปภาพที่สุ่มถูกเลือกแล้วหรือยัง
    if ((position === 'left' && this.selectedLeftPhoto) || (position === 'right' && this.selectedRightPhoto)) {
      return; // ถ้าถูกเลือกแล้วให้ออกจากฟังก์ชัน
    }
    // เลือกสุ่มรูปภาพและตรวจสอบว่าซ้ำกันหรือไม่
    let randomIndex = Math.floor(Math.random() * this.name.length);
    while (
      (position === 'left' && this.selectedRightUser_id === this.name[randomIndex].user_id) ||
      (position === 'right' && this.selectedLeftUser_id === this.name[randomIndex].user_id)
    ) {
      randomIndex = Math.floor(Math.random() * this.name.length);
    }

    if (position === 'left') {
      this.selectedLeftPhoto = this.name[randomIndex].post_photo;
      this.selectedLeftName = this.name[randomIndex].post_caption; // เก็บชื่อที่สุ่มได้
      this.selectedLeftUser_id = this.name[randomIndex].user_id;// เก็บ userid
      this.selectedLeftPost_id = this.name[randomIndex].post_id;// เก็บ postid
      this.LeftScore_sum = this.name[randomIndex].score_sum;
      
      // console.log(this.selectedLeftName);
    } else if (position === 'right') {
      this.selectedRightPhoto = this.name[randomIndex].post_photo;
      this.selectedRightName = this.name[randomIndex].post_caption; // เก็บชื่อที่สุ่มได้
      this.selectedRightUser_id = this.name[randomIndex].user_id;// เก็บ userid
      this.selectedRightPost_id = this.name[randomIndex].post_id;// เก็บ postid
      this.RightScore_sum = this.name[randomIndex].score_sum;
      // console.log(this.selectedRightName);
    }
  }

}
