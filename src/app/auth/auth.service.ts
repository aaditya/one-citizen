import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  getProfile(next) {
    this.http.get('/api/auth/get-profile', { headers: { "x-access-token": sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          sessionStorage.name = res.info.name;
          next();
        }
        else {
          sessionStorage.clear();
        }
      },
      err => {
        sessionStorage.clear();
      }
    );
  }

  logout() {
    this.http.get('/api/auth/logout', { headers: { "x-access-token": sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          sessionStorage.clear();
          this.isLogged = false;
          this.router.navigate(['/']);
        }
        else {
          this.snackBar.open(res.msg, '', { duration: 1000 });
        }
      },
      err => {
        this.snackBar.open(err.message, '', { duration: 1000 });
      }
    );
  }
  
  legitifyUser(userid, code) {
    this.http.get(`/api/auth/verify/${userid}/${code}`).subscribe(
      (res: any) => {
        if (res.success) {
          this.snackBar.open(res.msg, '', { duration: 1000 });
        }
        else {
          this.snackBar.open(res.msg, '', { duration: 3000 });
        }
      },
      err => {
        this.snackBar.open(err.message, '', { duration: 1000 });
      }
    );
  }

  verifyUser() {
    this.http.get('/api/auth/get-profile', { headers: { "x-access-token": sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.isLogged = true;
          return true;
        }
        else {
          sessionStorage.clear();
          this.router.navigate(['/']);
        }
      },
      err => {
        sessionStorage.clear();
        this.router.navigate(['/']);
      }
    );
  }

}
