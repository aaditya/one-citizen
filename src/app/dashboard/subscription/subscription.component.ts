import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  offers: any;

  constructor(
    private title: TitleService,
    private http: HttpClient,
    private snack: MatSnackBar
  ) {
    this.title.setTitle('Subscriptions | OneCitizen')
  }

  ngOnInit() {
    this.getSubscriptions();
  }

  getSubscriptions() {
    this.http.get('/api/subscribe/get-offers', { headers: { 'x-access-token': sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.offers = res.offers;
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

  subscribe(id) {
    this.http.get(`/api/subscribe/opt-in/${id}`, { headers: { 'x-access-token': sessionStorage.token } }).subscribe(
      (res: any) => {
        this.snack.open(res.msg, '', { duration: 1000 });
      },
      (err) => {
        this.snack.open('Something went wrong.', '', { duration: 1000 });
      }
    )
  }
}
