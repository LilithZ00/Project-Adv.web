import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-headerrshow',
  standalone: true,
  imports: [],
  templateUrl: './headerrshow.component.html',
  styleUrl: './headerrshow.component.scss'
})
export class HeaderrshowComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

  homeShow() {
    this.router.navigate(['show']);
  }
  scoreShow() {
    this.router.navigate(['/showScore']);
  }
  login() {
    this.router.navigate(['']);
  }
}
