import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-animation5-1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './animation5-1.component.html',
  styleUrl: './animation5-1.component.css'
})
export class Animation51Component {
  @ViewChild('pendulum') pendulum!: ElementRef;

  p = -60;
  ke = 0;
  pe = 0;
  mass = 2;
  g = 9.81;
  maxpe = 1.96;

  movependulum() {
    gsap.set(this.pendulum.nativeElement, {rotate: -this.p});
    this.calculate();
  }

  calculate() {
    let n = 0;
    if (this.p < 0) {
      n = -this.p;
    }
    else {
      n = this.p;
    }
    let a = (180 - n) / 2;
    let ra = a * Math.PI / 180;
    let c = Math.sqrt(0.08 - (0.08 * Math.cos(ra)));
    let h = parseFloat((c * Math.cos(ra)).toFixed(2));
    this.pe = parseFloat((this.mass * this.g * h).toFixed(2));
    this.ke = this.maxpe - this.pe;
    
  }
}
