import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  editFolder: FormGroup;
  username = 'javainuse'
  password = ''
  invalidLogin = false

  @ViewChild('ffrom') feedbackFormDirective;
  constructor(private router: Router,
    private loginservice: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit()
  {
    this.editFolder=this.formBuilder.group(
      {
        username:new FormControl(null,[Validators.required,Validators.minLength(2)]),
        password:new FormControl(null,[Validators.required,Validators.minLength(2)]),
      });
  }

  checkLogin()
  {
    const username=this.editFolder.get("username").value;
    const password=this.editFolder.get("password").value;
    this.loginservice.onLogging().subscribe(users =>
    {
      for(let i=0;i<users.length;i++)
      {
        console.log(users[i]);
        if(users[i].username===username)
        {
          if(users[i].password===password)
          {
            console.log(password);
            sessionStorage.setItem('username', username)
            sessionStorage.setItem('user_id', users[i].id.toString());
            sessionStorage.setItem('name', users[i].name);
            this.router.navigate(['/folders']);
          }
        }
      }
    });

  }

}
