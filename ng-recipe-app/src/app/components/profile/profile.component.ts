import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  token: any;
  data: any;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.userInfo = localStorage.getItem('userData');
    this.token = localStorage.getItem('token');
  }
}
