import { Component, inject } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { LessoninfoService } from '../lessoninfo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  rout = inject(Router);

  lessonS = inject(LessoninfoService);

  Lessons: any[] = [];

  ngOnInit() {
    this.lessonS.getlessons().subscribe((lessons: any) => {
      this.Lessons = lessons;
    })
  }

  login() {
    this.rout.navigate(['/login']);
  }

  startlesson(id: any) {
    this.rout.navigate(['/login', id]);
  }
}
