import { Component, inject } from '@angular/core';
import { FormsModule, FormControl, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessoninfoService } from '../lessoninfo.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  LessonNum = 0;

  lessons: any[] = [];

  lesson: any = null;

  LessonS = inject(LessoninfoService);

  rout = inject(Router);

  routParams = inject(ActivatedRoute);

  lessonselected = false;

  lessid: any = '';

  lessongroup = new FormGroup({
    LessonNo: new FormControl(null, [Validators.required]),
    Title: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Content: new FormArray([]),
    Exercises: new FormArray([])
  });

  contentgroup() {
    return new FormGroup({
      STitle: new FormControl('', [Validators.required]),
      Section: new FormControl('', [Validators.required]),
      Animation: new FormControl(false, [Validators.required]),
      AnimationNo: new FormControl(null),
      Image: new FormControl(false, [Validators.required]),
      ImageNo: new FormControl(null),
      Exercise: new FormControl(false, [Validators.required]),
      ExerciseNo: new FormControl(null)
    })
  }

  exercisegroup() {
    return new FormGroup({
      ExerciseNo: new FormControl(null),
      MC: new FormControl(false),
      Match: new FormControl(false),
      Calculation: new FormControl(false),
      ExerciseType: new FormControl(null),
      ExerciseQ: new FormControl(''),
      AnswerOptions: new FormArray([new FormControl('')]),
      AnswerArray: new FormArray([new FormControl('')]),
      ExerciseA: new FormControl('')
    })
  }


  ngOnInit() {
    //Extract lesson id sent from adminhome
    this.routParams.paramMap.subscribe(lessid => {
      this.lessid = lessid.get('lessid');
    });

    //Retrieve lesson using getlessonbyid function in the service
    this.LessonS.getlessonbyid(this.lessid).subscribe((lesson: any) => {
      //Populate the formsgroup input block
      this.lessongroup.patchValue({
        LessonNo: lesson.LessonNo,
        Title: lesson.Title,
        Description: lesson.Description
      });

      //For each content section retrieve the information
      lesson.Content.forEach((section: any) => {
        let sectiongroup = this.contentgroup();
        sectiongroup.patchValue({
          STitle: section.STitle,
          Section: section.Section,
          Animation: section.Animation,
          AnimationNo: section.AnimationNo,
          Image: section.Image,
          ImageNo: section.ImageNo,
          Exercise: section.Exercise,
          ExerciseNo: section.ExerciseNo
        });
        this.content.push(sectiongroup);
      });
      
  
      //For each exercise retrieve the information
      lesson.Exercises.forEach((exercise: any) => {
        let exerciseGroup = this.exercisegroup();
        let answeroptions = exerciseGroup.get('AnswerOptions') as FormArray;
        let answerarray = exerciseGroup.get('AnswerArray') as FormArray;
        answeroptions.clear();
        answerarray.clear();
        exercise.AnswerOptions.forEach((option: string) => {
          answeroptions.push(new FormControl(option));
        })
        exercise.AnswerArray.forEach((option: string) => {
          answerarray.push(new FormControl(option));
        })
        exerciseGroup.patchValue({
          ExerciseNo: exercise.ExerciseNo,
          MC: exercise.MC,
          Match: exercise.Match,
          Calculation: exercise.Calculation,
          ExerciseType: exercise.ExerciseType,
          ExerciseQ: exercise.ExerciseQ,
          ExerciseA: exercise.ExerciseA
        });
        this.exercises.push(exerciseGroup);
      });

    })

    
  }

  get content() {
    return this.lessongroup.get('Content') as FormArray;
  }

  get exercises() {
    return this.lessongroup.get('Exercises') as FormArray;
  }

  getoptions(i: number): FormArray {
    return this.exercises.at(i).get('AnswerOptions') as FormArray; 
  }

  addoption(i: number) {
    this.getoptions(i).push(new FormControl(''));
  }

  getanswers(i: number): FormArray {
    return this.exercises.at(i).get('AnswerArray') as FormArray;
  }

  addpair(i: number) {
    this.getoptions(i).push(new FormControl(''));
    this.getanswers(i).push(new FormControl(''));
  }

  removeoption(exi: number, pairi: number) {
    this.getoptions(exi).removeAt(pairi);
  }

  removeanswer(exi: number, pairi: number) {
    this.getanswers(exi).removeAt(pairi);
  }

  addsection() {
    this.content.push(this.contentgroup());
  }

  addexercise() {
    this.exercises.push(this.exercisegroup());
  }

  MC = false;

  setMC(event: Event, index: any) {
    let input = event.target as HTMLInputElement;
    this.MC = input.checked;
    this.exercises.at(index).get('ExerciseType')?.setValue('MC');
    this.exercises.at(index).get('Match')?.setValue(false);
    this.exercises.at(index).get('Calculation')?.setValue(false);
  }

  Match = false;

  setMatch(event: Event, index: any) {
    let input = event.target as HTMLInputElement;
    this.Match = input.checked;
    this.exercises.at(index).get('ExerciseType')?.setValue('Match');
    this.exercises.at(index).get('MC')?.setValue(false);
    this.exercises.at(index).get('Calculation')?.setValue(false);
  }

  calc = false;

  setcalc(event: Event, index: any) {
    let input = event.target as HTMLInputElement;
    this.calc = input.checked;
    this.exercises.at(index).get('ExerciseType')?.setValue('Calculation');
    this.exercises.at(index).get('Match')?.setValue(false);
    this.exercises.at(index).get('MC')?.setValue(false);
  }

  submit() {
    this.LessonS.appendlesson(this.lessid, this.lessongroup.value).subscribe((item: any) => {
      console.log('Lesson Updated!');
    });
  }

  seepreview() {
    this.rout.navigate(['/preview', this.lessid]);
  }
}
