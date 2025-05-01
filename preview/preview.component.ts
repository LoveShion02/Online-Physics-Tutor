import { Component, inject } from '@angular/core';
import { LessoninfoService } from '../lessoninfo.service';
import { Animation21Component } from '../animation2-1/animation2-1.component';
import { Animation22Component } from '../animation2-2/animation2-2.component';
import { Animation31Component } from '../animation3-1/animation3-1.component';
import { Animation41Component } from '../animation4-1/animation4-1.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [Animation21Component, Animation22Component, Animation31Component, Animation41Component, FormsModule, CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  dom = inject(DomSanitizer);

  LessonS = inject(LessoninfoService);

  Lesson: any = null;

  routParams = inject(ActivatedRoute);

  lessid: any = '';

  ngOnInit() {
    this.routParams.paramMap.subscribe(lessid => {
      this.lessid = lessid.get('lessid');
    });

    this.LessonS.getlessonbyid(this.lessid).subscribe((lesson: any) => {
      this.Lesson = lesson;
      console.log(lesson);
    });
  }

  answer='';

  

  sanitize(content: string): SafeHtml {
    return this.dom.bypassSecurityTrustHtml(content);
  }
}
