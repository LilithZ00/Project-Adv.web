import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-userpost',
    standalone: true,
    templateUrl: './userpost.component.html',
    styleUrl: './userpost.component.scss',
    imports: [HeaderComponent, CommonModule]
})
export class UserpostComponent {
    name: any;
    userId: any;

    constructor(private route: ActivatedRoute, private http: HttpClient,private router:Router) {
        this.route.params.subscribe(params => {
            this.userId = params['id'];
        });

        const url = 'https://adv-node.onrender.com/project/join';
        this.http.get<any>(url).subscribe(
            (data: any) => {
                this.name = data;
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    strs: String = 'Today';

    showGrapTo(idP: number) {
        this.router.navigate(['/header', this.userId]);
        this.router.navigate(['/score/grap', this.userId, idP, this.strs]);
    }
}
