
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'igt-login',
  templateUrl: 'components/login/login.component.html'// ,
  // styleUrls: ['components/login/login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private navigationService: NavigationService) { }

  ngOnInit() { }

  gmail() {
    this.authService.gmailLogin();
  }

  facebook() {
    this.authService.facebookLogin();
  }

  onLogin($event) {
    console.log($event);
  }

  email() {
    this.navigationService.go(['/email-login']);
  }
}

