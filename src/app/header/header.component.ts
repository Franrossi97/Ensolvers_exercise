import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name:String;
  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void
  {
    this.route.paramMap.subscribe(() =>
    {
      console.log(sessionStorage.getItem("name"));
      this.name=sessionStorage.getItem("name");
    });

  }

  onLogout()
  {
    this.authenticationService.logOut();
    this.name='';
    this.router.navigate(['login']);
  }

}
