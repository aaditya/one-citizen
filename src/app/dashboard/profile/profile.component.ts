import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  info: any = {
    loyalty: {}
  };
  subs: any = [];
  rews: any = [];

  constructor(
    private title: TitleService,
    private http: HttpClient,
    private snack: MatSnackBar
  ) {
    this.title.setTitle('Profile | OneCitizen')
  }

  ngOnInit() {
    this.getProfile();
    this.getSubs();
    this.getRewards();
  }

  getProfile() {
    this.http.get('/api/auth/get-profile', { headers: { "x-access-token": sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.info = res.info;
        }
        else {
          this.snack.open(res.msg, '', { duration: 1000 })
        }
      },
      (err) => {
        sessionStorage.clear();
      }
    );
  }

  getSubs() {
    this.http.get('/api/subscribe/my-offers', { headers: { "x-access-token": sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.subs = res.offers;
        }
        else {
          this.snack.open(res.msg, '', { duration: 1000 })
        }
      },
      (err) => {
        sessionStorage.clear();
      }
    );
  }
  getRewards() {
    this.http.get('/api/bonus/my-rewards', { headers: { "x-access-token": sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.rews = res.rewards;
        }
        else {
          this.snack.open(res.msg, '', { duration: 1000 })
        }
      },
      (err) => {
        sessionStorage.clear();
      }
    );
  }

  unsub(id) {
    this.http.get(`/api/subscribe/opt-out/${id}`, { headers: { 'x-access-token': sessionStorage.token } }).subscribe(
      (res: any) => {
        this.snack.open(res.msg, '', { duration: 1000 });
        this.getSubs();
      },
      (err) => {
        this.snack.open('Something went wrong.', '', { duration: 1000 });
      }
    )
  }
}
