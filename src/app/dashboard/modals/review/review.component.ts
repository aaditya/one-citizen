import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  review: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.review = this.fb.group({
      rating: ['', Validators.required],
      content: ['', Validators.required],
      image: null
    });
  }

  writeRev() {
    let formdata = this.review.value;
    let id = this.data.post;
    this.http.post(`/api/item/add-review/${id}`, formdata, {
      headers: {
        'x-access-token': sessionStorage.token
      }
    }).subscribe(
      (res: any) => {
        this.snack.open(res.msg, '', { duration: 1000 });
        if (res.success) {
          this.dialogRef.close();
        }
      },
      (err) => {
        this.snack.open('Something went wrong.', '', { duration: 1000 });
        console.log(err)
      }
    )
  }
}
