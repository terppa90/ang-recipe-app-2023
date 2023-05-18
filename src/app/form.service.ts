import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  _url = 'https://localhost:3000/recipes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}
  // Reseptin lisäys serverille lomakkeelta
  FormAddRecipe(userData) {
    const mytoken = JSON.parse(sessionStorage['token']);
    userData.token = mytoken.token;
    return this.http.post<any>(this._url, userData, this.httpOptions);
  }
}
