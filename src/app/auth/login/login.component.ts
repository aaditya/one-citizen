import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private title: TitleService
  ) {
    this.title.setTitle('One Citizen | Login');
   }

  logUser() {
    this.http.post('/api/auth/login', { id: this.loginForm.value.username, password: this.loginForm.value.password }).subscribe(
      (res: any) => {
        if (res.success) {
          sessionStorage.token = res.token;
          this.auth.getProfile(() => {
            this.router.navigate(['/home']);
            this.auth.isLogged = true;
          });
        }
        else {
          this.snackBar.open(res.msg, '', { duration: 1000 });
        }
      },
      err => {
        this.snackBar.open(err, '', { duration: 1000 });
      }
    );

  }

  ngOnInit() {
    if (this.auth.isLogged) {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
