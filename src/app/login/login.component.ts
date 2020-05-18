import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../controller/Auth/authentication.service';
import {User} from '../controller/model/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // noinspection JSAnnotator
  constructor(private authenticationService: AuthenticationService) {
  }

  public user: User = new User(0, '', '', '', '', '', false, '');

  ngOnInit() {
    console.log(localStorage);
  }

  public login() {
    this.authenticationService.login(this.user);
  }


}
