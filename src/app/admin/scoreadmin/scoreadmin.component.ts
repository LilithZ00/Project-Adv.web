import { Component } from '@angular/core';
import { HeaderadminComponent } from '../headeradmin/headeradmin.component';
import { Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-scoreadmin',
  standalone: true,
  imports: [HeaderadminComponent, RouterModule],
  templateUrl: './scoreadmin.component.html',
  styleUrl: './scoreadmin.component.scss'
})
export class ScoreadminComponent {
  constructor(private router: Router) {}
}
