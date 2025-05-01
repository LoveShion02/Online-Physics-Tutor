import { Component, inject, Injectable, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { LessoninfoService } from '../../lessoninfo.service';
import { UserinfoService } from '../../userinfo.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Animation21Component } from '../../animation2-1/animation2-1.component';
import { Animation22Component } from '../../animation2-2/animation2-2.component';
import { Animation31Component } from '../../animation3-1/animation3-1.component';
import { Animation41Component } from '../../animation4-1/animation4-1.component';
import { Animation51Component } from '../../animation5-1/animation5-1.component';
import { Animation61Component } from '../../animation6-1/animation6-1.component';
import { Animation71Component } from '../../animation7-1/animation7-1.component';
import { Animation81Component } from '../../animation8-1/animation8-1.component';
import { Animation82Component } from '../../animation8-2/animation8-2.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [
    RouterModule, 
    FormsModule, 
    CommonModule, 
    Animation21Component, 
    Animation22Component, 
    Animation31Component, 
    Animation41Component,
    Animation51Component,
    Animation61Component,
    Animation71Component,
    Animation81Component,
    Animation82Component
  ],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent {

  dom = inject(DomSanitizer);

  rout = inject(Router);

  routParams = inject(ActivatedRoute);

  lessonS = inject(LessoninfoService);

  UserS = inject(UserinfoService);

  lesson: any = null;

  id: any = '';

  userid: any = '';

  lessonattempted = false;

  logid = '';

  ngOnInit() {
    //Get lesson ID from homepage
    this.routParams.paramMap.subscribe(item => {
      this.id = item.get('lessid') || '';
      this.userid = item.get('userid') || '';
    });
    //Get the relevant lesson by calling the backend API function
    this.lessonS.getlessonbyid(this.id).subscribe((item: any) => {
      this.lesson = item;
      console.log(item);
      // Ensuring the lesson is retrieved before logging the attempt
      if (this.lesson) {
        console.log(item.LessonNo);
        let userinfo = {
          UserID: this.userid,
          LessonNo: this.lesson.LessonNo,
          DateStarted: new Date().toISOString().split('T')[0]
        };
        if (this.userid) {
          this.lessonS.checklog(this.userid, this.lesson.LessonNo).subscribe((item: any) => {
            this.lessonattempted = item.Response;
            this.logid = item.logid;
            //If it is not the attempt is logged
            if (!item.Response) {
              this.lessonS.loglessonattempt(userinfo).subscribe((item: any) => {
                console.log(item);
                this.logid = item;
              })
            }
          })
        }
        console.log(userinfo);
      }
      console.log('Lesson retrieved');
    }),
    (error: any) => {
      console.error(error);
    }
  }

  @ViewChildren('menutitles') menutitles!: QueryList<ElementRef>;
  @ViewChildren('content') content!: QueryList<ElementRef>;

  ngAfterViewInit() {
    setTimeout(() => {

    let obs = new IntersectionObserver((items) => {
      items.forEach(item => {
        //Checks for when the section is scrolled to
        if (item.isIntersecting) {
          this.menutitles.forEach(title => title.nativeElement.classList.remove('active'));

          let contentid = item.target.getAttribute('id');
          let activetitle = this.menutitles.find(title => title.nativeElement.getAttribute('data-id') === contentid);
          if (activetitle) {
            console.log(activetitle);
            console.log(contentid);
            activetitle.nativeElement.classList.add('active');
          }
          
        }
      })
    },
    {threshold: 0.4}); //Must have 0.4 of section on screen before highlighting section
    this.content.forEach(con => obs.observe(con.nativeElement));
    }, 0)
    
  }

  //

  sanitize(content: string): SafeHtml {
    return this.dom.bypassSecurityTrustHtml(content);
  }

  answer = '';

  answerm = '';

  correct = false;

  correctm = false;

  selectedoption = [];


  score = 0;

  setAnswer(ans: any) {
    this.answerm = ans;
  }

  isansm = false;

  markanswerm(sol: string, num: number) {
    this.correctm = false;
    this.isansm = true;
    if (this.answerm != '') {
      if (this.answerm == sol) {
        this.correctm = true;
        this.score = 1;
      }
    }
    this.logexattempt(num + 1);
  }

  isansc = false;
  markanswer(sol: string, num: number) {
    this.correct = false;
    this.isansc = true;
    if (this.answer != '') {
      if (this.answer == sol) {
        this.correct = true;
        this.score = 1;
      }
    }
    this.logexattempt(num + 1);
  }

  correctanswers = [];

  markmatches(index: number) {
    let exnum = 0;
    this.score = 0;
    this.lesson.Exercises.forEach((exercise: any, i: number) => {
      if (index === i) {
        exnum = exercise.ExerciseNo
        this.correctanswers = exercise.AnswerArray;
        console.log(this.correctanswers);
      }
    })
    if (this.correctanswers) {
      this.correctanswers.forEach((answer, index) => {
        if (answer == this.selectedoption[index]) {
          this.score++;
        }
      })
      this.logexattempt(exnum);
    }

    this.result = true;

    this.itemno = index;

  }

  result = false;

  itemno = 0;

  showresult() {
    this.result = true;
  }

  logexattempt(num: number) {
    let logdata = {
      UserID: this.userid,
      LessonNo: this.lesson.LessonNo,
      ExerciseNo: num,
      Score: this.score,
      DateAttempted: new Date().toISOString().split('T')[0]
    }
    this.lessonS.logexerciseattempt(logdata).subscribe((item: any) => {
      console.log(item);
    })
  }

  attemptquiz() {
    //Navigates to quiz page
    this.rout.navigate(['/quiz',this.id, this.userid, this.logid]);
  }

  returnhome() {
    this.rout.navigate(['/home', this.userid]);
  }

}
