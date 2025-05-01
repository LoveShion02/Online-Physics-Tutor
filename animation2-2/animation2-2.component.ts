//Topic 2: Linear Motion
//Creates different graphs of motion
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';

@Component({
  selector: 'app-animation2-2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animation2-2.component.html',
  styleUrl: './animation2-2.component.css'
})
export class Animation22Component {

  a = 0;
  v = 0;
  p = 0;

  acc = false;
  vel = false;

  //Tells the system if it is a constant acceleration or a constant velocity
  setacc() {
    this.acc = true;
    this.vel = false;
  }

  setvel() {
    this.vel = true;
    this.acc = false;
  }
  showex = false;

  creategraph() {
    this.showex = true;
    //Gets three lines
    let position = document.getElementById('position');
    let velocity = document.getElementById('velocity');
    let acceleration = document.getElementById('acceleration');
    
    let a = 'M 100 200';
    let b = 'M 100 200';
    let c = `M 100 ${200 - this.a * 40} L 300 ${200 - this.a*40}`;
    let d = `M 100 ${200 - this.v * 40} L 300 ${200 - this.v*40}`;
    //Calculates paths of each graph pixel by pixel for smooth graph
    if(this.acc) {
      for (let i = 100; i <= 300; i+=1) {
        let v = this.a * (i - 100);
        a += `L ${i} ${200 - v}`;

        this.p = this.a * (((i - 100)/40) ** 2);
        console.log(this.p);
        b += `L ${i} ${200 - (this.p) * 40}`;

      }
    
      velocity?.setAttribute("d", a);
      position?.setAttribute("d", b);
      acceleration?.setAttribute("d", c);
    }

    if(this.vel) {
      for (let i = 100; i <= 300; i+=1) {
        this.p = this.v * (i - 100);
        a += `L ${i} ${200 - this.p}`;
      }
      velocity?.setAttribute("d", d);
      position?.setAttribute("d", a);
      acceleration?.setAttribute("d", 'M 100 200 L 300 200');
    }
    
  }
}
