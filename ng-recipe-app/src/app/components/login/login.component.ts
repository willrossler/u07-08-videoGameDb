import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  submitted!: boolean;
  data: any;
  token: any;

  constructor(
    private httpservice: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  login() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {
    this.login();
  }

  submit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.httpservice.loginUser(this.loginForm.value).subscribe((res) => {
      this.data = res;
      console.log(res);
      if (this.data.status === 1) {
        this.token = this.data.user.token;
        localStorage.setItem('token', this.data.token);
        localStorage.setItem('userData', this.data.user.name);
        localStorage.setItem('userId', this.data.user.id);
        this.router.navigate(['/']);
      } else {
        console.log('failed login');
      }
    });
  }
}
