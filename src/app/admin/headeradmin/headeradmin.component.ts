import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-headeradmin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './headeradmin.component.html',
  styleUrl: './headeradmin.component.scss'
})
export class HeaderadminComponent {
 

  userId: any;
  constructor(private router: Router, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      // console.log(this.userId);
    });
  }
  scoreadmin() {
    this.router.navigate(['/Headeradmin', this.userId]);
    this.router.navigate(['/scoreadmin', this.userId]);
  }
  homeadmin() {
    this.router.navigate(['/Headeradmin', this.userId]);
    this.router.navigate(['/homeadmin', this.userId]);
  }
}
