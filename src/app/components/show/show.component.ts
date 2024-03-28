import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { VoteShowComponent } from '../vote-show/vote-show.component';
import { MatDialog } from '@angular/material/dialog';
import { HeaderrshowComponent } from '../headerrshow/headerrshow.component';


@Component({
  selector: 'app-show',
  standalone: true,
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss',
  imports: [ RouterModule, HeaderrshowComponent,HttpClientModule]
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

  isCountingDown: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, public dialog: MatDialog,) {
    const url = 'https://adv-node.onrender.com/post';
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

  showVoet(position: string) {
    const dialogRef = this.dialog.open(VoteShowComponent, {
      width: '1200px',
      height: '650px',
      data: {
        selectedLeftName: this.selectedLeftName, // ส่งชื่อที่เลือกทางซ้าย
        selectedRightName: this.selectedRightName, // ส่งชื่อที่เลือกทางขวา
        selectedLeftPhoto: this.selectedLeftPhoto, // ส่งรูปที่เลือกทางซ้าย
        selectedRightPhoto: this.selectedRightPhoto, // ส่งรูปที่เลือกทางขวา
        selectedLeftUser_id: this.selectedLeftUser_id,// ส่ง userid ที่เลือกทางซ้าย
        selectedRightUser_id: this.selectedRightUser_id,// ส่ง userid ที่เลือกทางขวา
        selectedLeftPost_id: this.selectedLeftPost_id,// ส่ง postid ที่เลือกทางซ้าย
        selectedRightPost_id: this.selectedRightPost_id,// ส่ง postid ที่เลือกทางขวา
        LeftScore_sum: this.LeftScore_sum,
        RightScore_sum: this.RightScore_sum,
        id: this.userId,
      },
      // disableClose: true,
    });

    
  
    // ตรวจสอบพิกัดที่ส่งมาและทำตามคำสั่งที่เหมาะสม
    if (position === 'left') {
      dialogRef.componentInstance.openWinImage();
    } else if (position === 'right') {
      dialogRef.componentInstance.openLoseImage();
    }
  }

    // เลือกรูปภาพแบบสุ่ม
    selectRandomPhoto(position: string): void {
      // เช็คว่ารูปภาพที่สุ่มถูกเลือกแล้วหรือยัง
      if((position === 'left' && this.selectedLeftPhoto) || (position === 'right' && this.selectedRightPhoto)) {
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
      this.LeftScore_sum = this.name[randomIndex].score;
      // console.log(this.LeftScore_sum);

      // console.log(this.selectedLeftName);
    } else if (position === 'right') {
      this.selectedRightPhoto = this.name[randomIndex].post_photo;
      this.selectedRightName = this.name[randomIndex].post_caption; // เก็บชื่อที่สุ่มได้
      this.selectedRightUser_id = this.name[randomIndex].user_id;// เก็บ userid
      this.selectedRightPost_id = this.name[randomIndex].post_id;// เก็บ postid
      this.RightScore_sum = this.name[randomIndex].score;
      // console.log(this.RightScore_sum);
    }
    
  }
  

}
