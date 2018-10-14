import { MatSnackBar } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private title: TitleService
  ) { 
    this.title.setTitle('One Citizen | Register');
  }

  submitUser() {
    this.http.post('/api/auth/register', this.registerForm.value).subscribe(
      (res:any) => {
        if (res.success) {
          this.snackBar.open('Please verify your email.', '', { duration: 10000 });
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

  ngOnInit() {
    if (this.auth.isLogged) {
      this.router.navigate(['/home']);
    }
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

}
