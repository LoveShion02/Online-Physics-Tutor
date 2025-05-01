import { Component, inject } from '@angular/core';
import { FormControl, FormArray, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { QuizinfoService } from '../quizinfo.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizedit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './quizedit.component.html',
  styleUrl: './quizedit.component.css'
})
export class QuizeditComponent {

  //Access API functions
  QuizS = inject(QuizinfoService);

  //Allows routing with data
  GetID = inject(ActivatedRoute);

  //Stores ID for lesson quiz is for
  LessonID: any = '';

  quizID: any = '';

  ngOnInit() {
    //Get lesson ID from previous page
    this.GetID.paramMap.subscribe((lessonID: any) => {
      this.LessonID = lessonID.get('lessid');
      this.QuizS.getquiz(lessonID.get('lessid')).subscribe((quiz: any) => {
        this.quizID = quiz._id;
        this.quizform.patchValue({
          LessonID: quiz.LessonID
        });

        quiz.Questions.forEach((question: any) => {
          let questionsgroup = this.QSubgroub();
          let optionsgroup = questionsgroup.get('Options') as FormArray;
          let hintsgroup = questionsgroup.get('Hints') as FormArray;
          optionsgroup.clear();
          questionsgroup.patchValue({
            QType: question.QType,
            Instructions: question.Instructions,
            CorrectAns: question.CorrectAns
          });
          question.Options.forEach((option: string) => {
            optionsgroup.push(new FormControl(option));
          });
          if(question.Hints) {
            question.Hints.forEach((hint: string) => {
              hintsgroup.push(new FormControl(hint));
            })
          }
          this.questions.push(questionsgroup);
        });
      })
    });

    

  }

  //Create formgroup to populate quiz repository
  quizform = new FormGroup({
    //The lesson ID is automatically taken from the previous page
    LessonID: new FormControl(''),
    Questions: new FormArray([])
  });

  //Creates sub-formgroup for questions array
  QSubgroub() {
    return new FormGroup({
      //Contains type of question (Multiple choice or calculation)
      QType: new FormControl('', [Validators.required]),
      //Contains the instruction for the question
      Instructions: new FormControl('', [Validators.required]),
      //Contains Options for multiple choice
      Options: new FormArray([]),
      //Contains the correct answer
      CorrectAns: new FormControl('', [Validators.required]),

      Hints: new FormArray([])
    });
  };

  //Extracts the Questions array from the main form
  get questions() {
    return this.quizform.get('Questions') as FormArray;
  }

  //For multiple choice, extract the options from the Questions array
  getoptions(i: number): FormArray {
    return this.questions.at(i).get('Options') as FormArray;
  }

  gethints(i: number): FormArray {
    return this.questions.at(i).get('Hints') as FormArray;
  }

  //Adds a new entry form in the Options array
  addoption(i: number) {
    this.getoptions(i).push(new FormControl(''));
  }

  //Add the quiz question to the quizform once completed
  addquestion() {
    this.questions.push(this.QSubgroub());
  }

  addhint(i: number) {
    this.gethints(i).push(new FormControl(''));
  }

  //Set the QType to be Multiple choice
  MC = false;

  setMC(event: Event, i: any) {
    let clicked = event.target as HTMLInputElement;
    this.MC = clicked.checked;
    this.Calc = false;
    this.questions.at(i).get('QType')?.setValue('MC');
    console.log(this.MC);
    console.log(this.questions.at(i).get('QType'));
  }

  //Set the QType to be Calculation based
  Calc = false;

  setCalc(event: Event, i: number) {
    let clicked = event.target as HTMLInputElement;
    this.Calc = clicked.checked;
    this.MC = false;
    this.questions.at(i).get('QType')?.setValue('Calculation')
  }

  //Submit Quiz
  Submit() {
    if (this.quizform.valid) {
      console.log(this.quizform.value);
      this.QuizS.update(this.quizID, this.quizform.value).subscribe((item: any) => {
        console.log(item);
      })
    }
    else {
      console.log('Could not create quiz');
    }
  }

}
