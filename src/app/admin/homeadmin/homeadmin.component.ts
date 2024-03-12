import { Component } from '@angular/core';
import { HeaderadminComponent } from '../headeradmin/headeradmin.component';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-homeadmin',
  standalone: true,
  imports: [HeaderadminComponent,RouterModule],
  templateUrl: './homeadmin.component.html',
  styleUrl: './homeadmin.component.scss'
})
export class HomeadminComponent {
  constructor(private router: Router) {}
}
