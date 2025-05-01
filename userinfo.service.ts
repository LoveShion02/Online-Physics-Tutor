import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  Url = 'http://localhost:3000/api/users';

  http = inject(HttpClient);

  userid: any = null;

  //used right after login to avoid having to fetch the user id
  getuserbyemail(email: any) {
    return this.http.get(`${this.Url}/getbyemail/${email}`);
  }

  //used to customize pages to user
  getuserbyid(userid: any) {
    return this.http.get(`${this.Url}/getbyid/${userid}`);
  }

  setuserid(id: any) {
    this.userid = id;
  }

  getuserid() {
    if (this.userid) {
      return of(this.userid);
    }
    return of(null);
  }

  constructor() { }
}
