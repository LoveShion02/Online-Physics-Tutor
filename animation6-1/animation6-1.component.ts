import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';

@Component({
  selector: 'app-animation6-1',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './animation6-1.component.html',
  styleUrl: './animation6-1.component.css'
})
export class Animation61Component {
  @ViewChild('block1') block1!: ElementRef;
  @ViewChild('block2') block2!: ElementRef;

  t = 10;
  p = 50;
  m = 50;
  distance = 30;
  p2 = 200;

  calculateforce() {
    gsap.set(this.block2.nativeElement, {x: this.p2});
    let force = this.p / this.t;
    let acc = force / this.m;
    let d = acc * (this.t ** 2);
    this.moveblock(this.p2);
  }

  moveblock(d: number) {
    let tl1 = gsap.timeline({
      onUpdate: () => {
        let block1p = parseFloat(gsap.getProperty(this.block1.nativeElement, 'x') as string);
  
        if (block1p >= (d - 50)) {
          gsap.to(this.block2.nativeElement, {x: '+=200', duration: 2});
          console.log(block1p);
        }
      }
    });
    tl1.to(this.block1.nativeElement, {x: 500, duration: 4, ease: 'power1.out'}, '+=0.5');
  }
}
