import { Component } from '@angular/core';
import { HeaderComponent } from '../../main/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [HeaderComponent,RouterModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

}
