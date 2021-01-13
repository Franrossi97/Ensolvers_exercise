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

  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)
    ) {
      this.router.navigate([''])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }

}
