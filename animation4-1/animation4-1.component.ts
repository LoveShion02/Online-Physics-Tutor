//Topic: Forces 
//Description: Explains the relationship between mass, force and acceleration
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';

@Component({
  selector: 'app-animation4-1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animation4-1.component.html',
  styleUrl: './animation4-1.component.css'
})
export class Animation41Component {
  //Gets blocks in html file
  @ViewChild('block1') block1!: ElementRef;
  @ViewChild('block2') block2!: ElementRef;

  m1 = 10;
  m2 = 10;
  a1 = 100;
  a2 = 0;
  d = 0;
  t = 0;


  //Moves first block to hit second
  moveblock() {
    let tl = gsap.timeline();
    tl.set(this.block1.nativeElement, {width: this.m1, height: this.m1})
      //Speed of first block depends on mass and acceleration
      .to(this.block1.nativeElement, {x: 100 - this.m1 + 10, duration: this.t, ease: 'power1.in'})
      //Distance and speed of second block depends on force of first block
      .to(this.block2.nativeElement, {x: this.d, duration: 2});
    
  }


  calculate() {
    //Calculates parameters based on user input
    let force = this.m1 * this.a1;
    this.a2 = force / this.m2;
    this.d = this.a2;
    this.t = Math.sqrt((100 - this.m1 + 10) / this.a1);
    //Moves block
    this.moveblock();
  }

  reset() {
    //Sets everything to zero
    gsap.set(this.block1.nativeElement, {x: 0});
    gsap.set(this.block2.nativeElement, {x: 0});
  }
}

