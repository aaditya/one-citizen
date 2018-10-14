import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  params: any;
  profileInfo: any;
  isFriend: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.snapshot.params;
    this.http.get(`/actions/feed/profile/${this.params.id}`,
      { headers: { "x-access-token": sessionStorage.token } }).subscribe(
        (res: any) => {
          if (res.success) {
            this.profileInfo = res;
            this.friendCheck();
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

  friendCheck() {
    let friendsArray = this.profileInfo.friends.map((f) => f.id);
    this.isFriend = friendsArray.includes(sessionStorage.userid);
  }

  manageFriend(action, id) {
    let url: string;
    if (action == 'add') {
      url = `/actions/friend/add/${id}`;
    }
    else if (action == 'remove') {
      url = `/actions/friend/manage/unfriend/${id}`;
    }
    this.http.get(url,
      { headers: { "x-access-token": sessionStorage.token } }).subscribe(
        (res: any) => {
          this.snackBar.open(res.msg, '', { duration: 1000 });
        },
        err => {
          this.snackBar.open(err, '', { duration: 1000 });
        }
      );
  }
}
