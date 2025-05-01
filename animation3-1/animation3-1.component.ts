//Topic: Projectile Motion 
//Description: This animation allows the user to adjust the initial velocity, angle
//and height and displays the projectile path
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';

@Component({
  selector: 'app-animation3-1',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './animation3-1.component.html',
  styleUrl: './animation3-1.component.css'
})
export class Animation31Component {
  @ViewChild('projectile') projectile!: ElementRef;
  v = 100;
  h = 50;
  th = 45;
  g = 9.81;

  ngAfterViewInit() {
    gsap.set(this.projectile.nativeElement, {x: 0, y: -this.h});
  }

  vy = this.v * Math.sin(this.th * Math.PI / 180);
  vx = this.v * Math.cos(this.th * Math.PI / 180);

  t = ((this.vy + Math.sqrt((this.vy ** 2)-(4 * (this.g / 2) * -this.h)))/(2 * this.g / 2));

  pointsx = <any>[];
  pointsy = <any>[];

  getpoints() {
    let b = this.t / 5;
    for (let x = 0; x <= this.t; x += b) {
      let px =  this.vx * x;
      //y coordinates depend on initial height and gravity
      let py = (((this.vy * x) + ((x ** 2) * (-this.g / 2))) + this.h);
      this.pointsx.push(px);
      this.pointsy.push(-py);
    }
  }

  launch() {
    gsap.set(this.projectile.nativeElement, {x: 0, y: -this.h});

    //Holds coordinates of path
    this.pointsx = <any>[];
    this.pointsy = <any>[];

    //Calculates inital velocity components
    this.vy = this.v * Math.sin(this.th * Math.PI / 180);
    this.vx = this.v * Math.cos(this.th * Math.PI / 180);

    //Calculates time of flight
    this.t = ((this.vy + Math.sqrt((this.vy ** 2)-(4 * (this.g / 2) * -this.h)))/(2 * this.g / 2));

    this.getpoints();
    gsap.to(this.projectile.nativeElement, {
      motionPath: {
        //path composed of 5 points
        path: [{x: this.pointsx[0], y: this.pointsy[0]}, {x: this.pointsx[1], y: this.pointsy[1]}, {x: this.pointsx[2], y: this.pointsy[2]}, {x: this.pointsx[3], y: this.pointsy[3]}, {x: this.pointsx[4], y: this.pointsy[4]}, {x: this.pointsx[5], y: this.pointsy[5]}],
        alignOrigin: [0.5, 1]
      },
      //Speeds up time for scale
      duration: this.t / 4,
      ease: 'none'
    });
  }
}
