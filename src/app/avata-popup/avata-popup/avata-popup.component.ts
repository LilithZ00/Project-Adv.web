import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-avata-popup',
  standalone: true,
  imports: [MatDialogModule, HttpClientModule, CommonModule],
  templateUrl: './avata-popup.component.html',
  styleUrl: './avata-popup.component.scss'
})
export class AvataPopupComponent {

  avatars: any[] = [];

  constructor(public dialogRef: MatDialogRef<AvataPopupComponent>, private http: HttpClient) {
    const url = 'https://adv-node.onrender.com/avatar';
    this.http.get<any>(url).subscribe(
      (data: any) => {
        this.avatars = data;
        console.log(this.avatars); // ควรเปลี่ยนเป็น avatars[0].avatar หรือ avatars[0].avata ตามชื่อที่ถูกต้องในข้อมูลที่รับมา
      },
      (error: any) => {
        console.log(error);
      }
    );
    
  }
  sendavatar(id:any){
    console.log(id);
  }
}
