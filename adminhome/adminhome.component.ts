import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LessoninfoService } from '../lessoninfo.service';
import { QuizinfoService } from '../quizinfo.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {

  rout = inject(Router);

  routparam = inject(ActivatedRoute);

  LessonS = inject(LessoninfoService);

  QuizS = inject(QuizinfoService);

  AuthS = inject(AuthService);

  Lessons: any[] = [];

  quizexists = false;

  userid: any = '';

  ngOnInit() {
    this.LessonS.getlessons().subscribe((lessons: any) => {
      this.Lessons = lessons;
    })
    this.routparam.paramMap.subscribe((id: any) => {
      this.userid = id;
      
    })

  }

  logout() {
    this.AuthS.logout();
    this.rout.navigate(['/login']);
  }

  //Navigates to lesson creation page
  createlesson() {
    this.rout.navigate(['/admin']);
  }

  //Navigates to lesson edit page
  editlesson(id: any) {
    this.rout.navigate(['/edit', id]);
  }

  deletelesson(id: any) {
    this.LessonS.deletelesson(id).subscribe((item: any) => {
      alert(item.message);
    })
  }

  //Navigates to quiz create/edit page
  createquiz(lessid: any) {
    this.QuizS.check(lessid).subscribe((item: any) => {
      //If quiz exists navigate to edit page
      if (item) {
        this.rout.navigate(['/quizedit', lessid]);
      }
      //If no quiz exists navigate to creation page
      else {
        this.rout.navigate(['/quizcreate', lessid]);
      }
    })
  }

  //Checks if quiz exists to determine where to navigate user
  checkforquiz(lessid: any) {
    this.QuizS.check(lessid).subscribe((item: any) => {
      this.quizexists = item;
    })
    
  }

}
