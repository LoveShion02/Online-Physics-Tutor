import { Component, ViewChild, EffectRef, ElementRef } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-animation8-2',
  standalone: true,
  imports: [],
  templateUrl: './animation8-2.component.html',
  styleUrl: './animation8-2.component.css'
})
export class Animation82Component {
  @ViewChild('spring1') spring1!: ElementRef;
  @ViewChild('spring2') spring2!: ElementRef;
  @ViewChild('spring3') spring3!: ElementRef;
  @ViewChild('spring4') spring4!: ElementRef;
  @ViewChild('spring5') spring5!: ElementRef;
  @ViewChild('spring6') spring6!: ElementRef;
  @ViewChild('spring7') spring7!: ElementRef;
  @ViewChild('spring8') spring8!: ElementRef;
  @ViewChild('spring9') spring9!: ElementRef;
  @ViewChild('spring10') spring10!: ElementRef;
  @ViewChild('spring11') spring11!: ElementRef;
  @ViewChild('spring12') spring12!: ElementRef;
  @ViewChild('block') block!: ElementRef;

  movespring() {
    gsap.to(this.spring1.nativeElement, {rotate: 45, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.spring2.nativeElement, {rotate: -45, x: 17, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.spring3.nativeElement, {rotate: 45, x: 17, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.spring4.nativeElement, {rotate: -45, x: 34, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.spring5.nativeElement, {rotate: 45, x: 34, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.spring6.nativeElement, {rotate: -45, x: 51, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.spring7.nativeElement, {rotate: 45, x: 51, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.spring8.nativeElement, {rotate: -45, x: 68, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.spring9.nativeElement, {rotate: 45, x: 68, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.spring10.nativeElement, {rotate: -45, x: 85, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.spring11.nativeElement, {rotate: 45, x: 85, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.spring12.nativeElement, {rotate: -45, x: 102, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
    gsap.to(this.block.nativeElement, {x: 102, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut'});
  }
}
