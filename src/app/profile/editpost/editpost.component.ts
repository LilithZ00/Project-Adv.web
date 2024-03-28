import { Component } from '@angular/core';
import { HeaderComponent } from '../../main/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editpost',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './editpost.component.html',
  styleUrl: './editpost.component.scss'
})
export class EditpostComponent {
  idP: any;
  datas: any;
  userId: any;
  url: any;
  caption: any;
  constructor(private router: Router, private routers: ActivatedRoute, private http: HttpClient) {
    this.routers.params.subscribe(params => {
      this.userId = params['id'];
      this.idP = params['idP'];
      // console.log(this.userId,this.idP);
    });
    const url = `https://adv-node.onrender.com/post/${this.idP}`;
    this.http.get<any>(url).subscribe(
      (data: any) => {
        this.datas = data;
        
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  sendUpdate(id:number) {
    console.log(this.url);
    console.log(this.caption);

    const data = {
      'post_photo': this.url,
      'post_caption': this.caption
    };

    const urls = `https://adv-node.onrender.com/post/update_post/${id}`;
    this.http.put<any>(urls, data).subscribe(
      (data: any) => {
        alert('เปลี่ยนรูปสำเร็จ');
        // window.location.reload(); // รีเฟรชหน้าเว็บ
        this.router.navigate(['/header', this.userId]);
        this.router.navigate(['/Profile', this.userId]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  sendDelete(id:number) {
    const urls = `https://adv-node.onrender.com/post/delete_post/${id}`;
    this.http.delete<any>(urls).subscribe(
      (data: any) => {
        alert('ลบสำเร็จ');
        // window.location.reload(); // รีเฟรชหน้าเว็บ
        this.router.navigate(['/header', this.userId]);
        this.router.navigate(['/Profile', this.userId]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  back() {
    this.router.navigate(['/header', this.userId]);
    this.router.navigate(['/Profile', this.userId]);
  }
}
