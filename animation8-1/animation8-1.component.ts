import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animation8-1',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './animation8-1.component.html',
  styleUrl: './animation8-1.component.css'
})
export class Animation81Component {
  @ViewChild('sball') sball!: ElementRef;
  @ViewChild('cball') cball!: ElementRef;

  ngAfterViewInit() {
    gsap.to(this.sball.nativeElement, {x: 300, duration: 3, repeat: -1, yoyo: true, ease: 'power1.inOut'});
    gsap.to(this.cball.nativeElement, {rotate: 360, duration: 6, repeat: -1, ease: 'none'});
  }
}
