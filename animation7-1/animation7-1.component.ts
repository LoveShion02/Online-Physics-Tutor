import { Component, ViewChild,  ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';

@Component({
  selector: 'app-animation7-1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animation7-1.component.html',
  styleUrl: './animation7-1.component.css'
})
export class Animation71Component {
  @ViewChild('pendulum') pendulum!: ElementRef;
  @ViewChild('string') string!: ElementRef;
  @ViewChild('bob') bob!: ElementRef;

  F = 100;
  m = 1;
  v = 0;
  r = 50;
  t = 0;

  calculate() {
    let l = this.r / 100;
    this.v = Math.sqrt(this.F * l / this.m);
    let c = 2 * Math.PI * l;
    this.t = c / this.v;
    this.spin();
  }

  spin() {
    gsap.set(this.pendulum.nativeElement, { rotation: 0 }); 

    gsap.set(this.string.nativeElement, {height: this.r});
    gsap.set(this.bob.nativeElement, {y: this.r - 50});
    gsap.to(this.pendulum.nativeElement, {rotate: 360, duration: this.t, delay: 0.5, ease: 'none'});
    console.log(this.t);
  }
}
