import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public signupForm!: FormGroup;

  data: any;

  constructor(
    private httpservice: HttpService,
    private formBuilder: FormBuilder
  ) {}

  createForm() {
    this.signupForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
    });
  }

  submit() {
    this.httpservice.registerUser(this.signupForm.value).subscribe((res) => {
      this.data = res;
      console.log(res);
    });
  }
  ngOnInit(): void {
    this.createForm();
  }
}
