import { Component, inject } from '@angular/core';
import { LessoninfoService } from '../lessoninfo.service';
import { QuizinfoService } from '../quizinfo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  routParams = inject(ActivatedRoute);

  QuizS = inject(QuizinfoService);

  LessonS = inject(LessoninfoService);

  rout = inject(Router);

  Quiz: any = '';

  dom = inject(DomSanitizer);

  logid: any = '';

  userid: any = '';

  lessid: any = '';

  //Form group for Quiz submission
  quizform = new FormGroup({
    UserID: new FormControl(''),
    QuizID: new FormControl(''),
    Answers: new FormArray([]),
    DateAttempted: new FormControl(''),
    Result: new FormControl(0)
  })

  ngOnInit() {
    //Retrieve lesson id and user id from previous page
    this.routParams.paramMap.subscribe((item) => {
      this.logid = item.get('logid');
      this.userid = item.get('userid');
      this.lessid = item.get('lessid');
      this.QuizS.getquiz(item.get('lessid')).subscribe((quiz: any) => {

        //Allows for use in the HTML
        this.Quiz = quiz;
        quiz.Questions.forEach((question: any) => {
          this.corans.push(question.CorrectAns);
        })
        //Adds user id and quiz id to database
        this.quizform.patchValue({
          UserID: item.get('userid'),
          QuizID: quiz._id
        })
      })
    })
  }

  get answers() {
    return this.quizform.get('Answers') as FormArray;
  }

  score = 0;

  subans: any = [];

  corans: any = [];

  

  setans(click: Event, ans: string, i: number) {
    let input = click.target as HTMLInputElement;
    if (input.checked) {
      this.subans[i] = ans;
    }
  }

  sanitize(content: string): SafeHtml {
    return this.dom.bypassSecurityTrustHtml(content);
  }


  iscorrect = false;

  Markanswer(cor: string, i: number) {
    //Always starts iscorrect as false for new exercise submission
    this.iscorrect = false;
    if (this.subans[i] === cor) {
      this.iscorrect = true;
    }
  }

  

  results() {
    //Tallies the score of the quiz
    this.score = 0;
    this.corans.forEach((ans: any, i: number) => {
      this.answers.push(new FormControl(this.subans[i]));
      if (ans === this.subans[i]) {
        this.score++;
      }
    })


    //Logs date of attempt and result of the quiz as a percentage
    this.quizform.patchValue({
      //Only logs attempt once. If user leaves before submitting this is not logged.
      DateAttempted: new Date().toISOString().split('T')[0],
      Result: this.score * 100 / this.corans.length
    })

    let loginfo = {
      DateCompleted: new Date().toISOString().split('T')[0],
      Result: this.score * 100 / this.corans.length
    }

    //Adds quizform to database
    this.QuizS.log(this.quizform.value).subscribe((item: any) => {
      console.log(item.id);
      //Routes to results page
      this.rout.navigate(['/results', item.id, this.userid]);
    })

    this.LessonS.completelog(this.logid, loginfo).subscribe((item: any) => {
      console.log(item);
    })

  }
}
