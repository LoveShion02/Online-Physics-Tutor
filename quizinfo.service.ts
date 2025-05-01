import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizinfoService {

  Url = 'http://localhost:3000/api/quiz'

  http = inject(HttpClient);

  //Post new quiz
  postquiz(quiz: any) {
    return this.http.post(`${this.Url}/add`, quiz);
  }

  //Retrieve quiz
  getquiz(id: any) {
    return this.http.get(`${this.Url}/getbyid/${id}`);
  }

  getquizbyqid(id: any) {
    return this.http.get(`${this.Url}/getbyqid/${id}`);
  }

  //Check for quiz
  check(id: any) {
    return this.http.get(`${this.Url}/check/${id}`);
  }

  //Update quiz
  update(id: any, quiz: any) {
    return this.http.put(`${this.Url}/append/${id}`, quiz);
  }

  //Log quiz attempt
  log(quiz: any) {
    return this.http.post(`${this.Url}/attempt`, quiz);
  }

  //Find quiz attempt
  getattempt(id: any) {
    return this.http.get(`${this.Url}/getattempt/${id}`);
  }

  constructor() { }
}
