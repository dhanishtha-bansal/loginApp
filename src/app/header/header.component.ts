import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppGlobals } from '../global/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ AppGlobals ]
})
export class HeaderComponent implements OnInit {

  constructor(private globalConfig: AppGlobals) { }
  
  loggedStatus = this.globalConfig.isLoggedIn;

  ngOnInit() {
  }
}
