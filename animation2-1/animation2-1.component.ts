import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CommonModule } from '@angular/common';

gsap.registerPlugin(MotionPathPlugin);

@Component({
  selector: 'app-animation1-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animation2-1.component.html',
  styleUrl: './animation2-1.component.css'
})
export class Animation21Component implements AfterViewInit {
  @ViewChild('character') character!: ElementRef;
  @ViewChild('straightpath') straightpath!: ElementRef;
  @ViewChild('zigzagPath') zigzagPath!: ElementRef; 

  ngAfterViewInit(): void {
    gsap.set(this.character.nativeElement, {x: 0, y: 0});
  }

  done = 0;

  isdistance = false;

  isdisplacement = false;


  //Moves the object over fixed path
  moveObject() {
    if (this.done == 0) {
      gsap.to(this.character.nativeElement, {
        duration: 3,
        motionPath: {
          path: [
            {x: 100, y: 50},
            {x: 200, y: -50},
            {x: 300, y: 50},
            {x: 400, y: -50},
            {x: 500, y: 50},
            {x: 600, y: -50}
          ],
          curviness: 0,
          autoRotate: true
        },
        ease: 'power1.inOut'
      });
    }
    this.done = 1;
  }

  //Highlights distance path
  distance() {
    if (this.done == 1) {
      gsap.set(this.zigzagPath.nativeElement, {stroke: 'black'});
      gsap.set(this.straightpath.nativeElement, {stroke: 'transparent'});
      
    }
  }

  //Highlights displacement (straight-line) path
  displacement() {
    this.isdisplacement = true;
    this.isdistance = false;
    gsap.set(this.straightpath.nativeElement, {stroke: 'black'});
    gsap.set(this.zigzagPath.nativeElement, {stroke: 'transparent'});
  }

  reset() {
    gsap.set(this.character.nativeElement, {x: 0, y: 0, rotate: 90});
    gsap.set(this.straightpath.nativeElement, {stroke: 'transparent'});
    gsap.set(this.zigzagPath.nativeElement, {stroke: 'transparent'});
    this.done = 0;
  }

}
