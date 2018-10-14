import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private title: TitleService
  ) { 
    this.title.setTitle('One Citizen | Verify')
  }

  ngOnInit() {
    let userid: any = this.activatedRoute.snapshot.params.user;
    let code: any = this.activatedRoute.snapshot.params.code;
    this.auth.legitifyUser(userid, code);
  }

}
