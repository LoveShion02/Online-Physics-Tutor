import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { LessoninfoService } from '../../lessoninfo.service';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  lessons: any[] = [];

  lessId = '';

  rout = inject(Router);

  routParams = inject(ActivatedRoute);

  lessinfo = inject(LessoninfoService);

  AuthS = inject(AuthService);

  userid: any = '';

  //Holds the status of each lesson, either completed or not
  status: any[] = [];

  ngOnInit() {
    this.status = [];
    this.routParams.paramMap.subscribe(item => {
      this.userid = item.get('userid') || '';
    });
    this.lessinfo.getlessons().subscribe((items: any) => {
      this.lessons = items;
      items.forEach((less: any) => {
        let loginfo = {
          UserID: this.userid,
          LessonNo: less.LessonNo
        }
        this.lessinfo.getlog(loginfo).subscribe((item: any) => {
          if(item && item.result) {
            this.status.push({complete: true, result: item.result.toFixed(2), LessonNo: loginfo.LessonNo});
          }
          else if (item && !item.result) {
            this.status.push({complete: false, LessonNo: loginfo.LessonNo});
          }
        })
      })
      
    }),
    (error: any) => {
      console.error(error)
    }
  }

  startlesson(id: any) {
    this.rout.navigate(['/lesson', id, this.userid]);
  }

  logout() {
    this.AuthS.logout();
    this.rout.navigate(['/login']);
  }
}
