import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  date: String = moment().format("YYYY");
  constructor(
    private title: TitleService
  ) {
    this.title.setTitle('One Citizen | Splash');
   }

  ngOnInit() {
    
  }
}
