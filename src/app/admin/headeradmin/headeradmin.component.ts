import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-headeradmin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './headeradmin.component.html',
  styleUrl: './headeradmin.component.scss'
})
export class HeaderadminComponent {
  constructor(private router: Router) {}
}
