import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: any;
  cardNum: Number;
  points: Number;
  
  constructor(
    private title: TitleService,
    private http: HttpClient,
    private snack:MatSnackBar
  ) {
    this.title.setTitle('Your Transactions | OneCitizen');
    this.getTransactions();
  }

  ngOnInit() {
    
  }

  getTransactions() {
    this.http.get('/api/transactions/history', { headers: {'x-access-token': sessionStorage.token}}).subscribe(
      (res: any) => {
        if (res.success) {
          this.transactions = res.transactions;
          this.cardNum = res.card;
          this.points = res.points;
        }
        else {
          this.snack.open(res.msg, '', { duration: 1000});
        }
      },
      (err) => {
        this.snack.open('There is some error.', '', { duration: 1000});
      }
    )
  }
}
