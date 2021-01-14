import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseURL } from '../shared/baseUrl';
import { User } from '../shared/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  isUserLoggedIn(): boolean// Observable<boolean>
  {
    let user = sessionStorage.getItem('username')
    //var subject=new Subject<boolean>();
    //subject.next(!(user === null));
    console.log(!(user === null));
    return !(user === null);
  }

  logOut()
  {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');
  }

  onLogging():Observable<User[]>
  {
    const getUrl=`${baseURL}users`;

    return this.httpClient.get<GetResponseUsers>(getUrl).pipe(map(response => response._embedded.users));
  }
}

interface GetResponseUsers
{
  _embedded:
  {
    users: User[];
  }
}
