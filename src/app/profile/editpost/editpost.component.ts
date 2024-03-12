import { Component } from '@angular/core';
import { HeaderComponent } from '../../main/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editpost',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './editpost.component.html',
  styleUrl: './editpost.component.scss'
})
export class EditpostComponent {

}
