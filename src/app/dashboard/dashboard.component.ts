import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  user: String = sessionStorage.name;

   constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private auth: AuthService,
    private title: TitleService
  ) { 
    this.title.setTitle('Dashboard | OneCitizen');
  }

  ngOnInit() {
    this.auth.verifyUser();
  }

  ngAfterViewInit() {
    
  }

  logout() {
    this.auth.logout();
  }
}
