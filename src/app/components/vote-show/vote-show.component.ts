import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vote-show',
  standalone: true,
  imports: [MatDialogModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './vote-show.component.html',
  styleUrl: './vote-show.component.scss'
})
export class VoteShowComponent {
  
  selectedLeftName: string;
  selectedRightName: string;
  selectedRightPhoto: any;
  selectedLeftPhoto: any;
  selectedLeftUser_id: number | undefined;
  selectedRightUser_id: number | undefined;
  selectedLeftPost_id: number | undefined;
  selectedRightPost_id: number | undefined;
  id: number | undefined;
  LeftScore_sum: number | undefined;
  RightScore_sum: number | undefined;
  post: any;
  name: any[] = [];


  dataarr: any[] = [];
  K: number;

  rightNewELO: number | undefined; // เพิ่มตัวแปร rightNewELO
  leftNewELO: number | undefined; // เพิ่มตัวแปร LiftNewELO
  leftExpectation: number | undefined;
  rightExpectation: number | undefined;
  rightELO: number | undefined;
  leftELO: number | undefined;
  rightActual: number | undefined;
  leftActual: number | undefined;

  constructor(public dialogRef: MatDialogRef<VoteShowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private router: Router,
    private route: ActivatedRoute) {
    this.selectedLeftName = data.selectedLeftName;
    this.selectedRightName = data.selectedRightName;
    this.selectedLeftPhoto = data.selectedLeftPhoto;
    this.selectedRightPhoto = data.selectedRightPhoto;
    this.selectedLeftUser_id = data.selectedLeftUser_id;
    this.selectedRightUser_id = data.selectedRightUser_id;
    this.selectedRightPost_id = data.selectedRightPost_id;
    this.selectedLeftPost_id = data.selectedLeftPost_id;
    this.LeftScore_sum = data.LeftScore_sum;
    this.RightScore_sum = data.RightScore_sum;

    this.id = data.id;

    this.K = 30;

    // console.log(this.LeftScore_sum);
    // console.log(this.RightScore_sum);

  }

  showWinImage: boolean = false;
  showLoseImage: boolean = false;


  openWinImage() {
    this.showWinImage = true;
    this.showLoseImage = false;
    // console.log("Lef"+this.selectedLeftUser_id);
    // console.log("Lef"+this.selectedLeftPost_id);
    // console.log("Lef"+this.LeftScore_sum);  
    this.sendVote(this.selectedLeftUser_id, this.selectedLeftPost_id, this.LeftScore_sum);

  }

  openLoseImage() {
    this.showWinImage = false;
    this.showLoseImage = true;
    // console.log("Right"+this.selectedRightUser_id);
    // console.log("Right"+this.selectedRightPost_id);
    // console.log("Right"+this.RightScore_sum);
    this.sendVote(this.selectedRightUser_id, this.selectedRightPost_id, this.RightScore_sum);
  }

  // User_id: number | undefined, Post_id: number | undefined
  sendVote(User_id: number | undefined, Post_id: number | undefined, Score: number | undefined) {
    const Luser = this.selectedLeftUser_id;
    const Lpost = this.selectedLeftPost_id;
    const Lscore = this.LeftScore_sum;
    const Ruser = this.selectedRightUser_id;
    const Rpost = this.selectedRightPost_id;
    const Rscore = this.RightScore_sum;

    // console.log(Lpost);
    // console.log(Rpost);
    // console.log(Luser);
    // console.log(Ruser);

    // console.log("Left User"+this.selectedLeftUser_id);
    // console.log("Left Post"+this.selectedLeftPost_id);
    // console.log("Left Score" + this.LeftScore_sum);
    // console.log("Right User"+this.selectedRightUser_id);
    // console.log("Right Post"+this.selectedRightPost_id);
    // console.log("Right Score" + this.RightScore_sum);
    let pjr: any[] = [];

    const url = "https://adv-node.onrender.com/post/join";
    this.http.get<any>(url).subscribe(
      (data: any) => {
        pjr = data;
      },
      (error: any) => {
        alert(error.error.message);
      }
    );

    // console.log(pjr);

    let leftVoteData = {
      vote_sum: 0,
      score_sum: 0,
      user_id: Luser,
      post_id: Lpost
    };

    let rightVoteData = {
      vote_sum: 0,
      score_sum: 0,
      user_id: Ruser,
      post_id: Rpost
    };

    let Ldata = {
      'score': 0,
    };
    let Rdata = {
      'score': 0,
    };
    // console.log(this.LeftScore_sum);

    if (typeof this.LeftScore_sum !== 'undefined' && typeof this.RightScore_sum !== 'undefined') {
      let leftELO = this.LeftScore_sum;
      let rightELO = this.RightScore_sum;

      // คำนวณความคาดหวังของแต่ละฝ่าย
      let leftExpectation = 1 / (1 + Math.pow(10, (rightELO - leftELO) / 400));
      let rightExpectation = 1 / (1 + Math.pow(10, (leftELO - rightELO) / 400));


      //ไม่เข้า if นี้
      if (Luser === User_id) {
        console.log("1");
        let leftScore = 1; // กำหนดค่าคะแนนสำหรับฝ่ายทางซ้าย
        let leftActual = 1; // ผลจริงที่ฝ่ายทางซ้ายได้
        let leftNewELO = leftELO + this.K * (leftActual - leftExpectation); // คำนวณคะแนนใหม่ของฝ่ายทางซ้าย
        // console.log("Left's new ELO:", leftNewELO);//update post

        let rightScore = 1; // กำหนดค่าคะแนนสำหรับฝ่ายทางขวา
        let rightActual = 0; // ผลจริงที่ฝ่ายทางขวาได้
        let rightNewELO = rightELO + this.K * (rightActual - rightExpectation); // คำนวณคะแนนใหม่ของฝ่ายทางขวา

        // leftVoteData.vote_sum += 1;
        leftVoteData.score_sum = leftNewELO;
        rightVoteData.score_sum = rightNewELO;
        Ldata.score = leftNewELO;
        Rdata.score = rightNewELO;
        console.log("Right's new ELO:", rightNewELO);//update post

        this.leftNewELO = leftNewELO; // กำหนดค่า rightNewELO
        this.rightNewELO = rightNewELO; // กำหนดค่า rightNewELO
        this.leftExpectation = leftExpectation;
        this.rightExpectation = rightExpectation;
        this.rightELO = rightELO;
        this.leftELO = leftELO;
        this.rightActual = rightActual;
        this.leftActual = leftActual;

      }
      else if (Ruser === User_id) {
        // console.log("2");
        rightVoteData.vote_sum = 1;
        let leftScore = 1; // กำหนดค่าคะแนนสำหรับฝ่ายทางซ้าย
        let leftActual = 0; // ผลจริงที่ฝ่ายทางซ้ายได้
        let leftNewELO = leftELO + this.K * (leftActual - leftExpectation); // คำนวณคะแนนใหม่ของฝ่ายทางซ้าย
        // console.log("Left's new ELO:", leftNewELO);//update post

        let rightScore = 1; // กำหนดค่าคะแนนสำหรับฝ่ายทางขวา
        let rightActual = 1; // ผลจริงที่ฝ่ายทางขวาได้
        let rightNewELO = rightELO + this.K * (rightActual - rightExpectation); // คำนวณคะแนนใหม่ของฝ่ายทางขวา

        // rightVoteData.vote_sum += 1;
        leftVoteData.score_sum = leftNewELO;
        rightVoteData.score_sum = rightNewELO;
        Ldata.score = leftNewELO;
        Rdata.score = rightNewELO;
        // console.log("Right's new ELO:", rightNewELO);//update post

        this.leftNewELO = leftNewELO; // กำหนดค่า rightNewELO
        this.rightNewELO = rightNewELO; // กำหนดค่า rightNewELO
        this.leftExpectation = leftExpectation;
        this.rightExpectation = rightExpectation;
        this.rightELO = rightELO;
        this.leftELO = leftELO;
        this.rightActual = rightActual;
        this.leftActual = leftActual;

      }
      // ต่อไปจะเป็นการใช้ค่าความคาดหวังนี้ในการดำเนินการต่อไป
    } else {
      // console.error("Error: LeftScore_sum or RightScore_sum is undefined");
    }

    const urls = "https://adv-node.onrender.com/vote/insert_vote";
    this.http.post<any>(urls, leftVoteData,).subscribe(
      (data: any) => {
        // console.log("Left vote inserted:", data);
      },
      (error: any) => {
        alert(error.error.message);
      }
    );

    this.http.post<any>(urls, rightVoteData).subscribe(
      (data: any) => {
        // console.log("Right vote inserted:", data);
      },
      (error: any) => {
        alert(error.error.message);
      }
    );



    const urlss = `https://adv-node.onrender.com/post/update_post/${Lpost}`;
    // console.log(Lpost);
    this.http.put<any>(urlss, Ldata).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        alert(error.error.message);
      }
    );

    const urlsss = `https://adv-node.onrender.com/post/update_post/${Rpost}`;
    // console.log(Rpost);
    const data_score = {
      'score': 1,
    };
    this.http.put<any>(urlsss, Rdata).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        alert(error.error.message);
      }
    );

    // รีเฟรชหน้า main
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['show'], { queryParamsHandling: 'preserve' });
      // this.dialogRef.close();

    });

  }

}
