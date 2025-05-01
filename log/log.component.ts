import { Component, inject, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { LessoninfoService } from '../lessoninfo.service';
import { UserinfoService } from '../userinfo.service';


@Component({
  selector: 'app-log',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent {

  R2 = inject(Renderer2);

  authS = inject(AuthService);

  LessonS = inject(LessoninfoService);

  UserS = inject(UserinfoService);

  router = inject(Router);

  routParam = inject(ActivatedRoute);

  lessid: any = null;

  ngOnInit() {
    this.R2.setStyle(document.body, 'background-color', '#000B58');
    this.routParam.paramMap.subscribe(id => {
      this.lessid = id.get('lessid');
    })
  }

  ngOnDestroy() {
    this.R2.removeStyle(document.body, 'background-color');
  }

  student = false;

  admin = false;

  user = '';

  User: any = '';

  logpage = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required]),
    UserType: new FormControl('', [Validators.required])
  });

  setstudent() {
    this.student = true;
    this.user = 'student';
    this.setusertype('student');
  }

  setadmin() {
    this.admin = true;
    this.user = 'admin';
    this.setusertype('admin');
  }

  setusertype(type: string) {
    this.logpage.get('UserType')?.setValue(type);
  }

  Login() {
    if(this.logpage.valid) {
      this.authS.login(this.logpage.value).subscribe((item: any) => {
        //Checks if login was successful
        if (this.authS.LogCheck()) {
          if (item.usertype == 'admin') {
            //Gets user Id to pass to home page
            this.User = this.UserS.getuserbyemail(this.logpage.get('Email')?.value).subscribe((user: any) => {
              if (user) {
                this.router.navigate(['/adminhome', user._id]);
              }
            });
          }
          else if (item.usertype == 'student') {
            this.User = this.UserS.getuserbyemail(this.logpage.get('Email')?.value).subscribe((user: any) => {
              if (user) {
                if (this.lessid) {
                  console.log(this.lessid);
                  this.router.navigate(['/lesson', this.lessid, user._id]);
                }
                else {
                  this.router.navigate(['/home', user._id]);
                }
              }
            });
            console.log('login successful');
          }
          alert(item.message);
          
        }
      });
    }
    else {
      console.log('Incorrect Username or Password');
    }
  };

}
