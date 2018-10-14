import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any;

  constructor(
    private title: TitleService,
    private http: HttpClient,
    private snack: MatSnackBar
  ) {
    this.title.setTitle('Your Cart | OneCitizen');
    this.getCart();
  }

  ngOnInit() {

  }

  getCart() {
    this.http.get('/api/cart/view', { headers: { 'x-access-token': sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.cart = res.cart;
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

  updateQty(id, qty) {
    this.http.patch(`/api/cart/update/${id}/${qty}`, {}, { headers: { 'x-access-token': sessionStorage.token } }).subscribe(
      (res: any) => {
        this.snack.open(res.msg, '', { duration: 1000 });
        this.getCart();
      },
      (err) => {
        this.snack.open('Something went wrong.', '', { duration: 1000 });
      }
    )
  }

  deleteItem(id) {
    this.http.delete(`/api/cart/delete/${id}`, { headers: { 'x-access-token': sessionStorage.token } }).subscribe(
      (res: any) => {
        this.snack.open(res.msg, '', { duration: 1000 });
        this.getCart();
      },
      (err) => {
        this.snack.open('Something went wrong.', '', { duration: 1000 });
      }
    )
  }

}
