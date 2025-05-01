import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessoninfoService {

  lessonid: any = null;

  userid: any = null;

  http = inject(HttpClient);

  Url = 'http://localhost:3000/api/lessons';

  //Post lesson to database
  createlesson(item: any) {
    return this.http.post(`${this.Url}/add`, item);
  }

  //Update lesson in database
  appendlesson(id: any, item: any) {
    return this.http.put(`${this.Url}/append/${id}`, item);
  }

  //Deletes lesson
  deletelesson(id: any) {
    return this.http.delete(`${this.Url}/delete/${id}`);
  }

  //Retrieve all lessons
  getlessons() {
    return this.http.get(`${this.Url}/get/all`);
  }

  //Retrieve specific lesson
  getlessonbyid(id: any) {
    return this.http.get(`${this.Url}/getbyid/${id}`);
  }

  //Track user attempt
  loglessonattempt(item: any) {
    return this.http.post(`${this.Url}/loglesson`, item);
  }

  //Check if user has attempted lesson
  checklog(id: any, lessnum: any) {
    return this.http.post(`${this.Url}/checklog`, { UserID: id, LessonNo: lessnum });
  }

  //Track user exercise attempt
  logexerciseattempt(item: any) {
    return this.http.post(`${this.Url}/exercise`, item);
  }

  completelog(id: any, item: any) {
    return this.http.post(`${this.Url}/complete/${id}`, item);
  }

  getlog(item: any) {
    return this.http.post(`${this.Url}/getlog`, item);
  }

  constructor() { }
}
