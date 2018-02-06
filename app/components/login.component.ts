
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'igt-login',
  templateUrl: 'components/login.component.html'
})

export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() { }

  gmail() {

  }

  facebook() {
    
  }
}
