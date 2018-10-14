import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
  rewards: any;

  constructor(
    private title: TitleService,
    private http: HttpClient,
    private snack: MatSnackBar
  ) {
    this.title.setTitle('Rewards | OneCitizen');
    this.getItems();
  }

  ngOnInit() {
  }

  getItems() {
    this.http.get('/api/bonus/rewards', { headers: { 'x-access-token': sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.rewards = res.rewards;
        }
        else {
          this.snack.open(res.msg, '', { duration: 1000 });
        }
      },
      (err) => {
        this.snack.open('Something went wrong.', '', { duration: 1000 });
      }
    )
  }

  redeemItem(id) {
    this.http.get(`/api/bonus/buy-reward/${id}`, { headers: { 'x-access-token': sessionStorage.token } }).subscribe(
      (res: any) => {
        this.snack.open(res.msg, '', { duration: 1000 });
      },
      (err) => {
        this.snack.open('Something went wrong.', '', { duration: 1000 });
      }
    )
  }
}
