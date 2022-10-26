import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  userInfo: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('userData');
  }
  navigateLogin() {
    this.router.navigate(['/login']);
  }
  navigateRegister() {
    this.router.navigate(['/register']);
  }
  navigateProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
