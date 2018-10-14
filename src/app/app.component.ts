import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleService } from './title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public constructor(
    private titleService: TitleService
  ) {

  }

  ngOnInit() {
    this.titleService.setTitle('One Citizen | Home');
  }
}
