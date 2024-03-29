import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { VotePopupComponent } from './../../vote-popup/vote-popup.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  [x: string]: any;
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

  constructor(public dialog: MatDialog, private router: ActivatedRoute, private http: HttpClient, private routers: Router) {
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

    const urls = 'https://adv-node.onrender.com/project/join';
    this.http.get<any>(urls).subscribe(
      (data: any) => {
        this.name = data;
        // console.log(this.name);
      },
      (error: any) => {
        console.log(error);
      }
    );

  }


  openVotePopup(position: string): void {
    // // ถ้ากำลังนับถอยหลัง ให้แสดง alert และออกจากฟังก์ชัน
    // if (this.isCountingDown) {
    //   alert('กรุณารอสักครู่');
    //   return;
    // }

    
  
    const dialogRef = this.dialog.open(VotePopupComponent, {
      width: '1200px',
      height: '650px',
      data: {
        selectedLeftName: this.selectedLeftName,
        selectedRightName: this.selectedRightName,
        selectedLeftPhoto: this.selectedLeftPhoto,
        selectedRightPhoto: this.selectedRightPhoto,
        selectedLeftUser_id: this.selectedLeftUser_id,
        selectedRightUser_id: this.selectedRightUser_id,
        selectedLeftPost_id: this.selectedLeftPost_id,
        selectedRightPost_id: this.selectedRightPost_id,
        LeftScore_sum: this.LeftScore_sum,
        RightScore_sum: this.RightScore_sum,
        id: this.userId,
      },
      // disableClose: true,
    });
  
      // let countdown = 10;
      // this.isCountingDown = true; // เริ่มนับถอยหลัง
  
      // const timer = setInterval(() => {
      //   if (countdown <= 0) {
      //     clearInterval(timer);
      //     this.isCountingDown = false; // เมื่อเวลาถอยหลังเสร็จสิ้นให้หยุดนับ
      //     console.log(this.isCountingDown);
      //   } 
      //   else {
      //     console.log('Countdown:', countdown);
      //     countdown--;
      //   }
      // }, 1000);
    
  
    
    if (position === 'left') {
      dialogRef.componentInstance.openWinImage();
    } else if (position === 'right') {
      dialogRef.componentInstance.openLoseImage();
    }
  }
  

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.userId = params['id'];
      // console.log(this.userId);
      
    });
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
      this.LeftScore_sum = this.name[randomIndex].score;

      // console.log(this.selectedLeftName);
    } else if (position === 'right') {
      this.selectedRightPhoto = this.name[randomIndex].post_photo;
      this.selectedRightName = this.name[randomIndex].post_caption; // เก็บชื่อที่สุ่มได้
      this.selectedRightUser_id = this.name[randomIndex].user_id;// เก็บ userid
      this.selectedRightPost_id = this.name[randomIndex].post_id;// เก็บ postid
      this.RightScore_sum = this.name[randomIndex].score;
      // console.log(this.selectedRightName);
    }
  }

  // sendVote(selectedLeftName: string, selectedLeftPhoto: string) {
  //   // console.log(selectedLeftName);
  //   // console.log(selectedLeftPhoto);
  //   // this.dialog.open(VotePopupComponent).componentInstance.sendVote();
    
  // }
  profile(id: number) {
      this.routers.navigate(['/header', id]);
      this.routers.navigate(['/main/userpost', id]);
    }
  }
  

