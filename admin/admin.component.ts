import { Component, inject } from '@angular/core';
import { LessoninfoService } from '../lessoninfo.service';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormArray, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  lessService = inject(LessoninfoService);

  AuthS = inject(AuthService);

  rout = inject(Router);

  //Log out of application
  logout() {
    this.AuthS.logout();
    this.rout.navigate(['/login']);
  }

  //Holds data being sent to the database
  lessongroup = new FormGroup({
    LessonNo: new FormControl('', [Validators.required]),
    Title: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Content: new FormArray([]),
    Exercises: new FormArray([])
  });

  //Creates new group for conent
  contentgroup() {
    return new FormGroup({
      STitle: new FormControl('', [Validators.required]),
      Section: new FormControl('', [Validators.required]),
      Animation: new FormControl(false, [Validators.required]),
      AnimationNo: new FormControl(null),
      Exercise: new FormControl(false, [Validators.required]),
      ExerciseNo: new FormControl(null)
    })
  }

  //Creates new group exercises
  exercisegroup() {
    return new FormGroup({
      ExerciseNo: new FormControl(null),
      MC: new FormControl(false),
      Match: new FormControl(false),
      Calculation: new FormControl(false),
      ExerciseType: new FormControl(''),
      ExerciseQ: new FormControl(''),
      AnswerOptions: new FormArray([new FormControl('')]),
      AnswerArray: new FormArray([new FormControl('')]),
      ExerciseA: new FormControl('')
    })
  }

  //Gets content array from lessongroup
  get content() {
    return this.lessongroup.get('Content') as FormArray;
  }

  //Gets exercises array from lessongroup
  get exercises() {
    return this.lessongroup.get('Exercises') as FormArray;
  }

  //Gets item in exercise subarray to populate
  getoptions(i: number): FormArray {
    return this.exercises.at(i).get('AnswerOptions') as FormArray; 
  }

  //Populates extrated exercise subarray
  addoption(i: number) {
    //pushes new empty item into options array that can be populated with user input
    this.getoptions(i).push(new FormControl(''));
  }

  getanswers(i: number): FormArray {
    return this.exercises.at(i).get('AnswerArray') as FormArray;
  }

  addpair(i: number) {
    //This adds both the option and the answer at once ensuring that there are the same number of options as answers
    this.getoptions(i).push(new FormControl(''));
    this.getanswers(i).push(new FormControl(''));
  }

  addsection() {
    //Adds populated content group to content array in lesson formgroup
    this.content.push(this.contentgroup());
  }

  addexercise() {
    //Adds populated exercise group to content array in lesson formgroup
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
    this.exercises.at(index).get('ExerciseType')?.setValue('matching');
    this.exercises.at(index).get('MC')?.setValue(false);
    this.exercises.at(index).get('Calculation')?.setValue(false);
    console.log(this.exercises.at(index).get('Calculation')?.value);
  }

  calc = false;

  setcalc(event: Event, index: any) {
    let input = event.target as HTMLInputElement;
    this.calc = input.checked;
    this.exercises.at(index).get('ExerciseType')?.setValue('calculation');
    this.exercises.at(index).get('MC')?.setValue(false);
    this.exercises.at(index).get('Match')?.setValue(false);
  }

  submit() {
    if (this.lessongroup.valid) {
      this.lessService.createlesson(this.lessongroup.value).subscribe((item: any) => {
        console.log('Lesson created!');
      })
    }
    else {
      console.log('Could not create lesson');
    }
  }

}
