import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog, MatTooltipModule } from '@angular/material';
import { ReviewComponent } from '../modals/review/review.component';
import { ReaderComponent } from '../modals/reader/reader.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  items: any;
  closeResult: string;

  constructor(
    private title: TitleService,
    private http: HttpClient,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.title.setTitle('Store | OneCitizen');
    this.getItems();
  }

  ngOnInit() {

  }

  getItems() {
    this.http.get('/api/item/list', { headers: { 'x-access-token': sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.items = res.items;
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

  addToCart(id) {
    this.http.get(`/api/cart/add/${id}/1`, { headers: { 'x-access-token': sessionStorage.token } }).subscribe(
      (res: any) => {
        this.snack.open(res.msg, '', { duration: 1000 });
      },
      (err) => {
        this.snack.open('Something went wrong.', '', { duration: 1000 });
      }
    )
  }
  openDialog(id) {
    const dialogRef = this.dialog.open(ReviewComponent, {
      width: '50vw',
      data: { 'post': id }
    });
  }

  openReviews(data) {
    const dialogRef = this.dialog.open(ReaderComponent, {
      width: '50vw',
      height: '50vh',
      data: { 'reviews': data }
    });
  }
}
