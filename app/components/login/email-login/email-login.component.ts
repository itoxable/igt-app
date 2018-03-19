import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'igt-email-login',
  templateUrl: 'components/login/email-login/email-login.component.html'
})

export class EmailLoginComponent implements OnInit {

  public email = 'rui';
  public password = '123456';
  public errorMessage: string;

  constructor(private authService: AuthService, private navigationService: NavigationService) { }

  public ngOnInit() { }

  public login() {
    this.errorMessage = null;
    this.authService.login(this.email, this.password).subscribe((user) => {
      this.navigationService.go(['/secure/home'], true);
    }, (err) => {
      this.errorMessage = 'wrong email';
    });
  }

}
